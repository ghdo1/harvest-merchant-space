
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  scrolled: boolean;
  onMenuClick: () => void;
}

export function Navbar({ scrolled, onMenuClick }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-20 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm h-16" 
          : "bg-transparent border-transparent h-20"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Menu size={22} />
          </button>
          
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-nature-500 center">
              <span className="text-white font-semibold text-sm">AC</span>
            </div>
            <span className="font-semibold text-lg">AgroCom</span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1 ml-6">
              <Link to="/" className="link-item active">Beranda</Link>
              <Link to="/shop" className="link-item">Toko</Link>
              <Link to="/categories" className="link-item">Kategori</Link>
              <Link to="/about" className="link-item">Tentang Kami</Link>
            </nav>
          )}
        </div>
        
        {/* Center logo for mobile */}
        <Link to="/" className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-nature-500 center">
            <span className="text-white font-semibold text-xs">AC</span>
          </div>
          <span className="font-semibold">AgroCom</span>
        </Link>
        
        {/* Right section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/cart" 
            className="p-2 rounded-md hover:bg-secondary transition-colors relative"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-nature-500 text-white text-[10px] rounded-full center">
              2
            </span>
          </Link>
          
          <Link 
            to="/login" 
            className="p-2 rounded-md hover:bg-secondary transition-colors hidden md:flex"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
      
      {/* Search bar */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-background border-b border-border transition-transform duration-300 origin-top p-3",
          searchOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari produk pertanian..." 
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
