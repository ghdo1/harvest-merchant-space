
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Leaf, TrendingUp, Truck, Star, Award, Phone } from "lucide-react";
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
    id: "pupuk",
    name: "Pupuk",
    image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    productCount: 182
  },
  {
    id: "pestisida",
    name: "Pestisida",
    image: "https://images.unsplash.com/photo-1599454400963-b90b1cc4a364?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlc3RpY2lkZXxlbnwwfHwwfHx8MA%3D%3D",
    productCount: 78
  },
  {
    id: "benih",
    name: "Benih dan Bibit",
    image: "https://images.unsplash.com/photo-1585579490173-cdd36dca9866?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlZWRzfGVufDB8fDB8fHww",
    productCount: 245
  },
  {
    id: "alat",
    name: "Alat Pertanian",
    image: "https://images.unsplash.com/photo-1593025351836-65bb75e86c71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm0lMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D",
    productCount: 124
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

// Farming tips for interactive section
const farmingTips = [
  {
    title: "Cara Mengetahui Kebutuhan Pupuk yang Tepat",
    content: "Analisis tanah adalah langkah penting untuk mengetahui kebutuhan pupuk yang tepat. Anda dapat melakukan analisis tanah sederhana atau mengirim sampel ke laboratorium untuk hasil yang lebih akurat. Hasil analisis akan menunjukkan nutrisi apa yang sudah ada dan apa yang perlu ditambahkan.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Teknik Menanam Benih yang Benar",
    content: "Kedalaman tanam yang tepat sangat penting untuk keberhasilan perkecambahan. Aturan umumnya adalah menanam benih sedalam 2-3 kali ukuran benih tersebut. Jaga kelembaban tanah tetapi hindari terlalu basah yang dapat menyebabkan pembusukan.",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBsYW50aW5nfGVufDB8fDB8fHww"
  },
  {
    title: "Pengendalian Hama Secara Alami",
    content: "Penggunaan predator alami seperti ladybug untuk mengendalikan aphid, menanam tanaman pendamping yang mengusir hama, dan rotasi tanaman dapat membantu mengendalikan hama tanpa menggunakan bahan kimia berbahaya.",
    image: "https://images.unsplash.com/photo-1538968195982-815fb1bc231d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVzdCUyMGNvbnRyb2x8ZW58MHx8MHx8fDA%3D"
  }
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-16 pb-20">
        {/* Hero Section */}
        <section>
          <HeroSection
            title="Sukses Bertani Dimulai Dari Sini"
            subtitle="Temukan beragam produk pertanian terbaik dengan kualitas premium yang akan membantu meningkatkan hasil panen Anda."
            image="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFybWVyfGVufDB8fDB8fHww"
            ctaText="Belanja Sekarang"
            ctaLink="/shop"
          />
        </section>
        
        {/* Category Section */}
        <section>
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-2xl font-semibold">Kategori Produk</h2>
            <Link to="/categories" className="text-nature-600 hover:text-nature-700 flex items-center gap-1 font-medium">
              <span>Lihat Semua</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
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
        
        {/* Interactive Tips Section */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Tips Bertani</h2>
            <Link to="/blog" className="text-nature-600 hover:text-nature-700 flex items-center gap-1 font-medium">
              <span>Lihat Semua Tips</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {farmingTips.map((tip, index) => (
              <div key={index} className="glass-card overflow-hidden group hover:shadow-accent transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{tip.content}</p>
                  <Link
                    to="/blog"
                    className="mt-4 inline-flex items-center text-nature-600 hover:text-nature-700 font-medium"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Featured Product */}
        <section className="px-4">
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
        <section className="py-8 px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">Mengapa Memilih SAM</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <Leaf size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Produk Berkualitas</h3>
              <p className="text-muted-foreground">Kami hanya menyediakan produk pertanian terbaik yang telah teruji kualitasnya.</p>
            </div>
            
            <div className="glass-card p-6 text-center hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <Truck size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Pengiriman Cepat</h3>
              <p className="text-muted-foreground">Produk dikirim langsung ke lokasi Anda dengan cepat dan aman.</p>
            </div>
            
            <div className="glass-card p-6 text-center hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900/30 rounded-xl center mx-auto mb-4">
                <TrendingUp size={24} className="text-nature-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Hasil Maksimal</h3>
              <p className="text-muted-foreground">Produk kami dirancang untuk membantu meningkatkan hasil panen Anda.</p>
            </div>
          </div>
        </section>
        
        {/* Popular Products */}
        <section className="px-4">
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
        
        {/* Testimonials Section */}
        <section className="px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">Apa Kata Pelanggan Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 relative">
              <div className="absolute top-6 right-6 text-amber-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Budi Santoso</h3>
                  <p className="text-sm text-muted-foreground">Petani, Medan</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Pupuk dari SAM memberikan hasil yang luar biasa untuk kebun saya. Tanaman tumbuh lebih subur dan hasil panen meningkat signifikan."
              </p>
            </div>
            
            <div className="glass-card p-6 relative">
              <div className="absolute top-6 right-6 text-amber-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBpbmRvbmVzaWF8ZW58MHx8MHx8fDA%3D" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Siti Rahmawati</h3>
                  <p className="text-sm text-muted-foreground">Pemilik Kebun, Pekanbaru</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Pelayanan SAM sangat profesional, pengiriman cepat dan produk selalu dalam kondisi baik. Saya sangat puas dan akan terus berlangganan."
              </p>
            </div>
            
            <div className="glass-card p-6 relative">
              <div className="absolute top-6 right-6 text-amber-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
                <Star size={20} fill="currentColor" className="inline-block ml-1" />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Eko Prasetyo</h3>
                  <p className="text-sm text-muted-foreground">Distributor, Palembang</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Sebagai distributor, saya sangat menghargai konsistensi kualitas dari produk SAM. Pelanggan saya selalu puas dengan hasil yang mereka dapatkan."
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Banner */}
        <section className="px-4">
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
        
        {/* Contact Section */}
        <section className="px-4">
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Hubungi Kami</h2>
                <p className="text-muted-foreground mb-6">
                  Punya pertanyaan tentang produk kami atau butuh saran pertanian? Jangan ragu untuk menghubungi tim kami.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-nature-100 center text-nature-600">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Siagian Agro Mandiri</h3>
                      <p className="text-sm text-muted-foreground">Sukses Bertani Dimulai Dari Sini</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-nature-100 center text-nature-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Hubungi Kami</h3>
                      <a 
                        href="tel:+6281234567890" 
                        className="text-sm text-nature-600 hover:text-nature-700 transition-colors"
                      >
                        +62 812 3456 7890
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nama</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pesan</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Apa yang ingin Anda sampaikan..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
