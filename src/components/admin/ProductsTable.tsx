
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Product, Category } from '@/hooks/useAdminData';
import { ProductForm } from './forms/ProductForm';
import { DeleteConfirmationDialog } from './dialogs/DeleteConfirmationDialog';
import { ProductSearchBar } from './products/ProductSearchBar';
import { ProductsList } from './products/ProductsList';

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
  categories: { id: string; name: string; }[];
  onRefresh: () => void;
}

export const ProductsTable = ({ products, loading, categories, onRefresh }: ProductsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddClick = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);

      if (error) throw error;

      toast({
        title: 'Produk dihapus',
        description: `Produk ${productToDelete.name} berhasil dihapus`,
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Gagal menghapus produk',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Produk</CardTitle>
            <CardDescription>Kelola semua produk disini</CardDescription>
          </div>
          <Button size="sm" onClick={handleAddClick}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Produk
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ProductSearchBar 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
          </div>
          
          <ProductsList 
            products={products}
            loading={loading}
            searchQuery={searchQuery}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {isFormOpen && (
        <ProductForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          productToEdit={selectedProduct}
          onSuccess={onRefresh}
          categories={categories}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk"
        description={`Apakah Anda yakin ingin menghapus produk "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </>
  );
};
