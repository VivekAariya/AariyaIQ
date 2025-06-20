import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Montserrat } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Toaster as SonnerToast } from "@/components/ui/sonner";

// Since Lastica isn't available in Google Fonts, we'll use a similar font
// and add custom font styles in globals.css
const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-lastica",
});

export const metadata: Metadata = {
    title: "AariyaIQ - A Learning Hub",
    description: "A learning platform by AariyaTech",
    generator: "v0.dev",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={montserrat.variable}>
            <body className="font-lastica pt-16 relative bg-gradient-to-b from-slate-950 to-slate-900">
                <Toaster />
                <SonnerToast richColors closeButton />
                {children}
            </body>
        </html>
    );
}
