"use client";

import { submitApplication } from "@/app/actions/checkout-action";
import { isPromoCodeValid } from "@/app/actions/promo-codes-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
    AlertCircle,
    BookOpen,
    CheckCircle,
    Code,
    GraduationCap,
    Heart,
    Loader2,
    Percent,
    Target,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function CheckoutFormClient({ courseData }: { courseData: any }) {
    const router = useRouter();
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();

    const [supabase] = useState(() => createClient());
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isError, setIsError] = useState(false);
    const [isCodeApplied, setIsCodeApplied] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [promoCode, setPromoCode] = useState("");

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            if (isCodeApplied && promoCode.trim().length > 0) {
                formData.set("promo_code", promoCode);
            }

            const result = await submitApplication(formData);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Application submitted successfully!",
                });
                setIsSuccess(true);
            }
        });
    };

    const handleApplyPromo = async () => {
        try {
            const code = promoCode.trim();

            if (code.length === 0) {
                toast({
                    title: "Error",
                    description: "Please enter a valid code",
                    variant: "destructive",
                });
                return;
            }

            const res = await isPromoCodeValid(code);

            if (res) {
                toast({
                    title: "Success",
                    description: "Promo code applied successfully!",
                });
                setIsCodeApplied(true);
            } else {
                toast({
                    title: "Error",
                    description: "Invalid promo code",
                    variant: "destructive",
                });
                setPromoCode("");
                setIsCodeApplied(false);
            }
        } catch (error) {
            logger.error("Error applying code:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                    setIsError(true);
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
                setIsError(true);
            }
        };

        fetchUser();
    }, []);

    if (isError || !user) {
        logger.error("Error fetching user data:", isError);

        return (
            <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl mx-auto">
                <CardContent className="p-12 text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            Error
                        </h1>
                        <p className="text-gray-300 text-lg mb-6">
                            An error occurred while processing your application. Please try again later.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl mx-auto">
                <CardContent className="p-12 text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            Application Submitted Successfully!
                        </h1>
                        <p className="text-gray-300 text-lg mb-6">
                            Thank you for your detailed application. Our team will review your submission and get back
                            to you within 24-48 hours.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-3">What happens next?</h3>
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-gray-300">Our admissions team reviews your application</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-gray-300">You'll receive an email with next steps</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-gray-300">Course access will be granted upon approval</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <Button
                            onClick={() => (window.location.href = "/courses")}
                            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8 py-3"
                        >
                            Browse More Courses
                        </Button>

                        <Button variant={"outline"} onClick={() => (window.location.href = "/approval-flows")}>
                            Next Steps
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                    Course Application
                </CardTitle>
                <p className="text-gray-400">
                    Help us understand your learning journey and customize the course experience for you.
                </p>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-8">
                    <input type="hidden" name="learner_id" value={user?.id} />
                    <input type="hidden" name="course_id" value={courseData.id} />

                    {/* Personal Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="full_name" className="text-gray-300">
                                    Full Name *
                                </Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    required
                                    className="mt-1"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email_address" className="text-gray-300">
                                    Email Address *
                                </Label>
                                <Input
                                    id="email_address"
                                    name="email_address"
                                    required
                                    type="email"
                                    className="mt-1"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone_number" className="text-gray-300">
                                    Phone Number *
                                </Label>
                                <Input
                                    id="phone_number"
                                    name="phone_number"
                                    required
                                    className="mt-1"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <Label htmlFor="current_profession" className="text-gray-300">
                                    Current Profession
                                </Label>
                                <Select name="current_profession" required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select your profession" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="developer">Software Developer</SelectItem>
                                        <SelectItem value="designer">Designer</SelectItem>
                                        <SelectItem value="manager">Project Manager</SelectItem>
                                        <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                                        <SelectItem value="freelancer">Freelancer</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="years_experience" className="text-gray-300">
                                Programming Experience
                            </Label>
                            <Select name="years_experience" required>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                    <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Course Motivation */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-semibold text-white">Course Motivation</h3>
                        </div>
                        <div>
                            <Label htmlFor="course_motivation" className="text-gray-300">
                                Why do you want to take this course? *
                            </Label>
                            <Textarea
                                id="course_motivation"
                                name="course_motivation"
                                required
                                className="mt-1 min-h-[100px]"
                                placeholder="Tell us what motivated you to choose this course and how it aligns with your career goals..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="learning_goals" className="text-gray-300">
                                What are your specific learning goals? *
                            </Label>
                            <Textarea
                                id="learning_goals"
                                name="learning_goals"
                                required
                                className="mt-1 min-h-[100px]"
                                placeholder="Describe what you want to achieve by the end of this course..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="course_expectations" className="text-gray-300">
                                What do you expect from this course? *
                            </Label>
                            <Textarea
                                id="course_expectations"
                                name="course_expectations"
                                required
                                className="mt-1 min-h-[100px]"
                                placeholder="Share your expectations about the course content, teaching style, and outcomes..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferred_timeline" className="text-gray-300">
                                What's your preferred learning timeline?
                            </Label>
                            <Select name="preferred_timeline" required>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select your preferred timeline" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="intensive 6-8 weeks">
                                        Intensive (Complete in 6-8 weeks)
                                    </SelectItem>
                                    <SelectItem value="standard 10-12 weeks">
                                        Standard (Complete in 10-12 weeks)
                                    </SelectItem>
                                    <SelectItem value="flexible complete at own pace">
                                        Flexible (Complete at my own pace)
                                    </SelectItem>
                                    <SelectItem value="part-time 16-20 weeks">
                                        Part-time (Complete in 16-20 weeks)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Background & Context */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Code className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-xl font-semibold text-white">Technical Background</h3>
                        </div>
                        <div>
                            <Label htmlFor="current_technical_skills" className="text-gray-300">
                                What are your current technical skills?
                            </Label>
                            <Textarea
                                id="current_technical_skills"
                                name="current_technical_skills"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="List your current programming languages, frameworks, tools, etc..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="current_challenges" className="text-gray-300">
                                What challenges are you currently facing?
                            </Label>
                            <Textarea
                                id="current_challenges"
                                name="current_challenges"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="Describe any technical or career challenges you're hoping this course will help you overcome..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="specific_projects" className="text-gray-300">
                                Do you have any specific projects in mind?
                            </Label>
                            <Textarea
                                id="specific_projects"
                                name="specific_projects"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="Tell us about any projects you're planning to work on using the skills from this course..."
                            />
                        </div>
                    </div>

                    {/* Learning Preferences */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-semibold text-white">Learning Preferences</h3>
                        </div>
                        <div>
                            <Label htmlFor="preferred_learning_style" className="text-gray-300">
                                What's your preferred learning style?
                            </Label>
                            <Select name="preferred_learning_style" required>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select your learning style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="visual">Visual (diagrams, videos, demonstrations)</SelectItem>
                                    <SelectItem value="hands-on">Hands-on (coding exercises, projects)</SelectItem>
                                    <SelectItem value="reading">Reading (documentation, articles)</SelectItem>
                                    <SelectItem value="interactive">Interactive (discussions, Q&A sessions)</SelectItem>
                                    <SelectItem value="mixed">Mixed approach</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="weekly_time_commitment" className="text-gray-300">
                                How much time can you dedicate per week?
                            </Label>
                            <Select name="weekly_time_commitment" required>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select your weekly availability" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5-10 hours per week">5-10 hours per week</SelectItem>
                                    <SelectItem value="10-15 hours per week">10-15 hours per week</SelectItem>
                                    <SelectItem value="15-20 hours per week">15-20 hours per week</SelectItem>
                                    <SelectItem value="20+ hours per week">20+ hours per week</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="previous_courses_details" className="text-gray-300">
                                Have you taken similar courses before?
                            </Label>
                            <Textarea
                                id="previous_courses_details"
                                name="previous_courses_details"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="Tell us about any related courses, bootcamps, or learning experiences you've had..."
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-6 h-6 text-pink-400" />
                            <h3 className="text-xl font-semibold text-white">Additional Information</h3>
                        </div>
                        <div>
                            <Label htmlFor="excited_topics" className="text-gray-300">
                                Any specific topics you're most excited about?
                            </Label>
                            <Textarea
                                id="excited_topics"
                                name="excited_topics"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="Which parts of the curriculum are you most looking forward to learning?"
                            />
                        </div>
                        <div>
                            <Label htmlFor="success_metrics" className="text-gray-300">
                                How will you measure success in this course?
                            </Label>
                            <Textarea
                                id="success_metrics"
                                name="success_metrics"
                                required
                                className="mt-1 min-h-[80px]"
                                placeholder="What would make this course a success for you? What outcomes are you hoping for?"
                            />
                        </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Percent className="w-6 h-6 text-yellow-400" />
                                <h3 className="text-xl font-semibold text-white">Promo Code</h3>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Input
                                id="promo_code"
                                name="promo_code"
                                className="flex-1 bg-gray-900/60 border-gray-700 text-white"
                                placeholder="Enter promo code (optional)"
                                autoComplete="off"
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <Button
                                type="button"
                                className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-semibold px-6 py-2"
                                onClick={handleApplyPromo}
                            >
                                Apply
                            </Button>
                        </div>

                        {isCodeApplied && <p className="text-green-400 text-sm mt-2">Promo code applied! 🎉</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-800">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting Application...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                        <p className="text-gray-400 text-sm text-center mt-4">
                            By submitting this application, you agree to our terms and conditions. We'll review your
                            application and get back to you within 24-48 hours.
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
