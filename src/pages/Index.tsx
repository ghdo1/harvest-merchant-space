
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Leaf, TrendingUp, Truck } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { FeaturedProduct } from "@/components/ui/FeaturedProduct";

// Mock data (would be replaced with API calls in a real application)
const featuredProduct = {
  id: "featured-1",
  name: "Pupuk Organik Premium",
  description: "Pupuk organik berkualitas tinggi yang dirancang khusus untuk meningkatkan kesuburan tanah dan produktivitas tanaman. Dibuat dari bahan-bahan alami dan proses fermentasi yang optimal.",
  price: 175000,
  discountPrice: 149000,
  image: "https://images.unsplash.com/photo-1562525882-58a43c9d6c76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWN1bHR1cmFsJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  rating: 4.8
};

const categories = [
  {
    id: "cat-1",
    name: "Bibit & Benih",
    image: "https://images.unsplash.com/photo-1585579490173-cdd36dca9866?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlZWRzfGVufDB8fDB8fHww",
    productCount: 245
  },
  {
    id: "cat-2",
    name: "Pupuk & Nutrisi",
    image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    productCount: 182
  },
  {
    id: "cat-3",
    name: "Alat Pertanian",
    image: "https://images.unsplash.com/photo-1593025351836-65bb75e86c71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm0lMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D",
    productCount: 124
  },
  {
    id: "cat-4",
    name: "Pestisida Organik",
    image: "https://images.unsplash.com/photo-1599454400963-b90b1cc4a364?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlc3RpY2lkZXxlbnwwfHwwfHx8MA%3D%3D",
    productCount: 78
  }
];

const popularProducts = [
  {
    id: "prod-1",
    name: "Benih Jagung Hibrida Super",
    price: 85000,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybiUyMHNlZWRzfGVufDB8fDB8fHww",
    rating: 4.7,
    isNew: true
  },
  {
    id: "prod-2",
    name: "Pupuk NPK 16-16-16 Premium",
    price: 120000,
    discountPrice: 99000,
    image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.5
  },
  {
    id: "prod-3",
    name: "Cangkul Stainless Steel",
    price: 195000,
    image: "https://images.unsplash.com/photo-1542820242-a639c44ef40e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9lfGVufDB8fDB8fHww",
    rating: 4.9
  },
  {
    id: "prod-4",
    name: "Sprayer Manual 15 Liter",
    price: 250000,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3ByYXllcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6
  }
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-12 pb-16">
        {/* Hero Section */}
        <section>
          <HeroSection
            title="Produk Pertanian Berkualitas untuk Hasil Panen Terbaik"
            subtitle="Temukan beragam produk pertanian terbaik dengan kualitas premium yang akan membantu meningkatkan hasil panen Anda."
            image="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFybWVyfGVufDB8fDB8fHww"
            ctaText="Belanja Sekarang"
            ctaLink="/shop"
          />
        </section>
        
        {/* Category Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Kategori Produk</h2>
            <Link to="/categories" className="text-nature-600 hover:text-nature-700 flex items-center gap-1 font-medium">
              <span>Lihat Semua</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
                productCount={category.productCount}
              />
            ))}
          </div>
        </section>
        
        {/* Featured Product */}
        <section>
          <FeaturedProduct
            id={featuredProduct.id}
            name={featuredProduct.name}
            description={featuredProduct.description}
            price={featuredProduct.price}
            discountPrice={featuredProduct.discountPrice}
            image={featuredProduct.image}
            rating={featuredProduct.rating}
          />
        </section>
        
        {/* Why Choose Us */}
        <section className="py-8">
          <h2 className="text-2xl font-semibold text-center mb-8">Mengapa Memilih AgroCom</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <Leaf size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Produk Berkualitas</h3>
              <p className="text-muted-foreground">Kami hanya menyediakan produk pertanian terbaik yang telah teruji kualitasnya.</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <Truck size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Pengiriman Cepat</h3>
              <p className="text-muted-foreground">Produk dikirim langsung ke lokasi Anda dengan cepat dan aman.</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <TrendingUp size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Hasil Maksimal</h3>
              <p className="text-muted-foreground">Produk kami dirancang untuk membantu meningkatkan hasil panen Anda.</p>
            </div>
          </div>
        </section>
        
        {/* Popular Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Produk Populer</h2>
            <Link to="/shop" className="text-nature-600 hover:text-nature-700 flex items-center gap-1 font-medium">
              <span>Lihat Semua</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                rating={product.rating}
                isNew={product.isNew}
              />
            ))}
          </div>
        </section>
        
        {/* CTA Banner */}
        <section>
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-nature-600/90 to-nature-800/90" />
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww" 
              alt="Promo" 
              className="w-full h-48 md:h-56 object-cover"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Dapatkan Penawaran Spesial</h2>
              <p className="text-white/80 text-sm md:text-base max-w-lg mb-4">
                Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama Anda.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-1 text-sm md:text-base bg-white text-nature-700 hover:bg-nature-50 px-4 py-2 rounded-md font-medium transition-colors w-fit"
              >
                <span>Daftar Sekarang</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
