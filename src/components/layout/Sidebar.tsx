
import { Home, ShoppingBag, LayoutGrid, Tag, User, Heart, ShoppingCart, Clock, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Toko", path: "/shop", icon: ShoppingBag },
    { name: "Kategori", path: "/categories", icon: LayoutGrid },
    { name: "Promo", path: "/promo", icon: Tag },
  ];
  
  const accountItems = [
    { name: "Profil", path: "/profile", icon: User },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Keranjang", path: "/cart", icon: ShoppingCart },
    { name: "Riwayat", path: "/history", icon: Clock },
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
              <span className="text-white font-semibold text-sm">AC</span>
            </div>
            <span className="font-semibold text-lg">AgroCom</span>
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
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar border-r border-sidebar-border">
        <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-nature-500 center">
              <span className="text-white font-semibold text-sm">AC</span>
            </div>
            <span className="font-semibold text-lg">AgroCom</span>
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto subtle-scroll">
          <nav className="space-y-1.5">
            <h3 className="text-xs font-medium text-muted-foreground px-2 mb-2">MENU</h3>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
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
          
          <div className="px-4 py-6">
            <div className="glass-card p-4 space-y-3">
              <p className="text-sm text-center">Belum memiliki akun?</p>
              <Link
                to="/login"
                className="block w-full px-4 py-2 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md text-center transition-colors"
              >
                Masuk / Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
