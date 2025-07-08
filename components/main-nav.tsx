"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MainNav() {
    const lastScrollY = useRef(0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);

    const fetchUserData = async () => {
        try {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            // logger.log("User data:", data);

            if (error || !data) {
                // logger.error("Error fetching user data:", error);
                return null;
            }

            setUserData(data?.user);
        } catch (error) {
            logger.error("Unexpected error fetching user data:", error);
            return null;
        }
    };

    useEffect(() => {
        // Add padding to body to account for fixed header
        document.body.style.paddingTop = isScrolled ? "56px" : "64px";

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction
            if (currentScrollY < lastScrollY.current) {
                setIsScrollingUp(true);
            } else {
                setIsScrollingUp(false);
            }

            // Update last scroll position
            lastScrollY.current = currentScrollY;

            // Determine if scrolled past threshold
            if (currentScrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Prevent background scroll when mobile menu is open
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.paddingTop = "0";
            document.body.style.overflow = "";
        };
    }, [isScrolled, isMenuOpen]);

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-lg supports-[backdrop-filter]:bg-black/90 transition-all duration-300 ${
                isScrollingUp && isScrolled ? "transform scale-[1.02] shadow-lg" : ""
            }`}
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                transformOrigin: "top center",
            }}
        >
            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close mobile menu overlay"
                />
            )}
            <div
                className={`container flex items-center justify-between transition-all duration-300 px-2 sm:px-4 ${
                    isScrolled ? "h-14" : "h-16"
                }`}
            >
                <div className="flex gap-4 md:gap-10 items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span
                            className={`bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text font-bold text-transparent transition-all duration-300 ${
                                isScrolled ? "text-lg" : "text-xl"
                            }`}
                        >
                            AariyaIQ
                        </span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link href="/" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
                        >
                            About
                        </Link>
                    </nav>
                </div>

                <div className="hidden gap-4 md:block">
                    {userData ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src={userData?.user_metadata?.profile_image} />
                                        <AvatarFallback>
                                            {userData.user_metadata?.first_name
                                                ? userData.user_metadata.first_name.charAt(0).toUpperCase()
                                                : userData.email?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/${userData?.user_metadata?.role || "learner"}/dashboard`}>
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={async () => {
                                        const supabase = createClient();
                                        await supabase.auth.signOut();
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:flex md:items-center md:gap-4">
                            <Link href="/learner/login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 min-w-[44px] min-h-[44px] px-3"
                                >
                                    Learner Login
                                </Button>
                            </Link>
                            <Link href="/instructor/login">
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white backdrop-blur-md bg-opacity-80 min-w-[44px] min-h-[44px] px-3"
                                >
                                    Instructor Login
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    className="block md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full z-50 md:hidden flex flex-col bg-black backdrop-blur-lg border-b border-gray-800 animate-fade-in">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                        <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text font-bold text-xl text-transparent">
                            AariyaIQ
                        </span>
                        <button
                            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={28} className="text-white" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4 px-6 py-6 flex-1 bg-black">
                        <Link
                            href="/"
                            className="flex items-center text-base font-medium text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="flex items-center text-base font-medium text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Courses
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-base font-medium text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        <div className="mt-4">
                            {userData ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={userData?.user_metadata?.profile_image} />
                                                <AvatarFallback>
                                                    {userData.user_metadata?.first_name
                                                        ? userData.user_metadata.first_name.charAt(0).toUpperCase()
                                                        : userData.email?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-gray-200 font-medium">
                                                {userData.user_metadata?.first_name || userData.email}
                                            </span>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/${userData?.user_metadata?.role || "learner"}/dashboard`}>
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={async () => {
                                                const supabase = createClient();
                                                await supabase.auth.signOut();
                                                window.location.reload();
                                            }}
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2">
                                    <Link href="/learner/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button
                                            variant="outline"
                                            className="w-full border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 min-h-[44px]"
                                        >
                                            Learner Login
                                        </Button>
                                    </Link>
                                    <Link href="/instructor/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white bg-opacity-80 backdrop-blur-md min-h-[44px]">
                                            Instructor Login
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
