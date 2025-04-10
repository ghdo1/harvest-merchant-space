
import { PlusCircle, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category_id: string | null;
  category_name?: string;
};

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
}

export const ProductsTable = ({ products, loading }: ProductsTableProps) => {
  return (
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
                    {loading ? 'Memuat data...' : 'Belum ada produk'}
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
  );
};
