"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Mail, MessageSquare, Send } from "lucide-react";
import { useState, useTransition } from "react";

export default function AdminHelpPage() {
    const [isPending, startTransition] = useTransition();
    const [contactState, setContactState] = useState<any>(null);
    const [feedbackState, setFeedbackState] = useState<any>(null);

    const handleContactSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setContactState({
                    success: true,
                    message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
                });
            } catch (error) {
                setContactState({
                    success: false,
                    message: "Failed to send message. Please try again.",
                });
            }
        });
    };

    const handleFeedbackSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setFeedbackState({
                    success: true,
                    message: "Thank you for your feedback! Your suggestions help us improve the platform.",
                });
            } catch (error) {
                setFeedbackState({
                    success: false,
                    message: "Failed to submit feedback. Please try again.",
                });
            }
        });
    };

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
                                Need help? Send us a message and we'll respond within 24 hours.
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

                                {contactState && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-md ${
                                            contactState.success
                                                ? "bg-green-50 text-green-800 border border-green-200"
                                                : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                    >
                                        {contactState.success ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5" />
                                        )}
                                        <span>{contactState.message}</span>
                                    </div>
                                )}
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
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <label key={rating} className="flex items-center">
                                                <input type="radio" name="rating" value={rating} className="sr-only" />
                                                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50">
                                                    {rating}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
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

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="feedback-anonymous"
                                        name="anonymous"
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="feedback-anonymous" className="text-sm">
                                        Submit anonymously
                                    </Label>
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

                                {feedbackState && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-md ${
                                            feedbackState.success
                                                ? "bg-green-50 text-green-800 border border-green-200"
                                                : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                    >
                                        {feedbackState.success ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5" />
                                        )}
                                        <span>{feedbackState.message}</span>
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Quick Help Section */}
            {/* <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Help</CardTitle>
          <CardDescription>Common questions and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Frequently Asked Questions</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-sm">How do I create a new course?</p>
                  <p className="text-sm text-white">Navigate to Manage Courses and click "Add New Course"</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-sm">How do I manage student enrollments?</p>
                  <p className="text-sm text-white">Go to Manage Users to view and manage student accounts</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">hello@aariyatech.co.uk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Response Time</Badge>
                  <span className="text-sm">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
        </div>
    );
}
