
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ProductCard } from "@/components/ui/ProductCard";

// Mock categories data (would be replaced with API calls)
const allCategories = [
  {
    id: "cat-1",
    name: "Bibit & Benih",
    image: "https://images.unsplash.com/photo-1585579490173-cdd36dca9866?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlZWRzfGVufDB8fDB8fHww",
    productCount: 245,
    description: "Beragam bibit dan benih tanaman berkualitas tinggi untuk hasil panen terbaik."
  },
  {
    id: "cat-2",
    name: "Pupuk & Nutrisi",
    image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    productCount: 182,
    description: "Pupuk organik dan anorganik serta nutrisi lengkap untuk pertumbuhan optimal tanaman."
  },
  {
    id: "cat-3",
    name: "Alat Pertanian",
    image: "https://images.unsplash.com/photo-1593025351836-65bb75e86c71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm0lMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D",
    productCount: 124,
    description: "Berbagai alat dan perlengkapan pertanian untuk memudahkan pekerjaan Anda di lahan."
  },
  {
    id: "cat-4",
    name: "Pestisida Organik",
    image: "https://images.unsplash.com/photo-1599454400963-b90b1cc4a364?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlc3RpY2lkZXxlbnwwfHwwfHx8MA%3D%3D",
    productCount: 78,
    description: "Pestisida ramah lingkungan yang efektif mengendalikan hama dan penyakit tanaman."
  },
  {
    id: "cat-5",
    name: "Peralatan Panen",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFydmVzdCUyMHRvb2xzfGVufDB8fDB8fHww",
    productCount: 56,
    description: "Peralatan panen untuk membantu Anda mengumpulkan hasil tani dengan efisien."
  },
  {
    id: "cat-6",
    name: "Sistem Irigasi",
    image: "https://images.unsplash.com/photo-1574943320219-89283140733d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlycmlnYXRpb258ZW58MHx8MHx8fDA%3D",
    productCount: 42,
    description: "Sistem irigasi modern untuk distribusi air yang efektif dan efisien di lahan pertanian."
  },
  {
    id: "cat-7",
    name: "Perlengkapan Ternak",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694e30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2ZXN0b2NrfGVufDB8fDB8fHww",
    productCount: 67,
    description: "Berbagai perlengkapan dan peralatan untuk memelihara ternak dengan baik."
  },
  {
    id: "cat-8",
    name: "Hidroponik",
    image: "https://images.unsplash.com/photo-1558915900-800f29828920?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkcm9wb25pY3N8ZW58MHx8MHx8fDA%3D",
    productCount: 93,
    description: "Sistem dan perlengkapan hidroponik lengkap untuk pertanian modern tanpa tanah."
  }
];

// Mock featured products for each category
const featuredProducts = {
  "cat-1": [
    {
      id: "prod-1",
      name: "Benih Jagung Hibrida Super",
      price: 85000,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybiUyMHNlZWRzfGVufDB8fDB8fHww",
      rating: 4.7
    },
    {
      id: "prod-5",
      name: "Benih Sayuran Organik Mix",
      price: 45000,
      image: "https://images.unsplash.com/photo-1591584771545-7eb60a242c1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlZWRzfGVufDB8fDB8fHww",
      rating: 4.4
    }
  ],
  "cat-2": [
    {
      id: "prod-2",
      name: "Pupuk NPK 16-16-16 Premium",
      price: 120000,
      discountPrice: 99000,
      image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 4.5
    },
    {
      id: "prod-6",
      name: "Pupuk Organik Granular",
      price: 75000,
      image: "https://images.unsplash.com/photo-1562525882-58a43c9d6c76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWN1bHR1cmFsJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.3
    }
  ],
  "cat-3": [
    {
      id: "prod-3",
      name: "Cangkul Stainless Steel",
      price: 195000,
      image: "https://images.unsplash.com/photo-1542820242-a639c44ef40e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9lfGVufDB8fDB8fHww",
      rating: 4.9
    },
    {
      id: "prod-8",
      name: "Sarung Tangan Berkebun",
      price: 35000,
      discountPrice: 28000,
      image: "https://images.unsplash.com/photo-1620905969432-b6de2d707204?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZyUyMGdsb3Zlc3xlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.2
    }
  ]
};

const Categories = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-10 pb-16">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Kategori Produk</h1>
          <p className="text-muted-foreground">Temukan berbagai produk pertanian berdasarkan kategori</p>
        </div>
        
        {/* Main Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-medium transition-shadow"
            >
              <Link to={`/categories/${category.id}`}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/categories/${category.id}`}>
                  <h2 className="text-xl font-semibold hover:text-nature-600 transition-colors">
                    {category.name}
                  </h2>
                </Link>
                
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  {category.productCount} produk
                </p>
                
                <p className="text-sm">
                  {category.description}
                </p>
                
                <Link
                  to={`/categories/${category.id}`}
                  className="mt-4 inline-block px-4 py-2 bg-nature-100 dark:bg-nature-900/30 hover:bg-nature-200 dark:hover:bg-nature-800/40 text-nature-700 dark:text-nature-300 rounded-md font-medium transition-colors text-sm"
                >
                  Lihat Produk
                </Link>
              </div>
              
              {/* Featured products for the first 3 categories */}
              {featuredProducts[category.id] && (
                <div className="px-4 pb-4">
                  <h3 className="text-sm font-medium mb-3">Produk Populer:</h3>
                  <div className="flex flex-wrap gap-2">
                    {featuredProducts[category.id].map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="inline-flex items-center gap-2 p-2 bg-muted/60 rounded-lg hover:bg-muted transition-colors flex-grow sm:flex-grow-0"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="text-xs truncate max-w-[120px]">{product.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Popular products by category */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Produk Populer dari Kategori Teratas</h2>
          
          {Object.keys(featuredProducts).slice(0, 3).map((categoryId) => {
            const category = allCategories.find(c => c.id === categoryId);
            
            return (
              <div key={categoryId} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium">{category?.name}</h3>
                  <Link 
                    to={`/categories/${categoryId}`}
                    className="text-nature-600 hover:text-nature-700 hover:underline text-sm font-medium"
                  >
                    Lihat Semua
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {featuredProducts[categoryId].map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      discountPrice={product.discountPrice}
                      image={product.image}
                      rating={product.rating}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </MainLayout>
  );
};

export default Categories;
