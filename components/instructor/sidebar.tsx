"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { BookOpen, HelpCircle, Home, LogOut, Menu, User, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function InstructorSidebar() {
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

    const handleLinkClick = () => {
        if (isOpen) setIsOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className={`absolute left-4 top-4 z-50 md:hidden ${isOpen ? "bg-black" : "bg-white/10"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-indigo-900/90 via-purple-800/90 to-cyan-800/90 backdrop-blur-lg border-r border-white/10 p-4 text-white transition-transform duration-200 md:relative md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="max-md:mt-10 mb-8 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">AariyaIQ Instructor</span>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <Link
                            href="/instructor/dashboard"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/instructor/dashboard" ? "bg-white/20 text-white" : "hover:bg-white/10"
                            }`}
                            onClick={handleLinkClick}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/instructor/dashboard/courses"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/instructor/dashboard/courses")
                                    ? "bg-purple-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                            onClick={handleLinkClick}
                        >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Courses
                        </Link>
                        <Link
                            href="/instructor/dashboard/learners"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname.startsWith("/instructor/dashboard/learners")
                                    ? "bg-purple-600/50 text-white font-bold"
                                    : "hover:bg-white/10"
                            }`}
                            onClick={handleLinkClick}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Learners
                        </Link>
                        <Link
                            href="/instructor/dashboard/profile"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/instructor/dashboard/profile"
                                    ? "bg-white/20 text-white"
                                    : "hover:bg-white/10"
                            }`}
                            onClick={handleLinkClick}
                        >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            href="/instructor/dashboard/help"
                            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                pathname === "/instructor/dashboard/help"
                                    ? "bg-white/20 text-white"
                                    : "hover:bg-white/10"
                            }`}
                            onClick={handleLinkClick}
                        >
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Help
                        </Link>

                        <Button
                            variant="ghost"
                            className="w-full justify-start items-center px-3 py-2 text-white hover:bg-white/10"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </div>
        </>
    );
}
