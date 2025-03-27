
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .email("Email tidak valid")
    .min(1, "Email harus diisi"),
  phone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Nomor telepon tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
  confirmPassword: z
    .string()
    .min(1, "Konfirmasi password harus diisi"),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak sesuai",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Check if user is already logged in
  if (user) {
    navigate("/", { replace: true });
  }
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange", // This enables real-time validation
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      const { error, user } = await signUp(values.email, values.password, {
        name: values.name,
        email: values.email,
        phone: values.phone,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Pendaftaran Gagal",
          description: error.message || "Terjadi kesalahan saat mendaftar",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: error.message || "Terjadi kesalahan saat mendaftar",
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
            <h1 className="text-2xl font-semibold">Buat Akun Baru</h1>
            <p className="text-muted-foreground mt-2">Daftar untuk mendapatkan akses ke semua fitur</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nama lengkap Anda"
                          className="pl-10"
                          autoComplete="name"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                          type="email"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor WhatsApp</FormLabel>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="08xxxxxxxxxx"
                          className="pl-10"
                          autoComplete="tel"
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Format: 08xxxxxxxxxx
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Minimal 8 karakter"
                          className="pl-10 pr-10"
                          autoComplete="new-password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Ulangi password Anda"
                          className="pl-10 pr-10"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-nature-600 border-gray-300 rounded focus:ring-nature-500/30"
                        checked={field.value}
                        onChange={field.onChange}
                        id="agreeToTerms"
                      />
                    </FormControl>
                    <FormLabel className="ml-2 text-sm text-muted-foreground" htmlFor="agreeToTerms">
                      Saya setuju dengan{" "}
                      <Link to="/terms" className="text-nature-600 hover:underline">
                        Syarat dan Ketentuan
                      </Link>{" "}
                      serta{" "}
                      <Link to="/privacy" className="text-nature-600 hover:underline">
                        Kebijakan Privasi
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full py-2.5 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Daftar Sekarang"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-nature-600 hover:underline font-medium">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
