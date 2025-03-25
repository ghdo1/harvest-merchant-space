
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample wishlist data (in a real app, this would come from a state manager or API)
  const wishlistItems = [
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
    },
    {
      id: "prod-5",
      name: "Pupuk Organik Premium",
      price: 149000,
      image: "https://images.unsplash.com/photo-1562525882-58a43c9d6c76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWN1bHR1cmFsJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.8
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Wishlist Saya</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="glass-card p-4 relative">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold">Rp {item.price.toLocaleString()}</span>
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <span className="text-sm">{item.rating}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors flex items-center justify-center gap-1.5 text-sm">
                      <ShoppingCart size={16} />
                      <span>Tambah ke Keranjang</span>
                    </button>
                    <button className="p-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-50 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="center mb-4">
              <Heart size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Wishlist Kosong</h2>
            <p className="text-muted-foreground mb-6">Anda belum menambahkan produk ke wishlist.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;
