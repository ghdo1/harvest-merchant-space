
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/contexts/AuthContext";
import { mockUsers, mockProfiles } from "@/data/mockData";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for persisted login in localStorage
    const savedUser = localStorage.getItem("mockUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (!foundUser) {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Email atau password salah",
        });
        return { error: { message: "Email atau password salah" } };
      }

      // Create a user object similar to what Supabase would return
      const userObject = {
        id: foundUser.id,
        email: foundUser.email,
        user_metadata: foundUser.user_metadata
      };
      
      // Store in localStorage to persist login
      localStorage.setItem("mockUser", JSON.stringify(userObject));
      setUser(userObject);
      
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali!",
      });

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

  // Mock sign up with email and password
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = mockUsers.some(user => user.email === email);
      
      if (userExists) {
        toast({
          variant: "destructive",
          title: "Pendaftaran Gagal",
          description: "Email sudah terdaftar",
        });
        return { error: { message: "Email sudah terdaftar" }, user: null };
      }

      // Create a new user (in a real app this would be sent to the backend)
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        password,
        user_metadata: {
          nama_lengkap: userData.name,
          nomor_whatsapp: userData.phone,
        }
      };
      
      // In a real app, this would be added to the database
      // Here we're just simulating success
      
      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun Anda telah dibuat, silakan masuk.",
      });
      
      // Automatically log in the new user
      const userObject = {
        id: newUser.id,
        email: newUser.email,
        user_metadata: newUser.user_metadata
      };
      
      localStorage.setItem("mockUser", JSON.stringify(userObject));
      setUser(userObject);
      
      navigate("/", { replace: true });
      
      return { error: null, user: userObject };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message,
      });
      return { error, user: null };
    }
  };

  // Mock sign out
  const signOut = async () => {
    localStorage.removeItem("mockUser");
    setUser(null);
    navigate("/login");
    
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari akun",
    });
  };

  // Mock reset password
  const resetPassword = async (email: string) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userExists = mockUsers.some(user => user.email === email);
      
      if (!userExists) {
        // Still return success for security reasons (don't reveal which emails exist)
        toast({
          title: "Email Reset Password Terkirim",
          description: "Jika email terdaftar, Anda akan menerima instruksi untuk reset password.",
        });
        return { error: null };
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

  // Create a session object (simplified for the mock)
  const session = user ? { user } : null;

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
