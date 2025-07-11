"use client";

import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    Building,
    Clock,
    Globe,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Shield,
    Sparkles,
    RefreshCw,
} from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { contactUs } from "../actions/user-actions";
import { FloatingAIBtn } from "@/components/floating-ai-btn";

// Simple math CAPTCHA generator
const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer: number;
    let question: string;

    switch (operation) {
        case "+":
            answer = num1 + num2;
            question = `${num1} + ${num2}`;
            break;
        case "-":
            // Ensure positive result
            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);
            answer = larger - smaller;
            question = `${larger} - ${smaller}`;
            break;
        case "*":
            // Keep numbers small for multiplication
            const smallNum1 = Math.floor(Math.random() * 5) + 1;
            const smallNum2 = Math.floor(Math.random() * 5) + 1;
            answer = smallNum1 * smallNum2;
            question = `${smallNum1} × ${smallNum2}`;
            break;
        default:
            answer = num1 + num2;
            question = `${num1} + ${num2}`;
    }

    return { question, answer };
};

export default function ContactPage() {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();
    const [formState, setFormState] = useState<any>(null);
    const [captcha, setCaptcha] = useState(() => generateMathCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");
    const [attemptCount, setAttemptCount] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockEndTime, setBlockEndTime] = useState<number | null>(null);

    // Honeypot field (hidden field to catch bots)
    const [honeypot, setHoneypot] = useState("");

    // Rate limiting with sessionStorage (persists during browser session)
    const [formSubmissions, setFormSubmissions] = useState<number[]>([]);

    useEffect(() => {
        // Load persisted data on component mount
        const loadPersistedData = () => {
            try {
                // Load submission history
                const savedSubmissions = sessionStorage.getItem("contact_form_submissions");
                if (savedSubmissions) {
                    const submissions = JSON.parse(savedSubmissions);
                    setFormSubmissions(submissions);
                }

                // Load block status
                const savedBlockEnd = sessionStorage.getItem("contact_form_block_end");
                const savedAttempts = sessionStorage.getItem("contact_form_attempts");

                if (savedBlockEnd) {
                    const blockEnd = parseInt(savedBlockEnd);
                    if (Date.now() < blockEnd) {
                        setBlockEndTime(blockEnd);
                        setIsBlocked(true);
                    } else {
                        // Block expired, clean up
                        sessionStorage.removeItem("contact_form_block_end");
                        sessionStorage.removeItem("contact_form_attempts");
                    }
                }

                if (savedAttempts && !isBlocked) {
                    setAttemptCount(parseInt(savedAttempts));
                }
            } catch (error) {
                console.error("Error loading persisted form data:", error);
            }
        };

        loadPersistedData();
    }, []);

    useEffect(() => {
        // Check if user is currently blocked and set up unblock timer
        if (blockEndTime && Date.now() < blockEndTime) {
            setIsBlocked(true);
            // Set up timer to unblock
            const timeout = setTimeout(() => {
                setIsBlocked(false);
                setBlockEndTime(null);
                setAttemptCount(0);
                // Clean up sessionStorage
                sessionStorage.removeItem("contact_form_block_end");
                sessionStorage.removeItem("contact_form_attempts");
            }, blockEndTime - Date.now());

            return () => clearTimeout(timeout);
        } else if (blockEndTime) {
            setIsBlocked(false);
            setBlockEndTime(null);
            setAttemptCount(0);
        }
    }, [blockEndTime]);

    const refreshCaptcha = () => {
        setCaptcha(generateMathCaptcha());
        setCaptchaInput("");
    };

    const checkRateLimit = () => {
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const recentSubmissions = formSubmissions.filter((time) => now - time < oneHour);

        // Allow max 3 submissions per hour
        if (recentSubmissions.length >= 3) {
            return false;
        }

        const updatedSubmissions = [...recentSubmissions, now];
        setFormSubmissions(updatedSubmissions);

        // Persist to sessionStorage
        try {
            sessionStorage.setItem("contact_form_submissions", JSON.stringify(updatedSubmissions));
        } catch (error) {
            console.error("Error saving submission history:", error);
        }

        return true;
    };

    const handleSubmit = async (formData: FormData) => {
        // Check if user is blocked
        if (isBlocked) {
            toast({
                title: "Temporarily Blocked",
                description: "Please wait before trying again.",
                variant: "destructive",
            });
            return;
        }

        // Check honeypot (if filled, it's likely a bot)
        if (honeypot) {
            console.log("Bot detected via honeypot");
            return;
        }

        // Validate CAPTCHA
        const userAnswer = parseInt(captchaInput);
        if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
            const newAttemptCount = attemptCount + 1;
            setAttemptCount(newAttemptCount);

            // Persist attempt count
            try {
                sessionStorage.setItem("contact_form_attempts", newAttemptCount.toString());
            } catch (error) {
                console.error("Error saving attempt count:", error);
            }

            // Block user after 3 failed attempts
            if (newAttemptCount >= 3) {
                const blockDuration = 15 * 60 * 1000; // 15 minutes
                const blockEnd = Date.now() + blockDuration;
                setBlockEndTime(blockEnd);
                setIsBlocked(true);

                // Persist block status
                try {
                    sessionStorage.setItem("contact_form_block_end", blockEnd.toString());
                } catch (error) {
                    console.error("Error saving block status:", error);
                }

                toast({
                    title: "Too Many Failed Attempts",
                    description: "You've been temporarily blocked for 15 minutes.",
                    variant: "destructive",
                });
                return;
            }

            refreshCaptcha();
            toast({
                title: "Incorrect Answer",
                description: `Please solve the math problem correctly. ${3 - newAttemptCount} attempts remaining.`,
                variant: "destructive",
            });
            return;
        }

        // Check rate limiting
        if (!checkRateLimit()) {
            toast({
                title: "Rate Limit Exceeded",
                description: "You can only submit 3 messages per hour. Please try again later.",
                variant: "destructive",
            });
            return;
        }

        startTransition(async () => {
            const result = await contactUs(formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
                setFormState({ success: false, message: result?.message || "An unexpected error occurred" });
            } else {
                toast({
                    title: "Success",
                    description:
                        result?.message || "Thank you for your message! We'll get back to you within 24 hours.",
                });
                setFormState({
                    success: true,
                    message: result?.message || "Thank you for your message! We'll get back to you within 24 hours.",
                });

                // Reset form and captcha on success
                setCaptchaInput("");
                refreshCaptcha();
                setAttemptCount(0);

                // Clean up sessionStorage on successful submission
                try {
                    sessionStorage.removeItem("contact_form_attempts");
                } catch (error) {
                    console.error("Error cleaning up session data:", error);
                }

                // Reset form fields
                const form = document.querySelector("form") as HTMLFormElement;
                if (form) form.reset();
            }
        });
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Phone",
            value: "+44 7384025531",
            description: "Mon-Fri, 9AM-6PM GMT",
            href: "tel:+447384025531",
        },
        {
            icon: Mail,
            title: "Email",
            value: "admin@aariyatech.co.uk",
            description: "We'll respond within 24 hours",
            href: "mailto:admin@aariyatech.co.uk",
        },
        {
            icon: Mail,
            title: "General Inquiries",
            value: "hello@aariyatech.co.uk",
            description: "For general questions",
            href: "mailto:hello@aariyatech.co.uk",
        },
        {
            icon: Globe,
            title: "Website",
            value: "aariyatech.co.uk",
            description: "Visit our main website",
            href: "https://aariyatech.co.uk",
        },
    ];

    const officeInfo = [
        {
            icon: Building,
            title: "Registered Address",
            value: "Barts House, Black Lion St, Brighton and Hove, Brighton – BN1 1JE, UK",
        },
        {
            icon: Shield,
            title: "ICO Registration",
            value: "ZB881395",
        },
        {
            icon: Clock,
            title: "Business Hours",
            value: "Monday - Friday: 9:00 AM - 6:00 PM GMT",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <MainNav />

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-cyan-300">Get in Touch</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Contact Us
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Have questions about our courses, need technical support, or want to discuss partnership
                        opportunities? We're here to help you on your learning journey.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <MessageSquare className="h-6 w-6 text-cyan-400" />
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Send us a Message
                                    </span>
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isBlocked ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                                            <Shield className="h-4 w-4 text-red-400" />
                                            <span className="text-sm text-red-400">Temporarily Blocked</span>
                                        </div>
                                        <p className="text-red-400 font-semibold mb-2">Access Temporarily Restricted</p>
                                        <p className="text-gray-400 text-sm">
                                            Due to multiple failed verification attempts, form submission has been
                                            temporarily disabled. Please try again in 15 minutes.
                                        </p>
                                    </div>
                                ) : (
                                    <form action={handleSubmit} className="space-y-6">
                                        {/* Honeypot field - hidden from users */}
                                        <div className="hidden">
                                            <label htmlFor="website">Website</label>
                                            <input
                                                id="website"
                                                name="website"
                                                type="text"
                                                value={honeypot}
                                                onChange={(e) => setHoneypot(e.target.value)}
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName" className="text-gray-300">
                                                    First Name *
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    placeholder="Enter your first name"
                                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName" className="text-gray-300">
                                                    Last Name *
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    placeholder="Enter your last name"
                                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="email" className="text-gray-300">
                                                    Email Address *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="your.email@example.com"
                                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="text-gray-300">
                                                    Phone Number *
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    placeholder="+44 7XXX XXXXXX"
                                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="subject" className="text-gray-300">
                                                    Subject *
                                                </Label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    placeholder="Brief description of your inquiry"
                                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="message" className="text-gray-300">
                                                Message *
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                placeholder="Please provide details about your inquiry..."
                                                className="min-h-[120px] bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                            />
                                        </div>

                                        {/* Human Verification */}
                                        <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Shield className="h-4 w-4 text-cyan-400" />
                                                <Label className="text-gray-300 font-medium">
                                                    Human Verification *
                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-mono text-lg bg-slate-600/50 px-3 py-2 rounded border">
                                                        {captcha.question} = ?
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={refreshCaptcha}
                                                        className="bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-600/50"
                                                    >
                                                        <RefreshCw className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Input
                                                    type="number"
                                                    value={captchaInput}
                                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                                    placeholder="Answer"
                                                    className="w-20 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                                                    required
                                                />
                                            </div>
                                            <p className="text-gray-400 text-xs mt-2">
                                                Please solve the math problem to verify you're human.
                                                {attemptCount > 0 && (
                                                    <span className="text-yellow-400 ml-1">
                                                        ({3 - attemptCount} attempts remaining)
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isPending || isBlocked}
                                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isPending ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending Message...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Send className="h-4 w-4" />
                                                    Send Message
                                                </div>
                                            )}
                                        </Button>

                                        {formState && (
                                            <div
                                                className={`p-4 rounded-lg ${
                                                    formState.success
                                                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                                                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {formState.message}
                                            </div>
                                        )}
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Additional Information */}
                        <div className="mt-16 text-center">
                            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 max-w-4xl mx-auto">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold mb-4">
                                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                            AariyaTech UK
                                        </span>
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6 text-left">
                                        <div>
                                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-cyan-400" />
                                                Registered Address
                                            </h4>
                                            <p className="text-gray-300 text-sm">
                                                Barts House, Black Lion St
                                                <br />
                                                Brighton and Hove
                                                <br />
                                                Brighton – BN1 1JE
                                                <br />
                                                United Kingdom
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-cyan-400" />
                                                Legal Information
                                            </h4>
                                            <p className="text-gray-300 text-sm">
                                                ICO Registration: ZB881395
                                                <br />
                                                Registered in England & Wales
                                                <br />
                                                Data Protection Compliant
                                                <br />
                                                GDPR Compliant
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Methods */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-cyan-400" />
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Get in Touch
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {contactMethods.map((method, index) => (
                                    <a
                                        key={index}
                                        href={method.href}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 group"
                                    >
                                        <method.icon className="h-5 w-5 text-cyan-400 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <p className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                                {method.title}
                                            </p>
                                            <p className="text-cyan-300 text-sm font-mono">{method.value}</p>
                                            <p className="text-gray-400 text-xs">{method.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Office Information */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-cyan-400" />
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Office Information
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {officeInfo.map((info, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
                                        <info.icon className="h-5 w-5 text-cyan-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-white">{info.title}</p>
                                            <p className="text-gray-300 text-sm">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Response Badge */}
                        <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 backdrop-blur-sm">
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 mb-3">
                                    <Clock className="h-4 w-4 text-cyan-400" />
                                    <span className="text-cyan-300 text-sm font-medium">Quick Response</span>
                                </div>
                                <p className="text-white font-semibold mb-2">24 Hour Response Time</p>
                                <p className="text-gray-400 text-sm">
                                    We typically respond to all inquiries within 24 hours during business days.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <FloatingAIBtn delay={500} user={null} />

            <Footer />
        </div>
    );
}
