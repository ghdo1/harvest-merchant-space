
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Category } from '@/hooks/useAdminData';
import { CategoryForm } from './forms/CategoryForm';
import { DeleteConfirmationDialog } from './dialogs/DeleteConfirmationDialog';
import { CategorySearchBar } from './categories/CategorySearchBar';
import { CategoriesList } from './categories/CategoriesList';

interface CategoriesTableProps {
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
}

export const CategoriesTable = ({ categories, loading, onRefresh }: CategoriesTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleAddClick = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', categoryToDelete.id);

      if (error) throw error;

      toast({
        title: 'Kategori dihapus',
        description: `Kategori ${categoryToDelete.name} berhasil dihapus`,
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Gagal menghapus kategori',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Kategori</CardTitle>
            <CardDescription>Kelola semua kategori produk disini</CardDescription>
          </div>
          <Button size="sm" onClick={handleAddClick}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Kategori
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <CategorySearchBar 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
            />
          </div>
          
          <CategoriesList 
            categories={categories}
            loading={loading}
            searchQuery={searchQuery}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {isFormOpen && (
        <CategoryForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          categoryToEdit={selectedCategory}
          onSuccess={onRefresh}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </>
  );
}
