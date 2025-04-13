
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StatsCards } from '@/components/admin/StatsCards';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { CategoriesTable } from '@/components/admin/CategoriesTable';
import { UsersTable } from '@/components/admin/UsersTable';
import { Product, Category, FormattedUser } from '@/hooks/useAdminData';

interface AdminDashboardContentProps {
  users: FormattedUser[];
  products: Product[];
  categories: Category[];
  loading: {
    products: boolean;
    categories: boolean;
    users: boolean;
  };
  onRefreshData: () => void;
  onRefreshProducts: () => void;
  onRefreshCategories: () => void;
  onRefreshUsers: () => void;
}

export const AdminDashboardContent = ({
  users,
  products,
  categories,
  loading,
  onRefreshData,
  onRefreshProducts,
  onRefreshCategories,
  onRefreshUsers
}: AdminDashboardContentProps) => {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Kelola produk, kategori, dan pengguna di sini
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={onRefreshData}>Perbarui Data</Button>
        </div>
      </div>

      <StatsCards 
        usersCount={users.length} 
        productsCount={products.length} 
        categoriesCount={categories.length} 
      />

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-4 space-y-4">
          <ProductsTable 
            products={products} 
            loading={loading.products} 
            categories={categories} 
            onRefresh={onRefreshProducts}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-4 space-y-4">
          <CategoriesTable 
            categories={categories} 
            loading={loading.categories} 
            onRefresh={onRefreshCategories}
          />
        </TabsContent>

        <TabsContent value="users" className="mt-4 space-y-4">
          <UsersTable 
            users={users} 
            loading={loading.users} 
            onRefresh={onRefreshUsers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
