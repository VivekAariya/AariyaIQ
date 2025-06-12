"use client";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is not defined in environment variables.");
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

export const useBrowserClient = () => createPagesBrowserClient({ supabaseKey: supabaseAnonKey, supabaseUrl });
