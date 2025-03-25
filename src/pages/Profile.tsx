
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { User, Package, Heart, LogOut, Settings, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample user data (in a real app, this would come from authentication)
  const userData = {
    name: "Agus Supriadi",
    email: "agus.supriadi@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    isLoggedIn: true,
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
        
        {userData.isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="glass-card p-6 sticky top-28">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={userData.image} 
                      alt={userData.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-medium">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{userData.email}</p>
                  
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
                    
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-rose-500 hover:bg-rose-50 hover:text-rose-600 mt-4">
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
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                      <input 
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                      <input 
                        type="tel"
                        defaultValue="+62 812 3456 7890"
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tanggal Lahir</label>
                      <input 
                        type="date"
                        defaultValue="1990-01-01"
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Alamat</label>
                    <textarea 
                      rows={3}
                      defaultValue="Jl. Lintas Sumut-Riau, No. 123, Cikampak, Aek Batu, Torgamba, Labuhanbatu Selatan."
                      className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="center mb-4">
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
