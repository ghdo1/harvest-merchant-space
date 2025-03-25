
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  className?: string;
}

export function FeaturedProduct({
  id,
  name,
  description,
  price,
  discountPrice,
  image,
  rating,
  className
}: FeaturedProductProps) {
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
        "group relative rounded-xl overflow-hidden bg-gradient-to-r from-nature-50 to-earth-50 dark:from-nature-900/20 dark:to-earth-900/20 border border-nature-100 dark:border-nature-800/20",
        className
      )}
    >
      <div className="md:flex">
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-2xl font-semibold text-nature-800 dark:text-nature-200">{name}</h2>
          
          <div className="flex items-center gap-1 mt-2 text-earth-600">
            <Star size={16} fill="#a97c4b" strokeWidth={0} />
            <span className="text-sm">{rating}</span>
          </div>
          
          <p className="mt-3 text-muted-foreground line-clamp-3">{description}</p>
          
          <div className="mt-4">
            {discountPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-nature-600">{formattedDiscountPrice}</span>
                <span className="text-lg text-muted-foreground line-through">{formattedPrice}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-nature-600">{formattedPrice}</span>
            )}
          </div>
          
          <div className="mt-6 flex gap-3">
            <Link
              to={`/products/${id}`}
              className="px-6 py-3 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md flex items-center gap-2 transition-colors"
            >
              <span>Lihat Detail</span>
              <ChevronRight size={16} />
            </Link>
            
            <button className="px-6 py-3 border border-nature-200 dark:border-nature-700 hover:bg-nature-100 dark:hover:bg-nature-800/40 rounded-md font-medium transition-colors">
              + Keranjang
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {discountPrice && (
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-wheat-500 text-white flex flex-col items-center justify-center">
              <span className="text-xs">Hemat</span>
              <span className="font-bold text-sm">
                {Math.round((1 - discountPrice / price) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
