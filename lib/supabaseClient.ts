import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// if (!supabaseUrl || !supabaseAnonKey ) {
if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Supabase URL or Anon Key is not defined in environment variables.");
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

// export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseServiceRoleClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
    },
});
