
import { SearchBar } from '@/components/admin/shared/SearchBar';

interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ProductSearchBar({ searchQuery, onSearchChange }: ProductSearchBarProps) {
  return (
    <SearchBar 
      searchQuery={searchQuery} 
      onSearchChange={onSearchChange} 
      placeholder="Cari produk..." 
    />
  );
}
