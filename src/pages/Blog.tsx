
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample blog posts data
  const featuredPost = {
    id: "post-1",
    title: "Teknik Budidaya Padi Organik untuk Hasil Panen Maksimal",
    excerpt: "Pelajari teknik terbaru dalam budidaya padi organik yang telah terbukti meningkatkan hasil panen hingga 30% dengan kualitas beras yang lebih baik.",
    image: "https://images.unsplash.com/photo-1530989241456-bf8fb184cc89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGZpZWxkc3xlbnwwfHwwfHx8MA%3D%3D",
    date: "12 Juni 2023",
    author: "Ahmad Fauzi",
    category: "Budidaya"
  };

  const blogPosts = [
    {
      id: "post-2",
      title: "Cara Memilih Pupuk yang Tepat untuk Tanaman Hortikultura",
      excerpt: "Panduan lengkap memilih jenis pupuk yang sesuai untuk berbagai jenis tanaman hortikultura agar memberikan hasil optimal.",
      image: "https://images.unsplash.com/photo-1592722132197-5a5a244425a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
      date: "5 Mei 2023",
      author: "Dewi Rahmawati",
      category: "Pupuk"
    },
    {
      id: "post-3",
      title: "Pengendalian Hama Terpadu pada Tanaman Jagung",
      excerpt: "Strategi pengendalian hama terpadu yang ramah lingkungan untuk melindungi tanaman jagung dari serangan hama.",
      image: "https://images.unsplash.com/photo-1471927866530-2b87c8b68dc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29ybnxlbnwwfHwwfHx8MA%3D%3D",
      date: "23 April 2023",
      author: "Budi Santoso",
      category: "Proteksi Tanaman"
    },
    {
      id: "post-4",
      title: "Teknologi Irigasi Modern untuk Efisiensi Penggunaan Air",
      excerpt: "Mengenal berbagai teknologi irigasi modern yang dapat menghemat penggunaan air hingga 60% dibandingkan metode konvensional.",
      image: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXJyaWdhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      date: "8 Maret 2023",
      author: "Siti Nurhaliza",
      category: "Teknologi Pertanian"
    },
    {
      id: "post-5",
      title: "Persiapan Lahan yang Optimal Sebelum Tanam",
      excerpt: "Panduan lengkap persiapan lahan pertanian untuk memberikan fondasi terbaik bagi pertumbuhan tanaman Anda.",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhcm0lMjBsYW5kfGVufDB8fDB8fHww",
      date: "15 Februari 2023",
      author: "Dani Wijaya",
      category: "Persiapan Lahan"
    },
    {
      id: "post-6",
      title: "Pemanfaatan Limbah Pertanian untuk Pupuk Organik",
      excerpt: "Cara mudah mengolah limbah pertanian menjadi pupuk organik berkualitas tinggi untuk mengurangi biaya produksi.",
      image: "https://images.unsplash.com/photo-1618456703917-0c65d6c17d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcG9zdHxlbnwwfHwwfHx8MA%3D%3D",
      date: "3 Januari 2023",
      author: "Rini Sulistiawati",
      category: "Pupuk Organik"
    }
  ];

  const categories = [
    "Budidaya", "Pupuk", "Proteksi Tanaman", "Teknologi Pertanian", 
    "Persiapan Lahan", "Pupuk Organik", "Pasca Panen", "Pemasaran"
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 space-y-12">
        <section className="px-4">
          <h1 className="text-3xl font-bold mb-3">Blog SAM</h1>
          <p className="text-muted-foreground mb-6">
            Berbagi pengetahuan dan tips pertanian untuk hasil panen terbaik
          </p>
          
          {/* Featured Post */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium px-2.5 py-1 bg-nature-100 text-nature-800 rounded-full">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl font-bold mt-3 mb-3">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="flex items-center gap-1 text-nature-600 hover:text-nature-700 font-medium"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog List and Sidebar */}
        <section className="px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="glass-card overflow-hidden transition-all hover:shadow-accent hover:-translate-y-1">
                    <div className="h-48">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium px-2 py-0.5 bg-nature-100 text-nature-800 rounded-full">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold mt-2 mb-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-sm text-nature-600 hover:text-nature-700 font-medium"
                        >
                          Selengkapnya
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 center rounded-md bg-nature-600 text-white">1</button>
                  <button className="w-9 h-9 center rounded-md hover:bg-muted transition-colors">2</button>
                  <button className="w-9 h-9 center rounded-md hover:bg-muted transition-colors">3</button>
                  <span>...</span>
                  <button className="w-9 h-9 center rounded-md hover:bg-muted transition-colors">8</button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Cari Artikel</h3>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Cari artikel..."
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/blog/category/${category.toLowerCase()}`}
                      className="text-sm px-3 py-1 bg-muted hover:bg-nature-100 hover:text-nature-800 rounded-full transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-2">Dapatkan Update Terbaru</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Daftar untuk mendapatkan artikel dan tips pertanian terbaru langsung ke email Anda.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email"
                    placeholder="Email Anda"
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background"
                  />
                  <button className="w-full py-2.5 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors">
                    Langganan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Blog;
