
// Mock implementation of customer profile utilities for frontend prototype
export const createCustomerProfile = async (userId: string, userData: any) => {
  console.log('Creating mock customer profile for user:', userId, userData);
  
  // Just simulate success - in a real app this would interact with the database
  return { error: null };
};

export const getCustomerProfile = async (userId: string) => {
  console.log('Fetching mock customer profile for user:', userId);
  
  // Return mock profile data
  return { 
    data: {
      id: userId,
      nama_lengkap: userData?.name || "Demo User",
      email: userData?.email || "user@example.com",
      nomor_whatsapp: userData?.phone || "08123456789",
      tipe_pelanggan: {
        nama_tipe: "Bronze",
        persentase_diskon: 5
      }
    }, 
    error: null 
  };
};

// This function matches what Profile.tsx is importing
export const getProfile = async (userId: string) => {
  console.log('Fetching mock profile for user:', userId);
  
  // Return the same mock data as getCustomerProfile
  return { 
    data: {
      id: userId,
      nama_lengkap: userData?.name || "Demo User",
      email: userData?.email || "user@example.com",
      nomor_whatsapp: userData?.phone || "08123456789",
      tipe_pelanggan: {
        nama_tipe: "Bronze",
        level_member: "bronze",
        persentase_diskon: 5
      }
    }, 
    error: null 
  };
};

// Mock user data for convenience
const userData = {
  name: "Demo User",
  email: "user@example.com",
  phone: "08123456789"
};
