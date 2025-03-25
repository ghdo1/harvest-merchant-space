
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample cart data (in a real app, this would come from a state manager or API)
  const cartItems = [
    {
      id: "prod-1",
      name: "Benih Jagung Hibrida Super",
      price: 85000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybiUyMHNlZWRzfGVufDB8fDB8fHww",
    },
    {
      id: "prod-2",
      name: "Pupuk NPK 16-16-16 Premium",
      price: 99000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 20000 : 0;
  const total = subtotal + shipping;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Keranjang Belanja</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass-card p-4 md:p-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-border">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-3">
                            <button className="w-7 h-7 rounded-md border border-border center">
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button className="w-7 h-7 rounded-md border border-border center">
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">Rp {item.price.toLocaleString()}</span>
                            <button className="text-rose-500 hover:text-rose-600">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-4 md:p-6 sticky top-28">
                <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pengiriman</span>
                    <span>Rp {shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 rounded-md bg-nature-600 text-white font-medium hover:bg-nature-700 transition-colors">
                  Lanjutkan ke Pembayaran
                </button>
                
                <div className="mt-4 text-center">
                  <Link to="/shop" className="text-sm text-nature-600 hover:text-nature-700 flex items-center justify-center gap-1">
                    <ShoppingCart size={14} />
                    <span>Lanjutkan Belanja</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="center mb-4">
              <ShoppingCart size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Keranjang Belanja Kosong</h2>
            <p className="text-muted-foreground mb-6">Anda belum menambahkan produk ke keranjang belanja.</p>
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

export default Cart;
