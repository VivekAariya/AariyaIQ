"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, Facebook, Instagram, Linkedin, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
    courseId: string;
    courseTitle: string;
}

export function ShareButton({ courseId, courseTitle }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Reset copied state after 2 seconds
    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopyLink = () => {
        // Create the full URL for the course
        const url = `${window.location.origin}/courses/${courseId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
    };

    const handleShare = (platform: string) => {
        const url = `${window.location.origin}/courses/${courseId}`;
        const text = `Check out this course: ${courseTitle}`;

        let shareUrl = "";

        switch (platform) {
            case "linkedin":
                shareUrl = "/";
                break;
            case "facebook":
                shareUrl = "/";
                break;
            case "x":
                shareUrl = "/";
                break;
            case "whatsapp":
                shareUrl = "/";
                break;
            case "instagram":
                // Instagram doesn't have a direct share URL, but we can copy the link
                handleCopyLink();
                alert(
                    "Link copied! Instagram doesn't support direct sharing, but you can paste the link in your Instagram post or story."
                );
                return;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    "rounded-full w-9 h-9 absolute top-3 right-1 bg-black/80 backdrop-blur-sm border-white/20 z-10 transition-all duration-300 shadow-lg hover:bg-black/95",
                    isAnimating && "animate-pulse",
                    isOpen && "bg-white/20"
                )}
                onClick={toggleMenu}
            >
                <Share2
                    className={cn(
                        "h-4 w-4 text-white transition-transform duration-300 animate-bounce-subtle",
                        isOpen && "rotate-45"
                    )}
                />
            </Button>

            {isOpen && (
                <div className="absolute top-14 right-3 bg-black/90 backdrop-blur-md rounded-lg p-3 z-20 border border-white/20 shadow-xl animate-in fade-in slide-in-from-top-5 duration-300">
                    <div className="flex flex-col space-y-2">
                        <div className="text-xs text-gray-400 mb-1">Share this course:</div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-start space-x-2 h-8 bg-black/50 hover:bg-white/10"
                            onClick={handleCopyLink}
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                                <Copy className="h-3.5 w-3.5" />
                            )}
                            <span className="text-xs">{copied ? "Copied!" : "Copy link"}</span>
                        </Button>

                        <div className="flex space-x-2 pt-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border-[#0077B5]/50"
                                onClick={() => handleShare("linkedin")}
                                title="Share on LinkedIn"
                            >
                                <Linkedin className="h-4 w-4 text-[#0077B5]" />
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 bg-[#E4405F]/20 hover:bg-[#E4405F]/30 border-[#E4405F]/50"
                                onClick={() => handleShare("instagram")}
                                title="Share on Instagram"
                            >
                                <Instagram className="h-4 w-4 text-[#E4405F]" />
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border-[#1877F2]/50"
                                onClick={() => handleShare("facebook")}
                                title="Share on Facebook"
                            >
                                <Facebook className="h-4 w-4 text-[#1877F2]" />
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 bg-[#000000]/20 hover:bg-[#000000]/30 border-[#000000]/50"
                                onClick={() => handleShare("x")}
                                title="Share on X"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-white"
                                >
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 bg-[#25D366]/20 hover:bg-[#25D366]/30 border-[#25D366]/50"
                                onClick={() => handleShare("whatsapp")}
                                title="Share on WhatsApp"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-[#25D366]"
                                >
                                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
