
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
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

const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await resetPassword(values.email);
      
      if (!error) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-10">
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Lupa Password</h1>
            <p className="text-muted-foreground mt-2">
              {isSuccess 
                ? "Silakan periksa email Anda untuk instruksi reset password" 
                : "Masukkan email Anda untuk melakukan reset password"}
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
              <p className="mb-6">Email dengan instruksi reset password telah dikirim ke alamat email Anda. Silakan periksa kotak masuk atau folder spam Anda.</p>
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
                
                <Button
                  type="submit"
                  className="w-full py-2.5 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Reset Password"}
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

export default ForgotPassword;
