"use client";

import { RegistrationStatusIndicator } from "@/components/super-admin/registration-status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { CheckCircle, Clock, DollarSign, EllipsisVertical, FileText, Search, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ApprovalsDashboard({
    initialLearnerData,
    initialInstructorData,
    initialCourseData,
}: {
    initialLearnerData: any[];
    initialInstructorData: any[];
    initialCourseData: any[];
}) {
    const { toast } = useToast();
    const router = useRouter();

    const [selectedLearner, setSelectedLearner] = useState<string | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [learnerData, setLearnerData] = useState(initialLearnerData);
    const [instructorData, setInstructorData] = useState(initialInstructorData);
    const [courseData, setCourseData] = useState(initialCourseData);
    const [isPending, startTransition] = useTransition();
    const [instructorSearch, setInstructorSearch] = useState("");
    const [learnerSearch, setLearnerSearch] = useState("");
    const [courseSearch, setCourseSearch] = useState("");

    const handleApproveLearnerInitialReview = async (id: string) => {
        startTransition(async () => {
            try {
                const res = await fetch("/api/super-admin/learner/initial-approval", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        applicationId: id,
                    }),
                });

                if (!res.ok) {
                    logger.error("API call failed", res.statusText);
                    throw new Error("API call failed");
                }

                toast({
                    title: "Initial Approval Granted",
                    description: "The applicant has been notified of their approval.",
                });
                router.refresh();
            } catch (error) {
                logger.error("API error:", error);
                toast({
                    title: "API error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }
        });
    };

    const handleLearnerPayment = async (id: string) => {
        startTransition(async () => {
            try {
                const res = await fetch("/api/super-admin/learner/complete-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        applicationId: id,
                    }),
                });

                if (!res.ok) {
                    logger.error("API call failed", res.statusText);
                    throw new Error("API call failed");
                }

                toast({
                    title: "Payment Completed",
                    description: "The applicant has been notified of their payment.",
                });
                router.refresh();
            } catch (error) {
                logger.error("API error:", error);
                toast({
                    title: "API error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }
        });
    };

    const handleLearnerFinalApproval = async (id: string) => {
        startTransition(async () => {
            try {
                const res = await fetch("/api/super-admin/learner/final-approval", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        applicationId: id,
                    }),
                });

                if (!res.ok) {
                    logger.error("API call failed", res.statusText);
                    throw new Error("API call failed");
                }

                toast({
                    title: "Final Approval Granted",
                    description: "The applicant has been notified of their approval.",
                });
                router.refresh();
            } catch (error) {
                logger.error("API error:", error);
                toast({
                    title: "API error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }
        });
    };

    const handleRejectLearnerApplication = async (id: string) => {
        startTransition(async () => {
            try {
                const res = await fetch("/api/super-admin/learner/reject", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        applicationId: id,
                    }),
                });

                if (!res.ok) {
                    logger.error("API call failed", res.statusText);
                    throw new Error("API call failed");
                }

                toast({
                    title: "Application Rejected",
                    description: "The applicant has been notified of their rejection.",
                    variant: "warn",
                });
            } catch (error) {
                logger.error("API error:", error);
                toast({
                    title: "Email Error",
                    description: "Status updated but there was an error sending the email.",
                    variant: "destructive",
                });
            }
        });
    };

    const handleApproveApplication = async (type: "learner" | "instructor" | "course", id: string) => {
        if (type === "learner") {
            const learner = learnerData.find((item) => item.id === id);
            if (learner) {
                setLearnerData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)));
                try {
                    toast({
                        title: "Final Approval Granted",
                        description: "The applicant has been notified of their approval.",
                    });
                } catch (error) {
                    logger.error("Email error:", error);
                    toast({
                        title: "Email Error",
                        description: "Status updated but there was an error sending the email.",
                        variant: "destructive",
                    });
                }
            }
        } else if (type === "instructor") {
            const instructor = instructorData.find((item) => item.id === id);
            if (instructor) {
                startTransition(async () => {
                    try {
                        const res = await fetch("/api/super-admin/approvals", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "approved",
                                instructorId: instructor.id,
                                instructorName: instructor.first_name,
                                instructorEmail: instructor.email,
                                loginLink: `${process.env.NEXT_PUBLIC_BASE_URL}/instructor/dashboard`,
                                nextSteps: [
                                    "Log in to your instructor dashboard",
                                    "Complete your instructor profile",
                                    "Prepare your course materials",
                                    "Schedule an onboarding session with our team",
                                ],
                            }),
                        });

                        if (!res.ok) {
                            logger.error("API call failed", res.statusText);
                            throw new Error("API call failed");
                        }

                        setInstructorData((prev) =>
                            prev.map((item) => (item.id === id ? { ...item, profile_status: "approved" } : item))
                        );
                        setInstructorData((instructor) => instructor.filter((item) => item.id !== id));
                        setSelectedInstructor(null);

                        toast({
                            title: "Final Approval Granted",
                            description: "The applicant has been notified of their approval.",
                        });
                    } catch (error) {
                        logger.error("API error:", error);
                        toast({
                            title: "Email Error",
                            description: "Status updated but there was an error sending the email.",
                            variant: "destructive",
                        });
                    }
                });
            }
        } else if (type === "course") {
            const course = courseData.find((item) => item.id === id);

            if (course) {
                startTransition(async () => {
                    try {
                        const res = await fetch("/api/super-admin/course", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "approved",
                                courseId: course.id,
                                courseTitle: course.course_title,
                                instructorId: course.instructor,
                            }),
                        });

                        if (!res.ok) {
                            logger.error("API call failed", res.statusText);
                            throw new Error("API call failed");
                        }

                        setCourseData((prev) =>
                            prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item))
                        );
                        setCourseData((course) => course.filter((item) => item.id !== id));
                        setSelectedCourse(null);

                        toast({
                            title: "Final Approval Granted",
                            description: "The instructor has been notified.",
                        });
                    } catch (error) {
                        logger.error("API error:", error);
                        toast({
                            title: "Something went wrong",
                            variant: "destructive",
                        });
                    }
                });
            }
        }
    };

    const handleReject = (type: "learner" | "instructor" | "course", id: string) => {
        if (type === "learner") {
            setLearnerData((prev) => prev.filter((item) => item.id !== id));
        } else if (type === "instructor") {
            const instructor = instructorData.find((item) => item.id === id);
            if (instructor) {
                startTransition(async () => {
                    try {
                        const res = await fetch("/api/super-admin/approvals", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "suspended",
                                instructorId: instructor.id,
                                instructorName: instructor.first_name,
                                instructorEmail: instructor.email,
                                loginLink: "",
                                nextSteps: [],
                            }),
                        });

                        if (!res.ok) {
                            logger.error("API call failed", res.statusText);
                            throw new Error("API call failed");
                        }

                        setInstructorData((prev) =>
                            prev.map((item) => (item.id === id ? { ...item, profile_status: "suspended" } : item))
                        );
                        setInstructorData((instructor) => instructor.filter((item) => item.id !== id));
                        setSelectedInstructor(null);

                        toast({
                            title: "Application Rejected",
                            description: "The applicant has been notified of their rejection.",
                            variant: "warn",
                        });
                    } catch (error) {
                        logger.error("API error:", error);
                        toast({
                            title: "Email Error",
                            description: "Status updated but there was an error sending the email.",
                            variant: "destructive",
                        });
                    }
                });
            }
        } else if (type === "course") {
            const course = courseData.find((item) => item.id === id);

            if (course) {
                startTransition(async () => {
                    try {
                        const res = await fetch("/api/super-admin/course", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "suspended",
                                courseId: course.id,
                                courseTitle: course.course_title,
                                instructorId: course.instructor,
                            }),
                        });

                        if (!res.ok) {
                            logger.error("API call failed", res.statusText);
                            throw new Error("API call failed");
                        }

                        setCourseData((prev) =>
                            prev.map((item) => (item.id === id ? { ...item, status: "suspended" } : item))
                        );
                        setCourseData((course) => course.filter((item) => item.id !== id));
                        setSelectedCourse(null);

                        toast({
                            title: "Course Rejected",
                            description: "The instructor has been notified of the rejection.",
                            variant: "warn",
                        });
                    } catch (error) {
                        logger.error("API error:", error);
                        toast({
                            title: "Something went wrong",
                            variant: "destructive",
                        });
                    }
                });
            }
        }
    };

    // Status
    const getLearnerStatusSteps = (status: string) => {
        const steps = [
            { id: 1, name: "Submit Application", status: "completed" },
            {
                id: 2,
                name: "Initial Review",
                status:
                    status === "in_review"
                        ? "current"
                        : ["pending_payment", "payment_completed", "approved"].includes(status)
                          ? "completed"
                          : "upcoming",
            },
            {
                id: 3,
                name: "Payment",
                status:
                    status === "pending_payment"
                        ? "current"
                        : ["payment_completed", "approved"].includes(status)
                          ? "completed"
                          : "upcoming",
            },
            {
                id: 4,
                name: "Final Approval",
                status: status === "payment_completed" ? "current" : status === "approved" ? "completed" : "upcoming",
            },
        ];
        return steps.map((step) => ({
            ...step,
            status: step.status as "completed" | "current" | "upcoming" | "error",
        }));
    };

    const getLearnerStatusBadge = (status: string) => {
        switch (status) {
            case "in_review":
                return <Badge className="bg-yellow-500">Initial Review</Badge>;
            case "pending_payment":
                return <Badge className="bg-orange-500">Pending Payment</Badge>;
            case "payment_completed":
                return <Badge className="bg-purple-500">Payment Completed</Badge>;
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    const getInstructorStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500">Initial Review</Badge>;
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    const getInstructorStatusSteps = (status: string) => {
        const steps = [
            { id: 1, name: "Submit Application", status: "completed" },
            {
                id: 2,
                name: "Final Approval",
                status: status === "approved" ? "completed" : "current",
            },
        ];

        return steps.map((step) => ({
            ...step,
            status: step.status as "completed" | "current" | "upcoming" | "error",
        }));
    };

    const getCourseStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500">Initial Review</Badge>;
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    const getCourseStatusSteps = (status: string) => {
        const steps = [
            { id: 1, name: "Submit Application", status: "completed" },
            {
                id: 2,
                name: "Final Approval",
                status: status === "approved" ? "completed" : "current",
            },
        ];

        return steps.map((step) => ({
            ...step,
            status: step.status as "completed" | "current" | "upcoming" | "error",
        }));
    };

    // Filtered instructor data based on search
    const filteredInstructorData = instructorData.filter((instructor) => {
        const search = instructorSearch.toLowerCase();
        return (
            (instructor.first_name + " " + instructor.last_name).toLowerCase().includes(search) ||
            (instructor.area_of_expertise || "").toLowerCase().includes(search) ||
            (instructor.email || "").toLowerCase().includes(search)
        );
    });

    // Filtered learner data based on search
    const filteredLearnerData = learnerData.filter((learner) => {
        const search = learnerSearch.toLowerCase();
        return (
            (learner.full_name || "").toLowerCase().includes(search) ||
            (learner.email_address || "").toLowerCase().includes(search) ||
            (learner.phone_number || "").toLowerCase().includes(search) ||
            (learner.learner_id || "").toLowerCase().includes(search)
        );
    });

    const filteredCourseData = courseData.filter((course) => {
        const search = courseSearch.toLowerCase();
        return (course.course_title || "").toLowerCase().includes(search);
    });

    return (
        <div className="space-y-6">
            <div className="max-md:mt-10  flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Approval Dashboard</h1>
            </div>

            <Tabs defaultValue="learners">
                <TabsList className="max-md:flex max-md:overflow-x-auto max-md:pl-40 grid w-full grid-cols-3">
                    <TabsTrigger value="learners">Learner Registrations</TabsTrigger>
                    <TabsTrigger value="instructors">Instructor Applications</TabsTrigger>
                    <TabsTrigger value="courses">Courses Approvals</TabsTrigger>
                </TabsList>

                {/* Learner Registrations */}
                <TabsContent value="learners" className="space-y-6 pt-6">
                    <div className="flex items-center justify-between max-md:flex-col max-md:items-stretch max-md:gap-2">
                        <div className="relative w-64 max-md:w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search registrations..."
                                className="w-full pl-8"
                                value={learnerSearch}
                                onChange={(e) => setLearnerSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`grid gap-6 ${selectedLearner ? "lg:grid-cols-2" : ""} max-md:grid-cols-1`}>
                        <Card
                            className={`border border-white/20 dark:border-white/10 w-full ${selectedLearner ? "" : "col-span-2"}`}
                        >
                            <CardHeader>
                                <CardTitle>Learner Registrations</CardTitle>
                                <CardDescription>Manage course registration approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border overflow-x-auto w-full">
                                    <div className="grid grid-cols-12 gap-2 p-4 font-medium max-md:hidden">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Course</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {/* Mobile Table Header */}
                                    <div className="md:hidden grid grid-cols-4 gap-2 p-4 font-medium">
                                        <div>Name</div>
                                        <div>Course</div>
                                        <div>Status</div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredLearnerData.length > 0 ? (
                                        <div className="min-w-[700px]">
                                            {filteredLearnerData.map((application) => (
                                                <div
                                                    key={application.id}
                                                    className={`grid grid-cols-12 gap-2 border-t p-4 items-center max-md:grid-cols-4 max-md:gap-1 ${
                                                        selectedLearner === application.id ? "bg-gray-800/50" : ""
                                                    }`}
                                                    onClick={() => setSelectedLearner(application.id)}
                                                >
                                                    {/* Desktop */}
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {application.full_name}
                                                    </div>
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {application.course?.course_title}
                                                    </div>
                                                    <div className="col-span-2 truncate max-md:hidden">
                                                        {new Date(application.created_at).toLocaleDateString("en-UK", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="col-span-2 max-md:col-span-1 max-md:text-xs">
                                                        {getLearnerStatusBadge(application.application_status)}
                                                    </div>
                                                    <div className="col-span-2 flex space-x-2 max-md:col-span-1 max-md:space-x-1">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedLearner(application.id);
                                                            }}
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p>No learner registrations found</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {selectedLearner && (
                            <Card className="border border-white/20 dark:border-white/10 w-full max-md:mt-4">
                                <CardHeader>
                                    <CardTitle>Registration Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Contact Information */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Contact Information</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Name:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {learnerData.find((r) => r.id === selectedLearner)?.full_name}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Email:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            learnerData.find((r) => r.id === selectedLearner)
                                                                ?.email_address
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Phone:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            learnerData.find((r) => r.id === selectedLearner)
                                                                ?.phone_number
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Current Profession:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            learnerData.find((r) => r.id === selectedLearner)
                                                                ?.current_profession
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Information */}
                                        <div>
                                            <h3 className="text-sm font-normal underline text-gray-400">
                                                Additional Information
                                            </h3>
                                            <div className="mt-1 space-y-4">
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        Any specific topics you're most excited about?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {
                                                            learnerData.find((r) => r.id === selectedLearner)
                                                                ?.excited_topics
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Promo Code */}
                                        <div>
                                            <h3 className="text-sm font-medium text-pink-400">Promo Code</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-pink-400 font-medium">
                                                        {learnerData.find((r) => r.id === selectedLearner)
                                                            ?.promo_code || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Registration Status */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Registration Status</h3>
                                            <div className="mt-2">
                                                <RegistrationStatusIndicator
                                                    steps={getLearnerStatusSteps(
                                                        learnerData.find((r) => r.id === selectedLearner)
                                                            ?.application_status || ""
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Actions</h3>
                                        {learnerData.find((r) => r.id === selectedLearner)?.application_status ===
                                            "in_review" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    type="button"
                                                    onClick={() => handleApproveLearnerInitialReview(selectedLearner)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                    )}
                                                    {isPending ? "Processing..." : "Approve Initial Review"}
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    type="button"
                                                    onClick={() => handleRejectLearnerApplication(selectedLearner)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                    )}
                                                    {isPending ? "Processing..." : "Reject Application"}
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.application_status ===
                                            "pending_payment" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                                                    onClick={() => handleLearnerPayment(selectedLearner)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <DollarSign className="mr-2 h-4 w-4" />
                                                    )}
                                                    {isPending ? "Processing..." : "Complete Payment"}
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    type="button"
                                                    onClick={() => handleRejectLearnerApplication(selectedLearner)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                    )}
                                                    {isPending ? "Processing..." : "Reject Application"}
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.application_status ===
                                            "payment_completed" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                                                    onClick={() => handleLearnerFinalApproval(selectedLearner)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                    )}
                                                    {isPending ? "Processing..." : "Grant Final Approval"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                {/* INSTRUCTORS Registrations*/}
                <TabsContent value="instructors" className="space-y-6 pt-6">
                    <div className="flex items-center justify-between max-md:flex-col max-md:items-stretch max-md:gap-2">
                        <div className="relative w-64 max-md:w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search applications..."
                                className="w-full pl-8"
                                value={instructorSearch}
                                onChange={(e) => setInstructorSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] max-md:grid-cols-1">
                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Instructor Applications</CardTitle>
                                <CardDescription>Manage instructor application approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border overflow-x-auto w-full">
                                    <div className="grid grid-cols-12 gap-2 p-4 font-medium max-md:hidden">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Expertise</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {/* Mobile Table Header */}
                                    <div className="md:hidden grid grid-cols-4 gap-2 p-4 font-medium">
                                        <div>Name</div>
                                        <div>Expertise</div>
                                        <div>Status</div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredInstructorData.length > 0 ? (
                                        <div className="min-w-[700px]">
                                            {filteredInstructorData.map((instructor) => (
                                                <div
                                                    key={instructor.id}
                                                    className={`grid grid-cols-12 gap-2 border-t p-4 items-center max-md:grid-cols-4 max-md:gap-1 ${
                                                        selectedInstructor === instructor.id ? "bg-gray-800/50" : ""
                                                    }`}
                                                    onClick={() => setSelectedInstructor(instructor.id)}
                                                >
                                                    {/* Desktop */}
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {instructor.first_name} {instructor.last_name}
                                                    </div>
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {instructor.area_of_expertise}
                                                    </div>
                                                    <div className="col-span-2 truncate max-md:hidden">
                                                        {new Date(instructor.created_at).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="col-span-2 max-md:col-span-1 max-md:text-xs">
                                                        {getInstructorStatusBadge(instructor.profile_status)}
                                                    </div>
                                                    <div className="col-span-2 flex space-x-2 max-md:col-span-1 max-md:space-x-1">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedInstructor(instructor.id);
                                                            }}
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p>No instructor applications found</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {selectedInstructor && (
                            <Card className="border border-white/20 dark:border-white/10 max-md:mt-4">
                                <CardHeader>
                                    <CardTitle>Application Details</CardTitle>
                                    {/* <CardDescription>
                                        {instructorData.find((r) => r.id === selectedInstructor)?.first_name}{" "}
                                        {instructorData.find((r) => r.id === selectedInstructor)?.last_name} -{" "}
                                        {instructorData.find((r) => r.id === selectedInstructor)?.area_of_expertise}
                                    </CardDescription> */}
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium ">Contact Information</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Email:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {instructorData.find((r) => r.id === selectedInstructor)?.email}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Phone:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.phone_number
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Location:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.location
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium ">Expertise & Profile</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Area of Expertise:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.area_of_expertise
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Years of Experience:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.years_of_experience
                                                        }
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">LinkedIn Profile:</span>
                                                    <span className="text-sm text-gray-400 font-medium max-w-xs text-right truncate">
                                                        <a
                                                            href={
                                                                instructorData.find((r) => r.id === selectedInstructor)
                                                                    ?.linkedin_profile
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            {
                                                                instructorData.find((r) => r.id === selectedInstructor)
                                                                    ?.linkedin_profile
                                                            }
                                                        </a>
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Portfolio Website:</span>
                                                    <span className="text-sm text-gray-400 font-medium max-w-xs text-right truncate">
                                                        <a
                                                            href={
                                                                instructorData.find((r) => r.id === selectedInstructor)
                                                                    ?.portfolio_website
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            {
                                                                instructorData.find((r) => r.id === selectedInstructor)
                                                                    ?.portfolio_website
                                                            }
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <span className="block text-sm font-normal text-gray-300">
                                                    Professional Bio:
                                                </span>
                                                <span className="block text-sm text-gray-400 font-medium">
                                                    {
                                                        instructorData.find((r) => r.id === selectedInstructor)
                                                            ?.professional_bio
                                                    }
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="block text-sm font-normal text-gray-300">
                                                    Proposed Course Ideas:
                                                </span>
                                                <span className="block text-sm text-gray-400 font-medium">
                                                    {
                                                        instructorData.find((r) => r.id === selectedInstructor)
                                                            ?.proposed_course_ideas
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium">Application Status</h3>
                                            <div className="mt-2">
                                                <RegistrationStatusIndicator
                                                    steps={getInstructorStatusSteps(
                                                        instructorData.find((r) => r.id === selectedInstructor)
                                                            ?.profile_status
                                                    )}
                                                    currentStep={
                                                        instructorData.find((r) => r.id === selectedInstructor)
                                                            ?.profile_status
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Actions</h3>

                                        {instructorData.find((r) => r.id === selectedInstructor)?.profile_status ===
                                            "pending" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    onClick={() =>
                                                        handleApproveApplication("instructor", selectedInstructor)
                                                    }
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <span className="flex items-center">
                                                            <svg
                                                                className="animate-spin h-4 w-4 mr-2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v8z"
                                                                ></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Approve Application
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    onClick={() => handleReject("instructor", selectedInstructor)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <span className="flex items-center">
                                                            <svg
                                                                className="animate-spin h-4 w-4 mr-2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v8z"
                                                                ></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Reject Application
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        )}

                                        {instructorData.find((r) => r.id === selectedInstructor)?.profile_status ===
                                            "approved" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    disabled
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approved
                                                </Button>
                                            </div>
                                        )}

                                        {instructorData.find((r) => r.id === selectedInstructor)?.profile_status ===
                                            "suspended" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700"
                                                    disabled
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Suspended
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="courses" className="space-y-6 pt-6">
                    <div className="flex items-center justify-between max-md:flex-col max-md:items-stretch max-md:gap-2">
                        <div className="relative w-64 max-md:w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search courses..."
                                className="w-full pl-8"
                                value={courseSearch}
                                onChange={(e) => setCourseSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] max-md:grid-cols-1">
                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Courses</CardTitle>
                                <CardDescription>Manage course approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border overflow-x-auto w-full">
                                    <div className="grid grid-cols-12 gap-2 p-4 font-medium max-md:hidden">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Instructor ID</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {/* Mobile Table Header */}
                                    <div className="md:hidden grid grid-cols-4 gap-2 p-4 font-medium">
                                        <div>Name</div>
                                        <div>Instructor ID</div>
                                        <div>Status</div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredCourseData.length > 0 ? (
                                        <div className="min-w-[700px]">
                                            {filteredCourseData.map((course) => (
                                                <div
                                                    key={course.id}
                                                    className={`grid grid-cols-12 gap-2 p-4 items-center max-md:grid-cols-4 max-md:gap-1 ${
                                                        selectedCourse === course.id ? "bg-gray-800/50" : ""
                                                    }`}
                                                    onClick={() => setSelectedCourse(course.id)}
                                                >
                                                    {/* Desktop */}
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {course.course_title}
                                                    </div>
                                                    <div className="col-span-3 truncate max-md:col-span-1 max-md:text-xs">
                                                        {course.instructor}
                                                    </div>
                                                    <div className="col-span-2 truncate max-md:hidden">
                                                        {new Date(course.created_at).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="col-span-2 max-md:col-span-1 max-md:text-xs">
                                                        {getCourseStatusBadge(course.status)}
                                                    </div>
                                                    <div className="col-span-2 flex space-x-2 max-md:col-span-1 max-md:space-x-1">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <EllipsisVertical />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="start">
                                                                <DropdownMenuGroup>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            router.push(
                                                                                `/super-admin/dashboard/courses/${course.id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        View Course
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setSelectedCourse(course.id);
                                                                        }}
                                                                    >
                                                                        View Application
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p>No courses found</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {selectedCourse && (
                            <Card className="border border-white/20 dark:border-white/10 max-md:mt-4">
                                <CardHeader>
                                    <CardTitle>Course Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Name:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.course_title}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Short Description:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.short_description}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Full Description:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.full_description}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Category:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.category}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Price:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.price}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Duration:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.duration}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Enrollment Count:</p>
                                            <p className="text-sm">
                                                {courseData.find((r) => r.id === selectedCourse)?.enrollment_count}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium">Course Status</h3>
                                        <div className="mt-2">
                                            <RegistrationStatusIndicator
                                                steps={getCourseStatusSteps(
                                                    courseData.find((r) => r.id === selectedCourse)?.status
                                                )}
                                                currentStep={courseData.find((r) => r.id === selectedCourse)?.status}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Actions</h3>

                                        {courseData.find((r) => r.id === selectedCourse)?.status === "pending" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    onClick={() => handleApproveApplication("course", selectedCourse)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <span className="flex items-center">
                                                            <svg
                                                                className="animate-spin h-4 w-4 mr-2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v8z"
                                                                ></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Approve Course
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    onClick={() => handleReject("course", selectedCourse)}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? (
                                                        <span className="flex items-center">
                                                            <svg
                                                                className="animate-spin h-4 w-4 mr-2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v8z"
                                                                ></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Reject Course
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        )}

                                        {courseData.find((r) => r.id === selectedCourse)?.status === "approved" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    disabled
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approved
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
