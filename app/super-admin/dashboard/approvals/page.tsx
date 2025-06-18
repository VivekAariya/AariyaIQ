"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, CheckCircle, XCircle, Clock, FileText, Mail } from "lucide-react"
import { RegistrationStatusIndicator } from "@/components/registration-status-indicator"
import { toast } from "@/components/ui/use-toast"

// Import the email actions at the top of the file
import {
  sendLearnerInitialApprovalEmail,
  sendLearnerPaymentEmail,
  sendLearnerComplianceEmail,
  sendLearnerFinalApprovalEmail,
  sendInstructorInitialApprovalEmail,
  sendInstructorPaymentEmail,
  sendInstructorComplianceEmail,
  sendInstructorFinalApprovalEmail,
} from "@/app/actions/email-actions"

// Mock data for learner registrations
const learnerRegistrations = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    course: "AI Recruitment Fundamentals",
    date: "2023-05-15",
    status: "pending_initial",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    course: "MERN Stack Fundamentals",
    date: "2023-05-14",
    status: "pending_payment",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    course: "Data Science Essentials",
    date: "2023-05-12",
    status: "pending_compliance",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    course: "Cloud Computing Fundamentals",
    date: "2023-05-10",
    status: "pending_final",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    course: "DevOps Engineering",
    date: "2023-05-08",
    status: "approved",
  },
]

// Mock data for instructor applications
const instructorApplications = [
  {
    id: "1",
    name: "Robert Johnson",
    email: "robert@example.com",
    expertise: "Artificial Intelligence",
    date: "2023-05-15",
    status: "pending_initial",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    expertise: "Web Development",
    date: "2023-05-14",
    status: "pending_payment",
  },
  {
    id: "3",
    name: "Thomas Clark",
    email: "thomas@example.com",
    expertise: "Data Science",
    date: "2023-05-12",
    status: "pending_compliance",
  },
  {
    id: "4",
    name: "Lisa Martinez",
    email: "lisa@example.com",
    expertise: "Cloud Computing",
    date: "2023-05-10",
    status: "pending_final",
  },
  {
    id: "5",
    name: "Kevin Taylor",
    email: "kevin@example.com",
    expertise: "Mobile Development",
    date: "2023-05-08",
    status: "approved",
  },
]

