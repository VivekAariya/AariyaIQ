"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Star } from "lucide-react";
import { useState, useTransition } from "react";

export default function LearnerHelpPage() {
    const [isPending, startTransition] = useTransition();
    const [contactState, setContactState] = useState<any>(null);
    const [feedbackState, setFeedbackState] = useState<any>(null);
    const [rating, setRating] = useState(0);

    const handleContactSubmit = async (formData: FormData) => {
        startTransition(async () => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setContactState({
                success: true,
                message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
            });
        });
    };

    const handleFeedbackSubmit = async (formData: FormData) => {
        startTransition(async () => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFeedbackState({
                success: true,
                message: "Thank you for your feedback! Your input helps us improve the learning experience.",
            });
        });
    };

    const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-white">Get assistance with your learning journey or share your feedback</p>
            </div>

            <Tabs defaultValue="contact" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Contact Support</TabsTrigger>
                    <TabsTrigger value="feedback">Share Feedback</TabsTrigger>
                </TabsList>

                <TabsContent value="contact" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Support
                            </CardTitle>
                            <CardDescription>
                                Need help with your courses, account, or have technical issues? Send us a message and
                                we'll assist you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={handleContactSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact-name">Full Name *</Label>
                                        <Input
                                            id="contact-name"
                                            name="name"
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-email">Email Address *</Label>
                                        <Input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact-subject">Subject *</Label>
                                        <Input
                                            id="contact-subject"
                                            name="subject"
                                            required
                                            placeholder="Brief description of your issue"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-category">Category</Label>
                                        <Select name="category">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="course-access">Course Access</SelectItem>
                                                <SelectItem value="technical-issue">Technical Issue</SelectItem>
                                                <SelectItem value="account-help">Account Help</SelectItem>
                                                <SelectItem value="payment-billing">Payment & Billing</SelectItem>
                                                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact-priority">Priority Level</Label>
                                    <Select name="priority">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - General question</SelectItem>
                                            <SelectItem value="medium">Medium - Need assistance</SelectItem>
                                            <SelectItem value="high">High - Urgent issue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="contact-message">Message *</Label>
                                    <Textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        placeholder="Please describe your issue or question in detail..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? "Sending..." : "Send Message"}
                                </Button>

                                {contactState && (
                                    <div
                                        className={`p-4 rounded-md ${contactState.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                                    >
                                        {contactState.message}
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Share Your Feedback
                            </CardTitle>
                            <CardDescription>
                                Help us improve your learning experience by sharing your thoughts and suggestions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={handleFeedbackSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="feedback-name">Name (Optional)</Label>
                                        <Input id="feedback-name" name="name" placeholder="Enter your name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="feedback-email">Email (Optional)</Label>
                                        <Input
                                            id="feedback-email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="feedback-category">Feedback Category</Label>
                                    <Select name="category">
                                        <SelectTrigger>
                                            <SelectValue placeholder="What would you like to give feedback about?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="course-content">Course Content</SelectItem>
                                            <SelectItem value="platform-usability">Platform Usability</SelectItem>
                                            <SelectItem value="instructor-quality">Instructor Quality</SelectItem>
                                            <SelectItem value="technical-performance">Technical Performance</SelectItem>
                                            <SelectItem value="feature-request">Feature Request</SelectItem>
                                            <SelectItem value="general-experience">General Experience</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Overall Rating</Label>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <StarRating rating={rating} setRating={setRating} />
                                        <span className="text-sm text-white">
                                            {rating > 0 && `${rating} out of 5 stars`}
                                        </span>
                                    </div>
                                    <input type="hidden" name="rating" value={rating} />
                                </div>

                                <div>
                                    <Label htmlFor="feedback-message">Your Feedback *</Label>
                                    <Textarea
                                        id="feedback-message"
                                        name="feedback"
                                        required
                                        placeholder="Share your thoughts, suggestions, or experiences..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="anonymous" name="anonymous" className="rounded" />
                                    <Label htmlFor="anonymous" className="text-sm">
                                        Submit anonymously (your contact details won't be shared)
                                    </Label>
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? "Submitting..." : "Submit Feedback"}
                                </Button>

                                {feedbackState && (
                                    <div
                                        className={`p-4 rounded-md ${feedbackState.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                                    >
                                        {feedbackState.message}
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Quick Help Section */}
            {/*  <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Quick Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Frequently Asked Questions</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Q: How do I access my enrolled courses?</strong>
                  <p className="text-white">Go to Dashboard → My Courses to view all your enrolled courses.</p>
                </div>
                <div>
                  <strong>Q: I forgot my password. How can I reset it?</strong>
                  <p className="text-white">
                    Use the "Forgot Password" link on the login page to reset your password.
                  </p>
                </div>
                <div>
                  <strong>Q: How do I update my profile information?</strong>
                  <p className="text-white">Navigate to Dashboard → Profile to update your personal information.</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@aariyatech.co.uk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+44 (0) 20 1234 5678</span>
                </div>
                <div className="mt-3">
                  <Badge variant="outline">Response Time: Within 24 hours</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>*/}
        </div>
    );
}
