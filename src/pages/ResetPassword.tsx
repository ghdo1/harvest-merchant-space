
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Lock } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/hooks/use-toast";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak sesuai",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate password reset (in a real app this would call an API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Berhasil Diubah",
        description: "Silakan masuk dengan password baru Anda.",
      });
      
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message || "Gagal mengubah password",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-10">
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              {isSuccess 
                ? "Password Anda telah berhasil diubah" 
                : "Masukkan password baru Anda"}
            </p>
          </div>
          
          {isSuccess ? (
            <div className="text-center">
              <div className="flex justify-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p className="mb-6">Password Anda telah berhasil diubah. Silakan masuk dengan password baru Anda.</p>
              <Link 
                to="/login" 
                className="text-nature-600 inline-flex items-center hover:underline"
              >
                <ArrowLeft size={16} className="mr-2" />
                Kembali ke halaman login
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Baru</FormLabel>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Minimal 8 karakter"
                            className="pl-10"
                            autoComplete="new-password"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password Baru</FormLabel>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Ulangi password baru Anda"
                            className="pl-10"
                            autoComplete="new-password"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full py-2.5 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Ubah Password"}
                </Button>
                
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-nature-600 inline-flex items-center hover:underline text-sm"
                  >
                    <ArrowLeft size={14} className="mr-1" />
                    Kembali ke halaman login
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
