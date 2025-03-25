
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  variant?: "default" | "horizontal";
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  discountPrice,
  image,
  rating,
  isNew = false,
  variant = "default",
  className
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
  
  const formattedDiscountPrice = discountPrice
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(discountPrice)
    : null;
  
  return (
    <div 
      className={cn(
        "product-card group relative rounded-xl overflow-hidden bg-card transition-all hover:shadow-medium", 
        variant === "horizontal" ? "flex gap-4" : "flex flex-col",
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        variant === "horizontal" ? "w-1/3 flex-shrink-0" : "w-full"
      )}>
        <Link to={`/products/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="product-image w-full h-full"
          />
        </Link>
        
        {isNew && (
          <div className="absolute top-2 left-2 bg-nature-500 text-white text-xs font-medium px-2 py-0.5 rounded-md">
            Baru
          </div>
        )}
        
        <button 
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-nature-500 flex items-center justify-center transition-colors shadow-sm"
        >
          <Heart size={16} />
        </button>
      </div>
      
      <div className={cn(
        "flex flex-col gap-1 p-3",
        variant === "horizontal" ? "flex-1" : ""
      )}>
        <h3 className="font-medium line-clamp-2 transition-colors group-hover:text-nature-600">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>
        
        <div className="flex items-center gap-0.5 text-earth-500">
          <Star size={14} fill="#a97c4b" strokeWidth={0} />
          <span className="text-sm">{rating}</span>
        </div>
        
        <div className="mt-1">
          {discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{formattedDiscountPrice}</span>
              <span className="text-sm text-muted-foreground line-through">{formattedPrice}</span>
            </div>
          ) : (
            <span className="text-lg font-semibold">{formattedPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
