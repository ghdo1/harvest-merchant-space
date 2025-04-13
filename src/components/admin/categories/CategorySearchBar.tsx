
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CategorySearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CategorySearchBar({ searchQuery, onSearchChange }: CategorySearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Cari kategori..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
