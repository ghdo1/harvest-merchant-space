// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dtlyeqgrposovpofoldd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bHllcWdycG9zb3Zwb2ZvbGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Nzc5MTAsImV4cCI6MjA1ODQ1MzkxMH0.zK3ix3eeYeP08Fb-5uy8gNeJfYwN5A2Os2LEjHV0jK0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);