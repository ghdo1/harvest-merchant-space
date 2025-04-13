
import { useState } from 'react';
import { Edit, Search, UserCog } from 'lucide-react';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState as useReactState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { DeleteConfirmationDialog } from './dialogs/DeleteConfirmationDialog';

type FormattedUser = {
  id: string;
  nama_lengkap: string;
  email: string;
  role: string;
};

interface UsersTableProps {
  users: FormattedUser[];
  loading: boolean;
  onRefresh: () => void;
}

export const UsersTable = ({ users, loading, onRefresh }: UsersTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<FormattedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer"); // Default to customer role
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredUsers = users.filter(user => 
    user.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (selectedUser) {
      // Ensure selectedRole is never empty
      setSelectedRole(selectedUser.role || "customer");
    }
  }, [selectedUser]);

  const handleEditClick = (user: FormattedUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    
    setIsSubmitting(true);
    try {
      // First delete existing role
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', selectedUser.id);
      
      if (deleteError) throw deleteError;
      
      // Then insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUser.id,
          role: selectedRole as 'admin' | 'customer' | 'staff'
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: 'Peran diperbarui',
        description: `Peran pengguna ${selectedUser.nama_lengkap} berhasil diubah menjadi ${selectedRole}`,
      });
      
      onRefresh();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Gagal mengubah peran',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengguna..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      {loading ? 'Memuat data...' : searchQuery ? 'Tidak ada pengguna yang ditemukan' : 'Belum ada pengguna'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.nama_lengkap}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' 
                            ? 'bg-blue-100 text-blue-800' 
                            : user.role === 'staff'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(user)}>
                            <UserCog className="h-4 w-4" />
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Peran Pengguna</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Pengguna</p>
                <p>{selectedUser?.nama_lengkap}</p>
                <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Peran
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleRoleChange} disabled={isSubmitting || selectedRole === selectedUser?.role}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
