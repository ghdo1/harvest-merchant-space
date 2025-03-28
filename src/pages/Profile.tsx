import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { User, Package, Heart, LogOut, Settings, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { getProfile } from "@/utils/mockProfileUtils";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (user) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error("No user logged in");
      }

      // Fetch profile data from our mock function
      const { data: profile, error } = await getProfile(user.id);
      
      if (error) {
        // If no customer data found, just use the auth user data
        console.log("Customer data not found, using basic user data");
        
        setProfileData({
          nama_lengkap: user.user_metadata?.nama_lengkap || "Pengguna",
          email: user.email,
          nomor_whatsapp: user.user_metadata?.nomor_whatsapp || "",
          tipe_pelanggan: {
            nama_tipe: "Pelanggan Baru",
            level_member: "bronze",
            persentase_diskon: 0
          }
        });
      } else {
        setProfileData(profile);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Gagal Memuat Profil",
        description: "Terjadi kesalahan saat memuat data profil."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const profileMenu = [
    { name: "Informasi Profil", icon: User, path: "/profile" },
    { name: "Pesanan Saya", icon: Package, path: "/orders" },
    { name: "Wishlist", icon: Heart, path: "/wishlist" },
    { name: "Riwayat Transaksi", icon: Clock, path: "/history" },
    { name: "Pengaturan", icon: Settings, path: "/settings" },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Profil Saya</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600"></div>
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="glass-card p-6 sticky top-28">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={profileData?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.nama_lengkap || user.email || '')}&background=0D8ABC&color=fff`} 
                      alt={profileData?.nama_lengkap || "Profile"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-medium">{profileData?.nama_lengkap || "Pengguna"}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  
                  {profileData?.tipe_pelanggan && (
                    <div className="mt-2 mb-4 py-1 px-3 bg-nature-100 text-nature-800 rounded-full text-xs font-medium">
                      {profileData.tipe_pelanggan.nama_tipe} - {profileData.tipe_pelanggan.level_member?.toUpperCase() || "BRONZE"}
                    </div>
                  )}
                  
                  <div className="w-full space-y-1">
                    {profileMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md w-full ${
                          location.pathname === item.path
                            ? "bg-nature-100 text-nature-800 font-medium"
                            : "hover:bg-muted"
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-rose-500 hover:bg-rose-50 hover:text-rose-600 mt-4"
                    >
                      <LogOut size={18} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="md:col-span-3">
              <div className="glass-card p-6">
                <h2 className="text-xl font-medium mb-6">Informasi Profil</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                      <input 
                        type="text"
                        defaultValue={profileData?.nama_lengkap || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email"
                        defaultValue={user.email || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor WhatsApp</label>
                      <input 
                        type="tel"
                        defaultValue={profileData?.nomor_whatsapp || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                      <input 
                        type="tel"
                        defaultValue={profileData?.nomor_telepon || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tanggal Lahir</label>
                      <input 
                        type="date"
                        defaultValue={profileData?.tanggal_lahir || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">NIK</label>
                      <input 
                        type="text"
                        defaultValue={profileData?.nik || ""}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <p className="text-sm text-muted-foreground">
                      Untuk mengubah data profil, silakan hubungi admin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <User size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Silakan Masuk</h2>
            <p className="text-muted-foreground mb-6">Untuk mengakses profil Anda, silakan masuk terlebih dahulu.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white border border-nature-600 text-nature-600 rounded-md hover:bg-nature-50 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
