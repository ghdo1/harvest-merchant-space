
import { mockProfiles } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

export const getProfile = async (userId: string) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the profile for the given user id
    const profile = mockProfiles.find(profile => profile.id_user === userId);
    
    if (!profile) {
      return { data: null, error: new Error("Profile not found") };
    }
    
    return { data: profile, error: null };
  } catch (error: any) {
    console.error("Error in getProfile:", error);
    toast({
      variant: "destructive",
      title: "Error Loading Profile",
      description: error.message || "An unknown error occurred",
    });
    return { data: null, error };
  }
};

export const createCustomerProfile = async (userId: string, userData: any) => {
  try {
    // In a real app, this would create a profile in the database
    // Here we just simulate success
    console.log("Creating customer profile for user:", userId);
    
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
