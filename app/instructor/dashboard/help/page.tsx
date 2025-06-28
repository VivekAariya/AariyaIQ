"use client";

import { feedback, support } from "@/app/actions/instructor-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function AdminHelpPage() {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();

    const [supabase] = useState(() => createClient());
    const [user, setUser] = useState<User | null>(null);

    const handleContactSubmit = async (formData: FormData) => {
        startTransition(async () => {
            formData.set("id", user?.id || "");

            const result = await support(formData);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Message sent successfully!",
                });
            }
        });
    };

    const handleFeedbackSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await feedback(formData);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Message sent successfully!",
                });
            }
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-white">Get assistance or share your feedback to help us improve</p>
            </div>

            <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact Support
                    </TabsTrigger>
                    <TabsTrigger value="feedback" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Send Feedback
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="contact" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-blue-600" />
                                Contact Support
                            </CardTitle>
                            <CardDescription>
                                Need help? Send us a message and we'll respond within 24 hours. Or you can also email us
                                at hello@aariyatech.co.uk
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={handleContactSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-name">Full Name</Label>
                                        <Input
                                            id="contact-name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-email">Email Address</Label>
                                        <Input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact-subject">Subject</Label>
                                    <Input
                                        id="contact-subject"
                                        name="subject"
                                        placeholder="Brief description of your inquiry"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact-priority">Priority Level</Label>
                                    <select
                                        id="contact-priority"
                                        name="priority"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                    >
                                        <option value="low" className="bg-transparent text-black">
                                            Low - General inquiry
                                        </option>
                                        <option value="medium" className="bg-transparent text-black">
                                            Medium - Need assistance
                                        </option>
                                        <option value="high" className="bg-transparent text-black">
                                            High - Urgent issue
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact-message">Message</Label>
                                    <Textarea
                                        id="contact-message"
                                        name="message"
                                        placeholder="Describe your issue or question in detail..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="feedback" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-purple-600" />
                                Send Feedback
                            </CardTitle>
                            <CardDescription>
                                Help us improve by sharing your thoughts, suggestions, and ideas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={handleFeedbackSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="feedback-name">Your Name</Label>
                                        <Input
                                            id="feedback-name"
                                            name="name"
                                            placeholder="Enter your name (optional)"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="feedback-email">Email Address</Label>
                                        <Input
                                            id="feedback-email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email (optional)"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="feedback-category">Feedback Category</Label>
                                    <select
                                        id="feedback-category"
                                        name="category"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
                                    >
                                        <option value="feature" className="bg-transparent text-black">
                                            Feature Request
                                        </option>
                                        <option value="improvement" className="bg-transparent text-black">
                                            Improvement Suggestion
                                        </option>
                                        <option value="bug" className="bg-transparent text-black">
                                            Bug Report
                                        </option>
                                        <option value="ui" className="bg-transparent text-black">
                                            User Interface
                                        </option>
                                        <option value="performance" className="bg-transparent text-black">
                                            Performance
                                        </option>
                                        <option value="other" className="bg-transparent text-black">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="feedback-rating">Overall Experience</Label>
                                    <select
                                        id="feedback-rating"
                                        name="rating"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
                                    >
                                        <option value="" disabled selected>
                                            Select a rating
                                        </option>
                                        <option className="text-black" value="1">
                                            1 - Poor
                                        </option>
                                        <option className="text-black" value="2">
                                            2
                                        </option>
                                        <option className="text-black" value="3">
                                            3
                                        </option>
                                        <option className="text-black" value="4">
                                            4
                                        </option>
                                        <option className="text-black" value="5">
                                            5 - Excellent
                                        </option>
                                    </select>
                                    <p className="text-sm text-gray-500">1 = Poor, 5 = Excellent</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="feedback-message">Your Feedback</Label>
                                    <Textarea
                                        id="feedback-message"
                                        name="feedback"
                                        placeholder="Share your thoughts, suggestions, or report issues..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            Submit Feedback
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
