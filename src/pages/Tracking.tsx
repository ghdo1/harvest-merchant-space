
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Package, Search, Check, Truck, Box, Home } from "lucide-react";

const Tracking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Sample tracking data (would come from an API in a real app)
  const trackingData = {
    orderId: "ORD12345678",
    status: "Dalam Pengiriman",
    estimatedDelivery: "24 Juni 2023",
    origin: "Labuhanbatu Selatan, Sumatera Utara",
    destination: "Medan, Sumatera Utara",
    timeline: [
      {
        status: "Pesanan Dikonfirmasi",
        date: "20 Juni 2023, 09:15",
        description: "Pesanan Anda telah dikonfirmasi dan sedang diproses",
        icon: Check
      },
      {
        status: "Pesanan Dikemas",
        date: "21 Juni 2023, 14:30",
        description: "Pesanan Anda telah dikemas dan siap untuk dikirim",
        icon: Box
      },
      {
        status: "Pesanan Dikirim",
        date: "22 Juni 2023, 08:45",
        description: "Pesanan Anda telah dikirim dan sedang dalam perjalanan",
        icon: Truck,
        current: true
      },
      {
        status: "Pesanan Diterima",
        date: "Estimasi 24 Juni 2023",
        description: "Pesanan Anda akan diterima",
        icon: Home,
        upcoming: true
      }
    ]
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Lacak Status Pengiriman</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pantau status pengiriman pesanan Anda dengan memasukkan nomor resi atau ID pesanan Anda di bawah ini
          </p>
        </div>
        
        <div className="glass-card p-6 md:p-8 mb-8">
          <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Package size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Masukkan Nomor Resi / ID Pesanan"
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search size={18} />
                <span>Lacak</span>
              </button>
            </div>
          </form>
        </div>
        
        {isTracking && (
          <div className="space-y-8">
            {/* Tracking Summary */}
            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Informasi Pengiriman</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">ID Pesanan</p>
                      <p className="font-medium">{trackingData.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-nature-600">{trackingData.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimasi Tiba</p>
                      <p className="font-medium">{trackingData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Detail Alamat</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Asal</p>
                      <p className="font-medium">{trackingData.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tujuan</p>
                      <p className="font-medium">{trackingData.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tracking Timeline */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6">Status Pengiriman</h2>
              
              <div className="space-y-6">
                {trackingData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full center ${
                        item.current ? "bg-nature-100 text-nature-600" : 
                        item.upcoming ? "bg-muted text-muted-foreground" : 
                        "bg-nature-600 text-white"
                      }`}>
                        <item.icon size={20} />
                      </div>
                      {index < trackingData.timeline.length - 1 && (
                        <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-12 ${
                          item.upcoming ? "bg-muted" : "bg-nature-600"
                        }`} />
                      )}
                    </div>
                    
                    <div className={`flex-1 pb-8 ${item.upcoming ? "opacity-60" : ""}`}>
                      <div className="flex justify-between mb-1">
                        <h3 className={`font-medium ${item.current ? "text-nature-600" : ""}`}>{item.status}</h3>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Tracking;
