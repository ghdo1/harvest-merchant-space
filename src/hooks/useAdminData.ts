
import { useState } from 'react';
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

  const fetchProducts = async () => {
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
  };

  const fetchCategories = async () => {
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
  };

  const fetchUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          nama_lengkap,
          email,
          user_roles (role)
        `);

      if (error) throw error;

      const formattedUsers = data.map(user => {
        // Fix the type issue by correctly handling the user_roles data
        let role = 'customer';
        if (user.user_roles && Array.isArray(user.user_roles) && user.user_roles.length > 0) {
          // TypeScript now knows this is an array and can safely access the first item's role
          role = user.user_roles[0]?.role || 'customer';
        }

        return {
          id: user.id,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          role: role
        };
      });

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
  };

  const fetchData = () => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  };

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
