"use client";

import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building, Clock, Globe, Mail, MapPin, MessageSquare, Phone, Send, Shield, Sparkles } from "lucide-react";
import { useState, useTransition } from "react";
import { contactUs } from "../actions/user-actions";

export default function ContactPage() {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();
    const [formState, setFormState] = useState<any>(null);

    const handleSubmit = async (formData: FormData) => {
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
                                <form action={handleSubmit} className="space-y-6">
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

                                    <Button
                                        type="submit"
                                        disabled={isPending}
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
                            </CardContent>
                        </Card>
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

            <Footer />
        </div>
    );
}
