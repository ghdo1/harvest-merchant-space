
import { useState, useEffect } from 'react';
import { FormattedUser } from '@/hooks/useAdminData';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserRoleSelector } from './UserRoleSelector';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EditUserRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: FormattedUser | null;
  onRefresh: () => void;
}

export function EditUserRoleDialog({ 
  isOpen, 
  onClose, 
  selectedUser, 
  onRefresh 
}: EditUserRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (selectedUser) {
      // Ensure selectedRole is never empty
      setSelectedRole(selectedUser.role || "customer");
    }
  }, [selectedUser]);

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
      onClose();
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
              <UserRoleSelector 
                value={selectedRole} 
                onChange={setSelectedRole} 
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button 
            onClick={handleRoleChange} 
            disabled={isSubmitting || selectedRole === selectedUser?.role}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
