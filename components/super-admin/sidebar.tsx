"use client";

import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { BookOpen, Home, LogOut, Menu, Settings, Shield, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SuperAdminSidebar() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            logger.error("Error logging out:", error);
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
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-purple-900/95 via-indigo-800/95 to-cyan-900/95 backdrop-blur-[2px] border-r border-white/20 p-4 text-white transition-transform duration-200 md:relative md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="mb-8 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">AariyaIQ Super Admin</span>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <Link
                            href="/super-admin/dashboard"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/super-admin/dashboard" ? "bg-white/20 text-white" : "hover:bg-white/10"
                            }`}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/super-admin/dashboard/courses"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/super-admin/dashboard/courses")
                                    ? "bg-indigo-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Manage Courses
                        </Link>
                        <Link
                            href="/super-admin/dashboard/users"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/super-admin/dashboard/users")
                                    ? "bg-indigo-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Manage Learners
                        </Link>
                        <Link
                            href="/super-admin/dashboard/instructors"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/super-admin/dashboard/instructors")
                                    ? "bg-indigo-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Instructors
                        </Link>
                        <Link
                            href="/super-admin/dashboard/approvals"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/super-admin/dashboard/approvals")
                                    ? "bg-indigo-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Approvals
                        </Link>
                        <Link
                            href="/super-admin/dashboard/settings"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/super-admin/dashboard/settings"
                                    ? "bg-white/20 text-white"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            System Settings
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
