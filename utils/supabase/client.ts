import { createBrowserClient } from "@supabase/ssr";
import { logger } from "../logger";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    logger.error("Supabase URL or Anon Key is not defined in environment variables.");
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

export function createClient() {
    return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string);
}
