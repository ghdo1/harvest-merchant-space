
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FormattedUser } from '@/hooks/useAdminData';
import { UserSearchBar } from './users/UserSearchBar';
import { UsersList } from './users/UsersList';
import { EditUserRoleDialog } from './users/EditUserRoleDialog';

interface UsersTableProps {
  users: FormattedUser[];
  loading: boolean;
  onRefresh: () => void;
}

export const UsersTable = ({ users, loading, onRefresh }: UsersTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<FormattedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = (user: FormattedUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Pengguna</CardTitle>
            <CardDescription>Kelola semua pengguna disini</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <UserSearchBar 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
          </div>
          
          <UsersList 
            users={users} 
            loading={loading} 
            searchQuery={searchQuery}
            onEditClick={handleEditClick}
          />
        </CardContent>
      </Card>

      <EditUserRoleDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedUser={selectedUser}
        onRefresh={onRefresh}
      />
    </>
  );
};
