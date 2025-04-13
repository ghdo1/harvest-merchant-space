
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: {
    id: string;
    name: string;
    price: number;
    stock: number;
    category_id: string | null;
    description?: string;
  };
  onSuccess: () => void;
  categories: Category[];
};

export function ProductForm({ isOpen, onClose, productToEdit, onSuccess, categories }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!productToEdit;

  const form = useForm({
    defaultValues: {
      name: productToEdit?.name || '',
      price: productToEdit?.price || 0,
      stock: productToEdit?.stock || 0,
      category_id: productToEdit?.category_id || '',
      description: productToEdit?.description || '',
    },
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      
      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update({
            name: data.name,
            price: data.price,
            stock: data.stock,
            category_id: data.category_id || null,
            description: data.description,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', productToEdit.id);

        if (error) throw error;
        toast({
          title: 'Produk diperbarui',
          description: `Produk ${data.name} berhasil diperbarui`,
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert({
            name: data.name,
            price: data.price,
            stock: data.stock,
            category_id: data.category_id || null,
            description: data.description,
            slug,
          });

        if (error) throw error;
        toast({
          title: 'Produk ditambahkan',
          description: `Produk ${data.name} berhasil ditambahkan`,
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
      console.error('Error submitting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Nama produk wajib diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                rules={{ required: 'Harga wajib diisi' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Tidak ada kategori</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Textarea placeholder="Deskripsi produk" className="resize-none" {...field} />
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
