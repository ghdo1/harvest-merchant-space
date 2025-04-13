
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UserSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function UserSearchBar({ searchQuery, onSearchChange }: UserSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Cari pengguna..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
