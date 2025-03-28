
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Create a new customer profile
export const createCustomerProfile = async (userId: string, userData: any) => {
  try {
    console.log("Creating customer profile for user:", userId);
    
    // First try to get default bronze customer type
    const { data: customerTypes, error: typesError } = await supabase
      .from("tipe_pelanggan")
      .select("id_tipe_pelanggan")
      .eq("level_member", "bronze")
      .limit(1);

    if (typesError) {
      console.error("Error fetching customer types:", typesError);
      throw new Error("Gagal mendapatkan tipe pelanggan");
    }
    
    // If no customer type exists, create a default one
    let typeId = customerTypes && customerTypes.length > 0 
      ? customerTypes[0].id_tipe_pelanggan 
      : null;
    
    if (!typeId) {
      console.log("No bronze customer type found, creating default type");
      const { data: newType, error: createTypeError } = await supabase
        .from("tipe_pelanggan")
        .insert({
          nama_tipe: "Pelanggan Baru",
          level_member: "bronze",
          jumlah_minimal: 0,
          persentase_diskon: 0
        })
        .select("id_tipe_pelanggan")
        .single();
      
      if (createTypeError) {
        console.error("Error creating default customer type:", createTypeError);
        throw new Error("Gagal membuat tipe pelanggan default");
      }
      
      typeId = newType?.id_tipe_pelanggan;
    }

    // Now create the customer profile
    const { error: profileError } = await supabase
      .from("pelanggan")
      .insert({
        id_user: userId,
        id_tipe_pelanggan: typeId,
        nama_lengkap: userData.name,
        email: userData.email,
        nomor_whatsapp: userData.phone || null,
      });

    if (profileError) {
      console.error("Error creating customer profile:", profileError);
      throw new Error(profileError.message || "Gagal membuat profil pelanggan");
    }
    
    console.log("Successfully created customer profile");
    return { error: null };
  } catch (error: any) {
    console.error("Error in createCustomerProfile:", error);
    toast({
      variant: "destructive",
      title: "Error Creating Profile",
      description: error.message || "An unknown error occurred",
    });
    return { error };
  }
};
