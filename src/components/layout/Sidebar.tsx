
import { Home, ShoppingBag, LayoutGrid, Tag, User, Heart, ShoppingCart, Clock, Menu, X, BookOpenText, Truck, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is admin
    const checkAdminRole = async () => {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
          
        setIsAdmin(!!data);
      } catch (error) {
        console.error('Error checking admin role:', error);
      }
    };
    
    checkAdminRole();
  }, [user]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Toko", path: "/shop", icon: ShoppingBag },
    { name: "Kategori", path: "/categories", icon: LayoutGrid },
    { name: "Promo", path: "/promo", icon: Tag },
    { name: "Layanan", path: "/services", icon: Truck },
    { name: "Blog", path: "/blog", icon: BookOpenText },
    { name: "Lacak Pengiriman", path: "/tracking", icon: Truck },
  ];
  
  const accountItems = [
    { name: "Profil", path: "/profile", icon: User },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Keranjang", path: "/cart", icon: ShoppingCart },
    { name: "Riwayat", path: "/history", icon: Clock },
  ];

  // Admin menu items
  const adminItems = [
    { name: "Dashboard Admin", path: "/admin", icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-sidebar backdrop-blur-md border-r border-sidebar-border shadow-xl transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-full bg-nature-500 center">
              <span className="text-white font-semibold text-sm">SAM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">SAM</span>
              <span className="text-xs text-muted-foreground -mt-1">Siagian Agro Mandiri</span>
            </div>
          </Link>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-sidebar-accent transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="py-6 px-4 space-y-8 overflow-y-auto subtle-scroll max-h-[calc(100vh-4rem)]">
          <nav className="space-y-1.5">
            <h3 className="text-xs font-medium text-muted-foreground px-2 mb-2">MENU</h3>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                  isActive(item.path) 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <nav className="space-y-1.5">
            <h3 className="text-xs font-medium text-muted-foreground px-2 mb-2">AKUN</h3>
            {accountItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                  isActive(item.path) 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Show admin section only for admin users */}
            {isAdmin && (
              <>
                <h3 className="text-xs font-medium text-muted-foreground px-2 my-2 pt-4">ADMIN</h3>
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive(item.path) 
                        ? "bg-blue-100 text-blue-700 font-medium" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
          
          <div className="px-4 py-6">
            <div className="glass-card p-4 space-y-3">
              <p className="text-sm text-center">Belum memiliki akun?</p>
              <Link
                to="/login"
                onClick={onClose}
                className="block w-full px-4 py-2 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md text-center transition-colors"
              >
                Masuk / Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hiding the desktop sidebar as requested */}
    </>
  );
}
