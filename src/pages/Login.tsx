
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if user is already logged in
  if (user) {
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (!error) {
        // Successfully signed in, redirect will happen in the auth hook
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-10">
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Selamat Datang Kembali</h1>
            <p className="text-muted-foreground mt-2">Masuk ke akun Anda untuk melanjutkan</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="nama@email.com"
                          className="pl-10"
                          autoComplete="email"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link to="/forgot-password" className="text-xs text-nature-600 hover:underline">
                        Lupa password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-nature-600 border-gray-300 rounded focus:ring-nature-500/30"
                        checked={field.value}
                        onChange={field.onChange}
                        id="rememberMe"
                      />
                    </FormControl>
                    <FormLabel className="ml-2 text-sm text-muted-foreground" htmlFor="rememberMe">
                      Ingat saya
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full py-2.5 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Belum memiliki akun?{" "}
              <Link to="/register" className="text-nature-600 hover:underline font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
