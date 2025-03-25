
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export function HeroSection({
  title,
  subtitle,
  image,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-nature-50 to-white dark:from-nature-900/20 dark:to-black/20 border border-nature-100 dark:border-nature-800/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="relative pt-10 pb-12 px-6 md:p-10 lg:p-12 md:max-w-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-nature-800 dark:text-nature-200 leading-tight">
          {title}
        </h1>
        
        <p className="mt-4 text-lg text-muted-foreground">
          {subtitle}
        </p>
        
        <Link
          to={ctaLink}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md transition-colors"
        >
          <span>{ctaText}</span>
          <ChevronRight size={16} />
        </Link>
        
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="bg-nature-100 dark:bg-nature-900/30 px-3 py-1 rounded-full text-sm text-nature-800 dark:text-nature-200">
            100% Organik
          </span>
          <span className="bg-nature-100 dark:bg-nature-900/30 px-3 py-1 rounded-full text-sm text-nature-800 dark:text-nature-200">
            Petani Lokal
          </span>
          <span className="bg-nature-100 dark:bg-nature-900/30 px-3 py-1 rounded-full text-sm text-nature-800 dark:text-nature-200">
            Pengiriman Cepat
          </span>
        </div>
      </div>
      
      <img
        src={image}
        alt="Hero"
        className="hidden md:block absolute top-0 right-0 h-full w-1/2 object-cover object-left"
      />
    </div>
  );
}
