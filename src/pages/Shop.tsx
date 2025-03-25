
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowUpDown, Filter, Search, SlidersHorizontal } from "lucide-react";

// Mock data (would be replaced with API calls in a real application)
const products = [
  {
    id: "prod-1",
    name: "Benih Jagung Hibrida Super",
    price: 85000,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybiUyMHNlZWRzfGVufDB8fDB8fHww",
    rating: 4.7,
    isNew: true,
    category: "Bibit & Benih"
  },
  {
    id: "prod-2",
    name: "Pupuk NPK 16-16-16 Premium",
    price: 120000,
    discountPrice: 99000,
    image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    category: "Pupuk & Nutrisi"
  },
  {
    id: "prod-3",
    name: "Cangkul Stainless Steel",
    price: 195000,
    image: "https://images.unsplash.com/photo-1542820242-a639c44ef40e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9lfGVufDB8fDB8fHww",
    rating: 4.9,
    category: "Alat Pertanian"
  },
  {
    id: "prod-4",
    name: "Sprayer Manual 15 Liter",
    price: 250000,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3ByYXllcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
    category: "Alat Pertanian"
  },
  {
    id: "prod-5",
    name: "Benih Sayuran Organik Mix",
    price: 45000,
    image: "https://images.unsplash.com/photo-1591584771545-7eb60a242c1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlZWRzfGVufDB8fDB8fHww",
    rating: 4.4,
    category: "Bibit & Benih"
  },
  {
    id: "prod-6",
    name: "Pupuk Organik Granular",
    price: 75000,
    discountPrice: 65000,
    image: "https://images.unsplash.com/photo-1562525882-58a43c9d6c76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWN1bHR1cmFsJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.3,
    category: "Pupuk & Nutrisi"
  },
  {
    id: "prod-7",
    name: "Nematisida Organik 1 Liter",
    price: 135000,
    image: "https://images.unsplash.com/photo-1578852612716-854e527abf2e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b3JnYW5pYyUyMHBlc3RpY2lkZXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    category: "Pestisida Organik"
  },
  {
    id: "prod-8",
    name: "Sarung Tangan Berkebun",
    price: 35000,
    discountPrice: 28000,
    image: "https://images.unsplash.com/photo-1620905969432-b6de2d707204?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZyUyMGdsb3Zlc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.2,
    category: "Alat Pertanian"
  }
];

const categories = [
  "Semua Kategori",
  "Bibit & Benih",
  "Pupuk & Nutrisi",
  "Alat Pertanian",
  "Pestisida Organik"
];

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortOption, setSortOption] = useState("terbaru");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== "Semua Kategori") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "harga-asc":
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "harga-desc":
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "terbaru":
      default:
        // Assume the array is already sorted by newest
        break;
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-16">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Toko Produk Pertanian</h1>
          <p className="text-muted-foreground">Temukan beragam produk pertanian berkualitas tinggi</p>
        </div>
        
        {/* Search & Filters */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari produk..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-muted transition-colors"
              >
                <Filter size={18} />
                <span>Filter</span>
              </button>
              
              <div className="relative hidden md:block">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-4 pr-10 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <SlidersHorizontal size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              
              <div className="relative hidden md:block">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="pl-4 pr-10 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30 appearance-none"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="harga-asc">Harga: Rendah ke Tinggi</option>
                  <option value="harga-desc">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
                <ArrowUpDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Mobile filters */}
          {filtersOpen && (
            <div className="mt-4 pt-4 border-t md:hidden grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Urutkan</label>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500/30"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="harga-asc">Harga: Rendah ke Tinggi</option>
                  <option value="harga-desc">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">Tidak ada produk yang ditemukan.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua Kategori");
                  setSortOption("terbaru");
                }}
                className="mt-4 px-4 py-2 bg-nature-100 hover:bg-nature-200 text-nature-700 rounded-md transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
