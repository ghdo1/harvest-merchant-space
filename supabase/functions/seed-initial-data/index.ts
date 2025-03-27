
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Seed customer types
    const { error: customerTypeError } = await supabaseClient
      .from("tipe_pelanggan")
      .upsert([
        {
          nama_tipe: "Bronze Member",
          level_member: "bronze",
          jumlah_minimal: 0,
          persentase_diskon: 0,
        },
        {
          nama_tipe: "Silver Member",
          level_member: "silver",
          jumlah_minimal: 1000000,
          persentase_diskon: 5,
        },
        {
          nama_tipe: "Gold Member",
          level_member: "gold",
          jumlah_minimal: 5000000,
          persentase_diskon: 10,
        },
      ], { onConflict: "level_member" });

    if (customerTypeError) {
      throw new Error(`Error seeding customer types: ${customerTypeError.message}`);
    }

    // Seed product categories
    const { error: categoriesError } = await supabaseClient
      .from("kategori_produk")
      .upsert([
        {
          nama_kategori: "Pupuk",
          slug_kategori: "pupuk",
          deskripsi: "Berbagai jenis pupuk untuk kebutuhan pertanian",
        },
        {
          nama_kategori: "Pestisida",
          slug_kategori: "pestisida",
          deskripsi: "Produk untuk mengendalikan hama dan penyakit tanaman",
        },
        {
          nama_kategori: "Benih dan Bibit",
          slug_kategori: "benih-dan-bibit",
          deskripsi: "Koleksi benih dan bibit tanaman berkualitas",
        },
        {
          nama_kategori: "Alat Pertanian",
          slug_kategori: "alat-pertanian",
          deskripsi: "Peralatan dan perlengkapan untuk aktivitas pertanian",
        },
      ], { onConflict: "slug_kategori" });

    if (categoriesError) {
      throw new Error(`Error seeding categories: ${categoriesError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Initial data seeded successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
