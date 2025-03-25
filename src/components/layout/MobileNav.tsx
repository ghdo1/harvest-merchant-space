
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, LayoutGrid, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Toko", path: "/shop", icon: ShoppingBag },
    { name: "Kategori", path: "/categories", icon: LayoutGrid },
    { name: "Promo", path: "/promo", icon: Tag },
    { name: "Akun", path: "/login", icon: User }
  ];
  
  return (
    <div className="fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-md border-t border-border z-10 px-2 py-1 md:hidden">
      <nav className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-md transition-colors",
              isActive(item.path) 
                ? "text-nature-600 font-medium" 
                : "text-muted-foreground"
            )}
          >
            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
