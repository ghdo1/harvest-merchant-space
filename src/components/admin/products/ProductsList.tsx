
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Product } from '@/hooks/useAdminData';
import { Button } from '@/components/ui/button';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';

interface ProductsListProps {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

export function ProductsList({ 
  products, 
  loading, 
  searchQuery, 
  onEditClick, 
  onDeleteClick 
}: ProductsListProps) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                {loading ? 'Memuat data...' : searchQuery ? 'Tidak ada produk yang ditemukan' : 'Belum ada produk'}
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => (
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
                    <Button variant="outline" size="icon" onClick={() => onEditClick(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => onDeleteClick(product)}>
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
  );
}
