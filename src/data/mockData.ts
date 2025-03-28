
// Mock user data for authentication and profiles
export const mockUsers = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123", // In a real app, passwords would be hashed
    user_metadata: {
      nama_lengkap: "Demo User",
      nomor_whatsapp: "08123456789"
    }
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    user_metadata: {
      nama_lengkap: "Admin User",
      nomor_whatsapp: "08987654321"
    }
  }
];

// Mock customer profile data
export const mockProfiles = [
  {
    id_user: "1",
    nama_lengkap: "Demo User",
    email: "demo@example.com",
    nomor_whatsapp: "08123456789",
    nomor_telepon: "08123456789",
    tanggal_lahir: "1990-01-01",
    nik: "1234567890123456",
    tipe_pelanggan: {
      nama_tipe: "Pelanggan Baru",
      level_member: "bronze",
      persentase_diskon: 0
    }
  },
  {
    id_user: "2",
    nama_lengkap: "Admin User",
    email: "admin@example.com",
    nomor_whatsapp: "08987654321",
    nomor_telepon: "08987654321",
    tanggal_lahir: "1985-05-05",
    nik: "6543210987654321",
    tipe_pelanggan: {
      nama_tipe: "Pelanggan Premium",
      level_member: "gold",
      persentase_diskon: 10
    }
  }
];

// Mock customer types data
export const mockCustomerTypes = [
  {
    id_tipe_pelanggan: "1",
    nama_tipe: "Pelanggan Baru",
    level_member: "bronze",
    jumlah_minimal: 0,
    persentase_diskon: 0
  },
  {
    id_tipe_pelanggan: "2", 
    nama_tipe: "Pelanggan Premium",
    level_member: "gold",
    jumlah_minimal: 5000000,
    persentase_diskon: 10
  }
];
