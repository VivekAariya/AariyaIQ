"use client";
import { useBrowserClient } from "@/lib/supabase-browser-client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function ClientProvider({
    children,
    initialSession,
}: {
    children: React.ReactNode;
    initialSession: any;
}) {
    const [supabase] = useState(useBrowserClient);
    // useEffect(() => {
    //     const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    //         // optional: logic on auth change, e.g., refresh router
    //     });
    //     return () => subscription.unsubscribe();
    // }, [supabase]);

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
            {children}
        </SessionContextProvider>
    );
}
