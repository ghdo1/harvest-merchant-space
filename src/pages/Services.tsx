
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Truck, Package, FileText, Leaf, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman cepat ke seluruh wilayah Indonesia dengan jaminan keamanan produk."
    },
    {
      icon: Leaf,
      title: "Konsultasi Pertanian",
      description: "Konsultasikan kebutuhan pertanian Anda dengan tim ahli kami untuk solusi terbaik."
    },
    {
      icon: FileText,
      title: "Pemesanan Khusus",
      description: "Layanan pemesanan khusus untuk kebutuhan produk pertanian dalam jumlah besar."
    },
    {
      icon: Package,
      title: "Pengadaan Bibit Premium",
      description: "Layanan pengadaan bibit premium berkualitas tinggi dengan jaminan keaslian."
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Layanan SAM</h1>
          <p className="text-muted-foreground mb-8">
            Siagian Agro Mandiri menyediakan berbagai layanan pertanian terpadu untuk membantu petani mendapatkan hasil panen terbaik.
          </p>
        </section>

        {/* Services Grid */}
        <section className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass-card p-6 flex flex-col md:flex-row gap-4 md:items-start">
                <div className="w-12 h-12 rounded-xl bg-nature-100 dark:bg-nature-900/30 center text-nature-600 shrink-0 mx-auto md:mx-0">
                  <service.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-center md:text-left">{service.title}</h3>
                  <p className="text-muted-foreground text-center md:text-left">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Section */}
        <section className="px-4 bg-nature-50 py-12 -mx-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Keunggulan Layanan Kami</h2>
              <p className="text-muted-foreground">Kami berkomitmen memberikan layanan terbaik untuk pertanian Indonesia</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-nature-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Produk Berkualitas</h3>
                  <p className="text-muted-foreground">Semua produk kami melewati proses seleksi ketat untuk memastikan kualitas terbaik.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-nature-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Tim Ahli Berpengalaman</h3>
                  <p className="text-muted-foreground">Tim konsultasi kami terdiri dari ahli pertanian dengan pengalaman puluhan tahun.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-nature-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Pengiriman Terjamin</h3>
                  <p className="text-muted-foreground">Layanan pengiriman dengan kemasan khusus untuk menjaga kualitas produk.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-nature-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Dukungan Pasca Pembelian</h3>
                  <p className="text-muted-foreground">Konsultasi gratis setelah pembelian untuk memastikan hasil optimal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4">
          <div className="glass-card p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Butuh Bantuan Lebih Lanjut?</h2>
            <p className="text-muted-foreground mb-6">
              Tim kami siap membantu Anda dengan kebutuhan pertanian Anda. Hubungi kami untuk konsultasi gratis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
              >
                Hubungi Kami
              </Link>
              <a
                href="tel:+6281234567890"
                className="px-6 py-3 border border-nature-600 text-nature-600 rounded-md hover:bg-nature-50 transition-colors"
              >
                +62 812 3456 7890
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Services;
