
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/ui/ProductCard";

// Mock product data (would be replaced with API calls in a real application)
const product = {
  id: "prod-1",
  name: "Benih Jagung Hibrida Super",
  price: 85000,
  stock: 45,
  rating: 4.7,
  reviewCount: 124,
  category: "Bibit & Benih",
  description: "Benih jagung hibrida berkualitas tinggi yang telah teruji dan memiliki daya tumbuh tinggi. Cocok untuk berbagai jenis tanah dan menghasilkan jagung dengan ukuran besar dan rasa manis.",
  features: [
    "Daya tumbuh 95-98%",
    "Tahan terhadap penyakit karat daun",
    "Hasil panen 9-12 ton/hektar",
    "Umur panen 85-95 hari"
  ],
  specifications: {
    "Berat": "500 gram",
    "Jumlah Benih": "± 2.500 biji",
    "Produsen": "AgroBenih Indonesia",
    "Masa Kedaluwarsa": "12 bulan dari tanggal produksi",
    "Daya Tumbuh": "Min. 95%",
    "Sertifikasi": "Kementan RI"
  },
  images: [
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybiUyMHNlZWRzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1583759149331-a42a1bcc546c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvcm58ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1615386118277-dd2118422d7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNvcm58ZW58MHx8MHx8fDA%3D"
  ]
};

// Mock related products
const relatedProducts = [
  {
    id: "prod-5",
    name: "Benih Sayuran Organik Mix",
    price: 45000,
    image: "https://images.unsplash.com/photo-1591584771545-7eb60a242c1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlZWRzfGVufDB8fDB8fHww",
    rating: 4.4
  },
  {
    id: "prod-9",
    name: "Benih Cabai Rawit Unggul",
    price: 38000,
    image: "https://images.unsplash.com/photo-1596904203995-4476f7fda30f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGklMjBzZWVkc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6
  },
  {
    id: "prod-10",
    name: "Benih Tomat Hibrida",
    price: 42000,
    discountPrice: 35000,
    image: "https://images.unsplash.com/photo-1592491444783-9d2130ce7692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvJTIwc2VlZHN8ZW58MHx8MHx8fDA%3D",
    rating: 4.5
  },
  {
    id: "prod-11",
    name: "Benih Padi Unggul",
    price: 55000,
    image: "https://images.unsplash.com/photo-1620158849687-c8f487579722?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZSUyMHNlZWRzfGVufDB8fDB8fHww",
    rating: 4.8
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  // In a real app, you would fetch the product data here based on the ID parameter
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-10 pb-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Beranda
          </Link>
          <ChevronRight size={14} className="mx-2 text-muted-foreground" />
          <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
            Toko
          </Link>
          <ChevronRight size={14} className="mx-2 text-muted-foreground" />
          <Link 
            to={`/categories/${product.category}`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2 text-muted-foreground" />
          <span className="font-medium truncate">{product.name}</span>
        </nav>
        
        {/* Product detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${index === activeImage ? 'border-nature-500' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={18} fill="#a97c4b" strokeWidth={0} className="text-earth-500" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} ulasan)</span>
                </div>
                
                <span className="text-nature-600">
                  {product.stock > 10 ? 'Stok Tersedia' : `Stok Terbatas: ${product.stock}`}
                </span>
              </div>
            </div>
            
            <div className="text-2xl md:text-3xl font-bold text-nature-700">{formattedPrice}</div>
            
            <div className="flex flex-col gap-4 pb-6 border-b">
              {/* Quantity selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Jumlah</label>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-border rounded-l-md flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="w-16 h-10 border-y border-border text-center focus:outline-none"
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 border border-border rounded-r-md flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-md flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={18} />
                  <span>Tambah ke Keranjang</span>
                </button>
                
                <button className="px-4 py-3 border border-border hover:bg-muted rounded-md transition-colors">
                  <Heart size={18} />
                </button>
                
                <button className="px-4 py-3 border border-border hover:bg-muted rounded-md transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            
            {/* Shipping info */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-nature-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Pengiriman Cepat</h4>
                  <p className="text-sm text-muted-foreground">Dikirim dari Jakarta, estimasi tiba 2-3 hari kerja</p>
                </div>
              </div>
            </div>
            
            {/* Key features */}
            <div>
              <h3 className="font-medium mb-3">Keunggulan Produk:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-nature-500 mt-1.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="border-b">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "description" ? 'border-nature-500 text-nature-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Deskripsi
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "specifications" ? 'border-nature-500 text-nature-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Spesifikasi
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "reviews" ? 'border-nature-500 text-nature-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Ulasan ({product.reviewCount})
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose prose-nature max-w-none">
                <p>{product.description}</p>
                <p>
                  Benih jagung hibrida super ini merupakan hasil pengembangan teknologi pertanian terbaru yang dikembangkan untuk membantu petani mendapatkan hasil panen yang maksimal. Dengan kualitas genetik unggul, benih ini mampu menghasilkan tanaman jagung yang tumbuh seragam, tahan terhadap berbagai penyakit, dan memberikan hasil panen yang berlimpah.
                </p>
                <p>
                  Cara penanaman sangat mudah dan cocok untuk berbagai jenis tanah. Petani hanya perlu memastikan kelembaban tanah yang cukup dan pemupukan yang sesuai untuk mendapatkan hasil terbaik. Benih ini telah melalui berbagai pengujian dan telah tersertifikasi oleh Kementerian Pertanian Republik Indonesia.
                </p>
              </div>
            )}
            
            {activeTab === "specifications" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-muted p-4 rounded-lg">
                      <span className="block text-sm text-muted-foreground mb-1">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Ulasan belum tersedia untuk produk ini.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Produk Terkait</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                id={relProduct.id}
                name={relProduct.name}
                price={relProduct.price}
                discountPrice={relProduct.discountPrice}
                image={relProduct.image}
                rating={relProduct.rating}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
