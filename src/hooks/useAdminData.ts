
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category_id: string | null;
  category_name?: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type UserRole = {
  role: 'admin' | 'customer' | 'staff';
};

type User = {
  id: string;
  nama_lengkap: string;
  email: string;
  user_roles: UserRole[] | null;
};

type FormattedUser = {
  id: string;
  nama_lengkap: string;
  email: string;
  role: string;
};

export const useAdminData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<FormattedUser[]>([]);
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
    users: false,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(prev => ({ ...prev, products: true }));
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, 
          name, 
          price, 
          stock, 
          category_id,
          product_categories (name)
        `);

      if (error) throw error;

      const formattedProducts = data.map(product => ({
        ...product,
        category_name: product.product_categories?.name || 'Uncategorized'
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Gagal memuat produk",
        description: "Terjadi kesalahan saat memuat data produk",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Gagal memuat kategori",
        description: "Terjadi kesalahan saat memuat data kategori",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(prev => ({ ...prev, users: true }));
    try {
      // Fix: We need to query profiles and user_roles separately since there's no foreign key relationship
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, nama_lengkap, email');

      if (profilesError) throw profilesError;

      // Create a formatted user array with default roles
      const formattedUsers: FormattedUser[] = profilesData.map(profile => ({
        id: profile.id,
        nama_lengkap: profile.nama_lengkap,
        email: profile.email,
        role: 'customer' // Default role
      }));

      // Get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Update roles for users that have role assignments
      if (rolesData) {
        for (const userRole of rolesData) {
          const userIndex = formattedUsers.findIndex(u => u.id === userRole.user_id);
          if (userIndex >= 0) {
            formattedUsers[userIndex].role = userRole.role;
          }
        }
      }

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Gagal memuat pengguna",
        description: "Terjadi kesalahan saat memuat data pengguna",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  }, []);

  const fetchData = useCallback(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, [fetchProducts, fetchCategories, fetchUsers]);

  return {
    products,
    categories,
    users,
    loading,
    fetchProducts,
    fetchCategories,
    fetchUsers,
    fetchData,
  };
};

export type { Product, Category, FormattedUser };
