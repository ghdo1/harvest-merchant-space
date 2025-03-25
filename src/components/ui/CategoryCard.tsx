
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
  variant?: "default" | "large";
  className?: string;
}

export function CategoryCard({
  id,
  name,
  image,
  productCount,
  variant = "default",
  className
}: CategoryCardProps) {
  return (
    <Link 
      to={`/categories/${id}`}
      className={cn(
        "group relative block rounded-xl overflow-hidden transition-all hover:shadow-accent",
        variant === "large" ? "aspect-[21/9]" : "aspect-square",
        className
      )}
    >
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
        <div className="text-white">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-white/80">{productCount} Produk</p>
        </div>
      </div>
    </Link>
  );
}
