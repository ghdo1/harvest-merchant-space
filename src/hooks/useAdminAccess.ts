
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export const useAdminAccess = (user: User | null) => {
  const navigate = useNavigate();
  const [adminAccess, setAdminAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      setIsCheckingAccess(true);
      
      if (!user) {
        navigate('/login');
        setIsCheckingAccess(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Akses ditolak",
            description: "Anda tidak memiliki izin untuk mengakses halaman ini",
            variant: "destructive"
          });
          navigate('/');
          setIsCheckingAccess(false);
          return;
        }

        setAdminAccess(true);
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast({
          title: "Terjadi kesalahan",
          description: "Tidak dapat memverifikasi peran admin",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  return { adminAccess, isCheckingAccess };
};
