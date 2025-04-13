
import { SearchBar } from '@/components/admin/shared/SearchBar';

interface CategorySearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CategorySearchBar({ searchQuery, onSearchChange }: CategorySearchBarProps) {
  return (
    <SearchBar 
      searchQuery={searchQuery} 
      onSearchChange={onSearchChange} 
      placeholder="Cari kategori..." 
    />
  );
}
