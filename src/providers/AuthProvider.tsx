
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { AuthContext } from "@/contexts/AuthContext";
import { createCustomerProfile } from "@/utils/customerProfileUtils";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Only update the nav after signing in, allow other events to happen silently
          toast({
            title: "Login Berhasil",
            description: "Selamat datang kembali!",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Logout Berhasil",
            description: "Anda telah keluar dari akun",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: error.message,
        });
        return { error };
      }

      // Redirect to the intended page or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      
      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message,
      });
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nama_lengkap: userData.name,
            nomor_whatsapp: userData.phone,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Pendaftaran Gagal",
          description: error.message,
        });
        return { error, user: null };
      }

      if (data.user) {
        try {
          // Create customer profile with default "bronze" type
          const { error: profileError } = await createCustomerProfile(data.user.id, userData);
          
          if (profileError) {
            return { error: profileError, user: data.user };
          }
          
          toast({
            title: "Pendaftaran Berhasil",
            description: "Akun Anda telah dibuat, silakan masuk.",
          });
          
          // Automatically log in and redirect
          navigate("/", { replace: true });
        } catch (profileError: any) {
          console.error("Error creating profile:", profileError);
          
          toast({
            variant: "destructive",
            title: "Pendaftaran Gagal",
            description: "Gagal membuat profil pengguna: " + profileError.message,
          });
          
          return { error: profileError, user: data.user };
        }
      }

      return { error: null, user: data.user };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message,
      });
      return { error, user: null };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Reset Password Gagal",
          description: error.message,
        });
        return { error };
      }

      toast({
        title: "Email Reset Password Terkirim",
        description: "Silakan periksa email Anda untuk instruksi selanjutnya.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message,
      });
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signIn,
      signUp,
      signOut,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
