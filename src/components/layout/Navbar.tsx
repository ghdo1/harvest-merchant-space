
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  scrolled: boolean;
  onMenuClick: () => void;
}

export function Navbar({ scrolled, onMenuClick }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
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
              <span className="text-white font-semibold text-sm">SAM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">SAM</span>
              <span className="text-xs text-muted-foreground -mt-1">Siagian Agro Mandiri</span>
            </div>
          </Link>
          
          {!isMobile && (
            <NavigationMenu className="hidden md:flex ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className={cn(
                      "link-item",
                      isActive("/") && "active"
                    )}
                  >
                    Beranda
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/shop" 
                    className={cn(
                      "link-item",
                      isActive("/shop") && "active"
                    )}
                  >
                    Toko
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isActive("/categories") ? "text-primary font-medium" : ""}>Kategori</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-2 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/categories/pupuk"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Pupuk</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Pupuk organik dan anorganik berkualitas
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/categories/pestisida"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Pestisida</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Pestisida yang aman dan efektif
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/categories/benih"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Benih dan Bibit</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Benih dan bibit unggul berbagai tanaman
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/categories/alat"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Alat Pertanian</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Alat-alat pertanian modern dan tradisional
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/services" 
                    className={cn(
                      "link-item",
                      isActive("/services") && "active"
                    )}
                  >
                    Layanan
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/blog" 
                    className={cn(
                      "link-item",
                      isActive("/blog") && "active"
                    )}
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/tracking" 
                    className={cn(
                      "link-item",
                      isActive("/tracking") && "active"
                    )}
                  >
                    Lacak Pengiriman
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        {/* Center logo for mobile */}
        <Link to="/" className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-nature-500 center">
            <span className="text-white font-semibold text-xs">SAM</span>
          </div>
          <span className="font-semibold">SAM</span>
        </Link>
        
        {/* Right section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Cari"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/wishlist" 
            className="p-2 rounded-md hover:bg-secondary transition-colors hidden md:flex"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>
          
          <Link 
            to="/cart" 
            className="p-2 rounded-md hover:bg-secondary transition-colors relative"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-nature-500 text-white text-[10px] rounded-full center">
              2
            </span>
          </Link>
          
          <Link 
            to="/profile" 
            className="p-2 rounded-md hover:bg-secondary transition-colors hidden md:flex"
            aria-label="Profil"
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
