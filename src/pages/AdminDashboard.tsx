
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import { StatsCards } from '@/components/admin/StatsCards';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { CategoriesTable } from '@/components/admin/CategoriesTable';
import { UsersTable } from '@/components/admin/UsersTable';

// Types
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<FormattedUser[]>([]);
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
    users: false,
  });
  const [adminAccess, setAdminAccess] = useState(false);

  // Check if user has admin role
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Akses ditolak",
            description: "Anda tidak memiliki izin untuk mengakses halaman ini",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        setAdminAccess(true);
        fetchData();
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast({
          title: "Terjadi kesalahan",
          description: "Tidak dapat memverifikasi peran admin",
          variant: "destructive"
        });
        navigate('/');
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  const fetchData = () => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  };

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

      const formattedUsers = data.map(user => ({
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        role: user.user_roles && user.user_roles.length > 0 
          ? user.user_roles[0].role 
          : 'customer'
      }));

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

  if (!adminAccess) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Memverifikasi akses...</h2>
            <p className="text-muted-foreground">Silakan tunggu sebentar</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-6 md:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
            <p className="text-muted-foreground">
              Kelola produk, kategori, dan pengguna di sini
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={fetchData}>Perbarui Data</Button>
          </div>
        </div>

        {/* Stats Cards Component */}
        <StatsCards 
          usersCount={users.length} 
          productsCount={products.length} 
          categoriesCount={categories.length} 
        />

        {/* Tabs with Content Components */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-4 space-y-4">
            <ProductsTable products={products} loading={loading.products} />
          </TabsContent>

          <TabsContent value="categories" className="mt-4 space-y-4">
            <CategoriesTable categories={categories} loading={loading.categories} />
          </TabsContent>

          <TabsContent value="users" className="mt-4 space-y-4">
            <UsersTable users={users} loading={loading.users} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
