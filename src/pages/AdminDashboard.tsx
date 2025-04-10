
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';
import { 
  Users, ShoppingBag, Package, Layers, AlertTriangle, PlusCircle, Edit, Trash2
} from 'lucide-react';
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

type User = {
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
  const [users, setUsers] = useState<User[]>([]);
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

  // If admin access not verified yet, show loading
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{users.length}</div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Produk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{products.length}</div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Kategori
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{categories.length}</div>
                <Layers className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daftar Produk</CardTitle>
                  <CardDescription>Kelola semua produk disini</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Produk</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead className="text-right">Harga</TableHead>
                        <TableHead className="text-center">Stok</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            {loading.products ? 'Memuat data...' : 'Belum ada produk'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category_name}</TableCell>
                            <TableCell className="text-right">Rp {product.price.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              {product.stock > 0 ? (
                                product.stock
                              ) : (
                                <span className="text-destructive flex items-center justify-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Habis
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daftar Kategori</CardTitle>
                  <CardDescription>Kelola semua kategori produk disini</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Tambah Kategori
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Kategori</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
                            {loading.categories ? 'Memuat data...' : 'Belum ada kategori'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.slug}</TableCell>
                            <TableCell>{category.description || '-'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daftar Pengguna</CardTitle>
                  <CardDescription>Kelola semua pengguna disini</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Peran</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
                            {loading.users ? 'Memuat data...' : 'Belum ada pengguna'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.nama_lengkap}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'admin' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : user.role === 'staff'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
