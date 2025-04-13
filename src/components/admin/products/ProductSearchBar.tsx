
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ProductSearchBar({ searchQuery, onSearchChange }: ProductSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Cari produk..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
