
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nature-900/95 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white center">
                <span className="text-nature-700 font-bold text-sm">SAM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">SAM</span>
                <span className="text-xs text-white/80">Siagian Agro Mandiri</span>
              </div>
            </Link>
            <p className="text-white/80 text-sm mt-4">
              Sukses Bertani Dimulai Dari Sini
            </p>
            <div className="flex items-center space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/shop" className="text-white/80 hover:text-white transition-colors">Toko</Link>
              </li>
              <li>
                <Link to="/categories" className="text-white/80 hover:text-white transition-colors">Kategori</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors">Layanan</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/tracking" className="text-white/80 hover:text-white transition-colors">Lacak Pengiriman</Link>
              </li>
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/pupuk" className="text-white/80 hover:text-white transition-colors">Pupuk</Link>
              </li>
              <li>
                <Link to="/categories/pestisida" className="text-white/80 hover:text-white transition-colors">Pestisida</Link>
              </li>
              <li>
                <Link to="/categories/benih" className="text-white/80 hover:text-white transition-colors">Benih dan Bibit</Link>
              </li>
              <li>
                <Link to="/categories/alat" className="text-white/80 hover:text-white transition-colors">Alat Pertanian</Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 mt-1" />
                <span className="text-white/80">Jl. Lintas Sumut-Riau, Cikampak, Aek Batu, Torgamba, Labuhanbatu Selatan.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+6281234567890" className="text-white/80 hover:text-white transition-colors">+62 812 3456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:info@samagro.com" className="text-white/80 hover:text-white transition-colors">info@samagro.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60">
              &copy; {currentYear} Siagian Agro Mandiri. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">Tentang Kami</Link>
              <Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
