"use client";

import {
    sendInstructorComplianceEmail,
    sendInstructorPaymentEmail,
    sendLearnerComplianceEmail,
    sendLearnerFinalApprovalEmail,
    sendLearnerPaymentEmail,
} from "@/app/actions/email-actions";
import { RegistrationStatusIndicator } from "@/components/super-admin/registration-status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { CheckCircle, Clock, FileText, Filter, Mail, Search, XCircle } from "lucide-react";
import { useState, useTransition } from "react";

export default function ApprovalsDashboard({
    initialLearnerData,
    initialInstructorData,
}: {
    initialLearnerData: any[];
    initialInstructorData: any[];
}) {
    const { toast } = useToast();

    const [selectedLearner, setSelectedLearner] = useState<string | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
    const [learnerData, setLearnerData] = useState(initialLearnerData);
    const [instructorData, setInstructorData] = useState(initialInstructorData);
    const [isPending, startTransition] = useTransition();

    // Handler functions from original ApprovalsPage
    // const handleApproveInitial = async (type: "learner" | "instructor", id: string) => {
    //     if (type === "learner") {
    //         const learner = learnerData.find((item) => item.id === id);
    //         if (learner) {
    //             setLearnerData((prev) =>
    //                 prev.map((item) => (item.id === id ? { ...item, status: "pending_payment" } : item))
    //             );
    //             try {
    //                 await sendLearnerInitialApprovalEmail({
    //                     learnerName: learner.name,
    //                     learnerEmail: learner.email,
    //                     courseName: learner.course,
    //                     courseStartDate: "2023-06-15",
    //                     paymentAmount: "$499",
    //                     paymentLink: "https://aariyatech.co.uk/payment/learner/" + id,
    //                     loginLink: "https://aariyatech.co.uk/dashboard/registrations/" + id,
    //                 });
    //                 toast({
    //                     title: "Initial Approval Granted",
    //                     description: "The applicant has been notified to proceed with payment.",
    //                 });
    //             } catch (error) {
    //                 logger.error("Email error:", error);
    //                 toast({
    //                     title: "Email Error",
    //                     description: "Status updated but there was an error sending the email.",
    //                     variant: "destructive",
    //                 });
    //             }
    //         }
    //     } else {
    //         const instructor = instructorData.find((item) => item.id === id);
    //         if (instructor) {
    //             setInstructorData((prev) =>
    //                 prev.map((item) => (item.id === id ? { ...item, status: "pending_payment" } : item))
    //             );
    //             try {
    //                 await sendInstructorInitialApprovalEmail({
    //                     instructorName: instructor.name,
    //                     instructorEmail: instructor.email,
    //                     expertise: instructor.expertise,
    //                     paymentAmount: "$299",
    //                     paymentLink: "https://aariyatech.co.uk/payment/instructor/" + id,
    //                     loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
    //                 });
    //                 toast({
    //                     title: "Initial Approval Granted",
    //                     description: "The applicant has been notified to proceed with payment.",
    //                 });
    //             } catch (error) {
    //                 logger.error("Email error:", error);
    //                 toast({
    //                     title: "Email Error",
    //                     description: "Status updated but there was an error sending the email.",
    //                     variant: "destructive",
    //                 });
    //             }
    //         }
    //     }
    // };

    const handleApproveApplication = async (type: "learner" | "instructor", id: string) => {
        if (type === "learner") {
            const learner = learnerData.find((item) => item.id === id);
            if (learner) {
                setLearnerData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)));
                try {
                    await sendLearnerFinalApprovalEmail({
                        learnerName: learner.name,
                        learnerEmail: learner.email,
                        courseName: learner.course,
                        courseStartDate: "2023-06-15",
                        loginLink: "https://aariyatech.co.uk/dashboard/courses",
                        nextSteps: [
                            "Log in to your dashboard to access course materials",
                            "Complete your profile information",
                            "Join the course orientation session",
                        ],
                    });
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
        } else {
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
        }
    };

    const sendPaymentReminder = async (type: "learner" | "instructor", id: string) => {
        if (type === "learner") {
            const learner = learnerData.find((item) => item.id === id);
            if (learner) {
                try {
                    await sendLearnerPaymentEmail({
                        learnerName: learner.name,
                        learnerEmail: learner.email,
                        courseName: learner.course,
                        courseStartDate: "2023-06-15",
                        paymentAmount: "$499",
                        paymentLink: "https://aariyatech.co.uk/payment/learner/" + id,
                    });
                    toast({
                        title: "Payment Reminder Sent",
                        description: "A payment reminder email has been sent to the applicant.",
                    });
                } catch (error) {
                    logger.error("Email error:", error);
                    toast({
                        title: "Email Error",
                        description: "There was an error sending the payment reminder email.",
                        variant: "destructive",
                    });
                }
            }
        } else {
            const instructor = instructorData.find((item) => item.id === id);
            if (instructor) {
                try {
                    await sendInstructorPaymentEmail({
                        instructorName: instructor.name,
                        instructorEmail: instructor.email,
                        paymentAmount: "$299",
                        paymentLink: "https://aariyatech.co.uk/payment/instructor/" + id,
                    });
                    toast({
                        title: "Payment Reminder Sent",
                        description: "A payment reminder email has been sent to the applicant.",
                    });
                } catch (error) {
                    logger.error("Email error:", error);
                    toast({
                        title: "Email Error",
                        description: "There was an error sending the payment reminder email.",
                        variant: "destructive",
                    });
                }
            }
        }
    };

    const sendComplianceNotification = async (type: "learner" | "instructor", id: string) => {
        if (type === "learner") {
            const learner = learnerData.find((item) => item.id === id);
            if (learner) {
                try {
                    await sendLearnerComplianceEmail({
                        learnerName: learner.name,
                        learnerEmail: learner.email,
                        courseName: learner.course,
                        loginLink: "https://aariyatech.co.uk/dashboard/registrations/" + id,
                    });
                    toast({
                        title: "Compliance Notification Sent",
                        description: "A compliance check notification email has been sent to the applicant.",
                    });
                } catch (error) {
                    logger.error("Email error:", error);
                    toast({
                        title: "Email Error",
                        description: "There was an error sending the compliance notification email.",
                        variant: "destructive",
                    });
                }
            }
        } else {
            const instructor = instructorData.find((item) => item.id === id);
            if (instructor) {
                try {
                    await sendInstructorComplianceEmail({
                        instructorName: instructor.name,
                        instructorEmail: instructor.email,
                        loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
                    });
                    toast({
                        title: "Compliance Notification Sent",
                        description: "A compliance check notification email has been sent to the applicant.",
                    });
                } catch (error) {
                    logger.error("Email error:", error);
                    toast({
                        title: "Email Error",
                        description: "There was an error sending the compliance notification email.",
                        variant: "destructive",
                    });
                }
            }
        }
    };

    const handleReject = (type: "learner" | "instructor", id: string) => {
        if (type === "learner") {
            setLearnerData((prev) => prev.filter((item) => item.id !== id));
        } else {
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
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500">Initial Review</Badge>;
            // case "pending_payment":
            //     return <Badge className="bg-blue-500">Payment Pending</Badge>;
            // case "pending_compliance":
            //     return <Badge className="bg-purple-500">Compliance Check</Badge>;
            // case "pending_final":
            //     return <Badge className="bg-orange-500">Final Review</Badge>;
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    const getLearnerStatusSteps = (status: string) => {
        const steps = [
            { id: 1, name: "Submit Application", status: "completed" },
            { id: 2, name: "Initial Review", status: status === "pending" ? "current" : "completed" },
            {
                id: 3,
                name: "Payment",
                status: status === "pending_payment" ? "current" : status === "pending" ? "upcoming" : "completed",
            },
            {
                id: 4,
                name: "Compliance Check",
                status:
                    status === "pending_compliance"
                        ? "current"
                        : ["pending", "pending_payment"].includes(status)
                          ? "upcoming"
                          : "completed",
            },
            {
                id: 5,
                name: "Final Approval",
                status: status === "approved" ? "current" : status === "approved" ? "completed" : "upcoming",
            },
        ];
        return steps.map((step) => ({
            ...step,
            status: step.status as "completed" | "current" | "upcoming" | "error",
        }));
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Approval Dashboard</h1>
            </div>

            <Tabs defaultValue="learners">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="learners">Learner Registrations</TabsTrigger>
                    <TabsTrigger value="instructors">Instructor Applications</TabsTrigger>
                </TabsList>

                <TabsContent value="learners" className="space-y-6 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search registrations..." className="w-full pl-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm">
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Learner Registrations</CardTitle>
                                <CardDescription>Manage course registration approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Course</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {learnerData.length > 0 ? (
                                        learnerData.map((registration) => (
                                            <div
                                                key={registration.id}
                                                className={`grid grid-cols-12 gap-2 border-t p-4 items-center ${
                                                    selectedLearner === registration.id ? "bg-gray-800/50" : ""
                                                }`}
                                                onClick={() => setSelectedLearner(registration.id)}
                                            >
                                                <div className="col-span-3 truncate">{registration.name}</div>
                                                <div className="col-span-3 truncate">{registration.course}</div>
                                                <div className="col-span-2 truncate">
                                                    {new Date(registration.date).toLocaleDateString()}
                                                </div>
                                                <div className="col-span-2">{getStatusBadge(registration.status)}</div>
                                                <div className="col-span-2 flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedLearner(registration.id);
                                                        }}
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                    {registration.status === "pending" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-green-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleApproveInitial("learner", registration.id);
                                                            }}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {registration.status === "pending_final" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-green-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleApproveApplication("learner", registration.id);
                                                            }}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p>No learner registrations found</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {selectedLearner && (
                            <Card className="border border-white/20 dark:border-white/10">
                                <CardHeader>
                                    <CardTitle>Registration Details</CardTitle>
                                    <CardDescription>
                                        {learnerData.find((r) => r.id === selectedLearner)?.name} -{" "}
                                        {learnerData.find((r) => r.id === selectedLearner)?.course}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Contact Information</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Email:</span>
                                                    <span className="text-sm font-medium">
                                                        {learnerData.find((r) => r.id === selectedLearner)?.email}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Phone:</span>
                                                    <span className="text-sm font-medium">+1 (555) 123-4567</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Registration Status</h3>
                                            <div className="mt-2">
                                                <RegistrationStatusIndicator
                                                    steps={getLearnerStatusSteps(
                                                        learnerData.find((r) => r.id === selectedLearner)?.status || ""
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium text-gray-400">Actions</h3>

                                        {learnerData.find((r) => r.id === selectedLearner)?.status === "pending" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    onClick={() => handleApproveInitial("learner", selectedLearner)}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve Initial Review
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    onClick={() => handleReject("learner", selectedLearner)}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject Application
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.status ===
                                            "pending_payment" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                                                    onClick={() => sendPaymentReminder("learner", selectedLearner)}
                                                >
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Payment Email
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    Check Payment Status
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.status ===
                                            "pending_compliance" && (
                                            <div className="space-y-2">
                                                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View Compliance Documents
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => {
                                                        setLearnerData((prev) =>
                                                            prev.map((item) =>
                                                                item.id === selectedLearner
                                                                    ? { ...item, status: "pending_final" }
                                                                    : item
                                                            )
                                                        );
                                                        sendComplianceNotification("learner", selectedLearner);
                                                        toast({
                                                            title: "Compliance Check Completed",
                                                            description:
                                                                "The application is now ready for final approval.",
                                                        });
                                                    }}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Mark Compliance as Complete
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.status ===
                                            "pending_final" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    onClick={() => handleApproveApplication("learner", selectedLearner)}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Grant Final Approval
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-red-500"
                                                    onClick={() => handleReject("learner", selectedLearner)}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject Application
                                                </Button>
                                            </div>
                                        )}

                                        {learnerData.find((r) => r.id === selectedLearner)?.status === "approved" && (
                                            <div className="space-y-2">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                                                    disabled
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approved
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Welcome Email
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="instructors" className="space-y-6 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search applications..." className="w-full pl-8" />
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Instructor Applications</CardTitle>
                                <CardDescription>Manage instructor application approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Expertise</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {instructorData.length > 0 ? (
                                        instructorData.map((instructor) => (
                                            <div
                                                key={instructor.id}
                                                className={`grid grid-cols-12 gap-2 border-t p-4 items-center ${
                                                    selectedInstructor === instructor.id ? "bg-gray-800/50" : ""
                                                }`}
                                                onClick={() => setSelectedInstructor(instructor.id)}
                                            >
                                                <div className="col-span-3 truncate">
                                                    {instructor.first_name} {instructor.last_name}
                                                </div>
                                                <div className="col-span-3 truncate">
                                                    {instructor.area_of_expertise}
                                                </div>
                                                <div className="col-span-2 truncate">
                                                    {new Date(instructor.created_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                                <div className="col-span-2">
                                                    {getStatusBadge(instructor.profile_status)}
                                                </div>
                                                <div className="col-span-2 flex space-x-2">
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

                                                    {/* {instructor.profile_status === "pending" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-green-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleApproveInitial("instructor", instructor.id);
                                                            }}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    )} */}

                                                    {/* {instructor.profile_status === "pending_final" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-green-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleApproveFinal("instructor", instructor.id);
                                                            }}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    )} */}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p>No instructor applications found</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {selectedInstructor && (
                            <Card className="border border-white/20 dark:border-white/10">
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
                                                    <span className="text-sm text-gray-400">Professional Bio:</span>
                                                    <span className="text-sm text-gray-400 font-medium max-w-xs text-right truncate">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.professional_bio
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
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">
                                                        Proposed Course Ideas:
                                                    </span>
                                                    <span className="text-sm text-gray-400 font-medium max-w-xs text-right truncate">
                                                        {
                                                            instructorData.find((r) => r.id === selectedInstructor)
                                                                ?.proposed_course_ideas
                                                        }
                                                    </span>
                                                </div>
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
            </Tabs>
        </div>
    );
}
