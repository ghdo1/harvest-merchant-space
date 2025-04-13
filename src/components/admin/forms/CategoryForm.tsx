
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

type CategoryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: {
    id: string;
    name: string;
    description: string | null;
  };
  onSuccess: () => void;
};

export function CategoryForm({ isOpen, onClose, categoryToEdit, onSuccess }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!categoryToEdit;

  const form = useForm({
    defaultValues: {
      name: categoryToEdit?.name || '',
      description: categoryToEdit?.description || '',
    },
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      
      if (isEditing) {
        const { error } = await supabase
          .from('product_categories')
          .update({
            name: data.name,
            description: data.description,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', categoryToEdit.id);

        if (error) throw error;
        toast({
          title: 'Kategori diperbarui',
          description: `Kategori ${data.name} berhasil diperbarui`,
        });
      } else {
        const { error } = await supabase
          .from('product_categories')
          .insert({
            name: data.name,
            description: data.description,
            slug,
          });

        if (error) throw error;
        toast({
          title: 'Kategori ditambahkan',
          description: `Kategori ${data.name} berhasil ditambahkan`,
        });
      }

      onSuccess();
      onClose();
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error submitting category:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Nama kategori wajib diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama kategori" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi kategori" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Perbarui' : 'Simpan'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
