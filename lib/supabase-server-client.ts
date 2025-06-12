import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is not defined in environment variables.");
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

export function createServerClient() {
    return createServerComponentClient({ cookies }, { supabaseKey: supabaseAnonKey, supabaseUrl });
}