export default function ApprovalsPage() {
  // Initialize state with default values to prevent undefined errors
  const [selectedLearner, setSelectedLearner] = useState<string | null>(null)
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null)
  const [learnerData, setLearnerData] = useState(learnerRegistrations)
  const [instructorData, setInstructorData] = useState(instructorApplications)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate data loading
  useEffect(() => {
    // Simulate API call or data fetching
    const loadData = async () => {
      try {
        // In a real app, you would fetch data from an API here
        // For now, we'll just use a timeout to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Set loading to false when data is "loaded"
        setIsLoading(false)
      } catch (err) {
        logger.error("Error loading approval data:", err)
        setError("Failed to load approval data. Please try again.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Update the handleApproveInitial function to send emails
  const handleApproveInitial = async (type: "learner" | "instructor", id: string) => {
    try {
      if (type === "learner") {
        const learner = learnerData.find((item) => item.id === id)
        if (learner) {
          // Update status
          setLearnerData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "pending_payment" } : item)))

          // Send email
          try {
            await sendLearnerInitialApprovalEmail({
              learnerName: learner.name,
              learnerEmail: learner.email,
              courseName: learner.course,
              courseStartDate: "2023-06-15", // This would come from your course data
              paymentAmount: "$499",
              paymentLink: "https://aariyatech.co.uk/payment/learner/" + id,
              loginLink: "https://aariyatech.co.uk/dashboard/registrations/" + id,
            })

            toast({
              title: "Initial Approval Granted",
              description: "The applicant has been notified to proceed with payment.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "Status updated but there was an error sending the email.",
              variant: "destructive",
            })
          }
        }
      } else {
        const instructor = instructorData.find((item) => item.id === id)
        if (instructor) {
          // Update status
          setInstructorData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: "pending_payment" } : item)),
          )

          // Send email
          try {
            await sendInstructorInitialApprovalEmail({
              instructorName: instructor.name,
              instructorEmail: instructor.email,
              expertise: instructor.expertise,
              paymentAmount: "$299",
              paymentLink: "https://aariyatech.co.uk/payment/instructor/" + id,
              loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
            })

            toast({
              title: "Initial Approval Granted",
              description: "The applicant has been notified to proceed with payment.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "Status updated but there was an error sending the email.",
              variant: "destructive",
            })
          }
        }
      }
    } catch (err) {
      logger.error("Error in handleApproveInitial:", err)
      toast({
        title: "Operation Failed",
        description: "There was an error processing this request. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Update the handleApproveFinal function to send emails
  const handleApproveFinal = async (type: "learner" | "instructor", id: string) => {
    try {
      if (type === "learner") {
        const learner = learnerData.find((item) => item.id === id)
        if (learner) {
          // Update status
          setLearnerData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))

          // Send email
          try {
            await sendLearnerFinalApprovalEmail({
              learnerName: learner.name,
              learnerEmail: learner.email,
              courseName: learner.course,
              courseStartDate: "2023-06-15", // This would come from your course data
              loginLink: "https://aariyatech.co.uk/dashboard/courses",
              nextSteps: [
                "Log in to your dashboard to access course materials",
                "Complete your profile information",
                "Join the course orientation session",
              ],
            })

            toast({
              title: "Final Approval Granted",
              description: "The applicant has been notified of their approval.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "Status updated but there was an error sending the email.",
              variant: "destructive",
            })
          }
        }
      } else {
        const instructor = instructorData.find((item) => item.id === id)
        if (instructor) {
          // Update status
          setInstructorData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))

          // Send email
          try {
            await sendInstructorFinalApprovalEmail({
              instructorName: instructor.name,
              instructorEmail: instructor.email,
              loginLink: "https://aariyatech.co.uk/instructor/dashboard",
              nextSteps: [
                "Log in to your instructor dashboard",
                "Complete your instructor profile",
                "Prepare your course materials",
                "Schedule an onboarding session with our team",
              ],
            })

            toast({
              title: "Final Approval Granted",
              description: "The applicant has been notified of their approval.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "Status updated but there was an error sending the email.",
              variant: "destructive",
            })
          }
        }
      }
    } catch (err) {
      logger.error("Error in handleApproveFinal:", err)
      toast({
        title: "Operation Failed",
        description: "There was an error processing this request. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Add a function to send payment reminder emails
  const sendPaymentReminder = async (type: "learner" | "instructor", id: string) => {
    try {
      if (type === "learner") {
        const learner = learnerData.find((item) => item.id === id)
        if (learner) {
          try {
            await sendLearnerPaymentEmail({
              learnerName: learner.name,
              learnerEmail: learner.email,
              courseName: learner.course,
              courseStartDate: "2023-06-15", // This would come from your course data
              paymentAmount: "$499",
              paymentLink: "https://aariyatech.co.uk/payment/learner/" + id,
            })

            toast({
              title: "Payment Reminder Sent",
              description: "A payment reminder email has been sent to the applicant.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "There was an error sending the payment reminder email.",
              variant: "destructive",
            })
          }
        }
      } else {
        const instructor = instructorData.find((item) => item.id === id)
        if (instructor) {
          try {
            await sendInstructorPaymentEmail({
              instructorName: instructor.name,
              instructorEmail: instructor.email,
              paymentAmount: "$299",
              paymentLink: "https://aariyatech.co.uk/payment/instructor/" + id,
            })

            toast({
              title: "Payment Reminder Sent",
              description: "A payment reminder email has been sent to the applicant.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "There was an error sending the payment reminder email.",
              variant: "destructive",
            })
          }
        }
      }
    } catch (err) {
      logger.error("Error in sendPaymentReminder:", err)
      toast({
        title: "Operation Failed",
        description: "There was an error sending the payment reminder. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Add a function to send compliance check notification
  const sendComplianceNotification = async (type: "learner" | "instructor", id: string) => {
    try {
      if (type === "learner") {
        const learner = learnerData.find((item) => item.id === id)
        if (learner) {
          try {
            await sendLearnerComplianceEmail({
              learnerName: learner.name,
              learnerEmail: learner.email,
              courseName: learner.course,
              loginLink: "https://aariyatech.co.uk/dashboard/registrations/" + id,
            })

            toast({
              title: "Compliance Notification Sent",
              description: "A compliance check notification email has been sent to the applicant.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "There was an error sending the compliance notification email.",
              variant: "destructive",
            })
          }
        }
      } else {
        const instructor = instructorData.find((item) => item.id === id)
        if (instructor) {
          try {
            await sendInstructorComplianceEmail({
              instructorName: instructor.name,
              instructorEmail: instructor.email,
              loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
            })

            toast({
              title: "Compliance Notification Sent",
              description: "A compliance check notification email has been sent to the applicant.",
            })
          } catch (error) {
            logger.error("Email error:", error)
            toast({
              title: "Email Error",
              description: "There was an error sending the compliance notification email.",
              variant: "destructive",
            })
          }
        }
      }
    } catch (err) {
      logger.error("Error in sendComplianceNotification:", err)
      toast({
        title: "Operation Failed",
        description: "There was an error sending the compliance notification. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = (type: "learner" | "instructor", id: string) => {
    try {
      if (type === "learner") {
        setLearnerData((prev) => prev.filter((item) => item.id !== id))
      } else {
        setInstructorData((prev) => prev.filter((item) => item.id !== id))
      }

      toast({
        title: "Application Rejected",
        description: "The applicant will be notified of the rejection.",
      })
    } catch (err) {
      logger.error("Error in handleReject:", err)
      toast({
        title: "Operation Failed",
        description: "There was an error rejecting the application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_initial":
        return <Badge className="bg-yellow-500">Initial Review</Badge>
      case "pending_payment":
        return <Badge className="bg-blue-500">Payment Pending</Badge>
      case "pending_compliance":
        return <Badge className="bg-purple-500">Compliance Check</Badge>
      case "pending_final":
        return <Badge className="bg-orange-500">Final Review</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusSteps = (status: string) => {
    const steps = [
      { id: 1, name: "Submit Application", status: "completed" },
      { id: 2, name: "Initial Review", status: status === "pending_initial" ? "current" : "completed" },
      {
        id: 3,
        name: "Payment",
        status: status === "pending_payment" ? "current" : status === "pending_initial" ? "upcoming" : "completed",
      },
      {
        id: 4,
        name: "Compliance Check",
        status:
          status === "pending_compliance"
            ? "current"
            : ["pending_initial", "pending_payment"].includes(status)
              ? "upcoming"
              : "completed",
      },
      {
        id: 5,
        name: "Final Approval",
        status: status === "pending_final" ? "current" : status === "approved" ? "completed" : "upcoming",
      },
    ]

    return steps.map((step) => ({ ...step, status: step.status as "completed" | "current" | "upcoming" | "error" }))
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Approval Dashboard</h1>
        </div>
        <div className="h-8 w-full max-w-md bg-gray-700/30 animate-pulse rounded"></div>
        <div className="space-y-4">
          <div className="h-64 bg-gray-700/30 animate-pulse rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 bg-gray-700/30 animate-pulse rounded"></div>
            <div className="h-40 bg-gray-700/30 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="text-red-500 mb-4">
          <XCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

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
                        <div className="col-span-2 truncate">{new Date(registration.date).toLocaleDateString()}</div>
                        <div className="col-span-2">{getStatusBadge(registration.status)}</div>
                        <div className="col-span-2 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedLearner(registration.id)
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {registration.status === "pending_initial" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApproveInitial("learner", registration.id)
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
                                e.stopPropagation()
                                handleApproveFinal("learner", registration.id)
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
                          steps={getStatusSteps(learnerData.find((r) => r.id === selectedLearner)?.status || "")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">Actions</h3>

                    {learnerData.find((r) => r.id === selectedLearner)?.status === "pending_initial" && (
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

                    {learnerData.find((r) => r.id === selectedLearner)?.status === "pending_payment" && (
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

                    {learnerData.find((r) => r.id === selectedLearner)?.status === "pending_compliance" && (
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
                                item.id === selectedLearner ? { ...item, status: "pending_final" } : item,
                              ),
                            )
                            sendComplianceNotification("learner", selectedLearner)
                            toast({
                              title: "Compliance Check Completed",
                              description: "The application is now ready for final approval.",
                            })
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Compliance as Complete
                        </Button>
                      </div>
                    )}

                    {learnerData.find((r) => r.id === selectedLearner)?.status === "pending_final" && (
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-700"
                          onClick={() => handleApproveFinal("learner", selectedLearner)}
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
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700" disabled>
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
                    instructorData.map((application) => (
                      <div
                        key={application.id}
                        className={`grid grid-cols-12 gap-2 border-t p-4 items-center ${
                          selectedInstructor === application.id ? "bg-gray-800/50" : ""
                        }`}
                        onClick={() => setSelectedInstructor(application.id)}
                      >
                        <div className="col-span-3 truncate">{application.name}</div>
                        <div className="col-span-3 truncate">{application.expertise}</div>
                        <div className="col-span-2 truncate">{new Date(application.date).toLocaleDateString()}</div>
                        <div className="col-span-2">{getStatusBadge(application.status)}</div>
                        <div className="col-span-2 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedInstructor(application.id)
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {application.status === "pending_initial" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApproveInitial("instructor", application.id)
                              }}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {application.status === "pending_final" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApproveFinal("instructor", application.id)
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
                  <CardDescription>
                    {instructorData.find((r) => r.id === selectedInstructor)?.name} -{" "}
                    {instructorData.find((r) => r.id === selectedInstructor)?.expertise}
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
                            {instructorData.find((r) => r.id === selectedInstructor)?.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Phone:</span>
                          <span className="text-sm font-medium">+1 (555) 987-6543</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Application Status</h3>
                      <div className="mt-2">
                        <RegistrationStatusIndicator
                          steps={getStatusSteps(instructorData.find((r) => r.id === selectedInstructor)?.status || "")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">Actions</h3>

                    {instructorData.find((r) => r.id === selectedInstructor)?.status === "pending_initial" && (
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-700"
                          onClick={() => handleApproveInitial("instructor", selectedInstructor)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Initial Review
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-red-500"
                          onClick={() => handleReject("instructor", selectedInstructor)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Application
                        </Button>
                      </div>
                    )}

                    {instructorData.find((r) => r.id === selectedInstructor)?.status === "pending_payment" && (
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                          onClick={() => sendPaymentReminder("instructor", selectedInstructor)}
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

                    {instructorData.find((r) => r.id === selectedInstructor)?.status === "pending_compliance" && (
                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                          <FileText className="mr-2 h-4 w-4" />
                          View Compliance Documents
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setInstructorData((prev) =>
                              prev.map((item) =>
                                item.id === selectedInstructor ? { ...item, status: "pending_final" } : item,
                              ),
                            )
                            sendComplianceNotification("instructor", selectedInstructor)
                            toast({
                              title: "Compliance Check Completed",
                              description: "The application is now ready for final approval.",
                            })
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Compliance as Complete
                        </Button>
                      </div>
                    )}

                    {instructorData.find((r) => r.id === selectedInstructor)?.status === "pending_final" && (
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-700"
                          onClick={() => handleApproveFinal("instructor", selectedInstructor)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Grant Final Approval
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-red-500"
                          onClick={() => handleReject("instructor", selectedInstructor)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Application
                        </Button>
                      </div>
                    )}

                    {instructorData.find((r) => r.id === selectedInstructor)?.status === "approved" && (
                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700" disabled>
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
      </Tabs>
    </div>
  )
}
