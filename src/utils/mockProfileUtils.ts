
// This file now connects to the real Supabase database
import { supabase } from "@/integrations/supabase/client";

// Create customer profile with default "bronze" type
export const createCustomerProfile = async (userId: string, userData: any) => {
  console.log('Creating customer profile for user:', userId, userData);
  
  try {
    // User profile is automatically created via our database trigger
    // We don't need to do anything extra here anymore
    return { error: null };
  } catch (error) {
    console.error('Error creating customer profile:', error);
    return { error };
  }
};

// Get customer profile from the database
export const getCustomerProfile = async (userId: string) => {
  console.log('Fetching customer profile for user:', userId);
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id, 
        nama_lengkap, 
        email, 
        nomor_whatsapp,
        user_roles (
          role
        )
      `)
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching customer profile:', error);
      return { data: null, error };
    }
    
    // Format to match the expected structure
    const formattedData = {
      id: data.id,
      nama_lengkap: data.nama_lengkap,
      email: data.email,
      nomor_whatsapp: data.nomor_whatsapp,
      tipe_pelanggan: {
        nama_tipe: "Bronze",
        level_member: "bronze",
        persentase_diskon: 5
      }
    };

    return { data: formattedData, error: null };
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    return { data: null, error };
  }
};

// This function matches what Profile.tsx is importing
export const getProfile = async (userId: string) => {
  return getCustomerProfile(userId);
};

// Fallback mock data for development
const userData = {
  name: "Demo User",
  email: "user@example.com",
  phone: "08123456789"
};
