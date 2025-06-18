"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { BookOpen, FileText, Home, LogOut, Menu, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error logging out:", error);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4 z-50 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-purple-800/90 via-indigo-800/90 to-cyan-700/90 backdrop-blur-lg border-r border-white/10 p-4 text-white transition-transform duration-200 md:relative md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="mb-8 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">AariyaIQ</span>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <Link
                            href="/dashboard"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/dashboard" ? "bg-white/20 text-white" : "hover:bg-white/10"
                            }`}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/courses"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/dashboard/courses")
                                    ? "bg-cyan-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <BookOpen className="mr-2 h-5 w-5 text-cyan-300" />
                            My Courses
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/dashboard/profile" ? "bg-white/20 text-white" : "hover:bg-white/10"
                            }`}
                        >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/dashboard/settings" ? "bg-white/20 text-white" : "hover:bg-white/10"
                            }`}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                        <Link
                            href="/dashboard/learner-application"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/dashboard/learner-application"
                                    ? "bg-white/20 text-white"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Learner Application Status
                        </Link>
                    </nav>
                    <div className="pt-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-white/10"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
