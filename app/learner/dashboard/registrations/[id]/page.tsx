"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationStatusIndicator } from "@/components/super-admin/registration-status-indicator"
import { courses } from "@/lib/courses"
import { Bell, FileText, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react"

export default function RegistrationStatusPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const course = courses.find((c) => c.id === params.id)
  const [currentStatus, setCurrentStatus] = useState<"pending" | "review" | "payment" | "compliance" | "approved">(
    "review",
  )

  // Simulate status changes for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStatus("payment")
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Course Not Found</CardTitle>
              <CardDescription>The course you are looking for does not exist.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // Map current status to step statuses
  const getStepStatuses = () => {
    const statuses = {
      pending: ["current", "upcoming", "upcoming", "upcoming", "upcoming"],
      review: ["completed", "current", "upcoming", "upcoming", "upcoming"],
      payment: ["completed", "completed", "current", "upcoming", "upcoming"],
      compliance: ["completed", "completed", "completed", "current", "upcoming"],
      approved: ["completed", "completed", "completed", "completed", "completed"],
    }

    return statuses[currentStatus].map((status) => status as "completed" | "current" | "upcoming" | "error")
  }

  const stepStatuses = getStepStatuses()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_350px] lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Course Registration Status</h1>
                  <p className="text-muted-foreground">Track your registration progress for {course.title}</p>
                </div>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Back to Dashboard
                </Button>
              </div>

              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>Registration submitted on {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="status">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="status">Status</TabsTrigger>
                      <TabsTrigger value="details">Course Details</TabsTrigger>
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="status" className="space-y-4 pt-4">
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <h3 className="text-lg font-semibold mb-4">Registration Progress</h3>
                        <RegistrationStatusIndicator
                          steps={[
                            { id: 1, name: "Submit Registration", status: stepStatuses[0] },
                            { id: 2, name: "Initial Review", status: stepStatuses[1] },
                            { id: 3, name: "Payment", status: stepStatuses[2] },
                            { id: 4, name: "Compliance Check", status: stepStatuses[3] },
                            { id: 5, name: "Final Approval", status: stepStatuses[4] },
                          ]}
                        />
                      </div>

                      {currentStatus === "payment" && (
                        <div className="bg-yellow-900/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30 flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-500">Payment Required</h4>
                            <p className="text-sm text-gray-300 mt-1">
                              Your registration has been initially approved. Please check your email for payment
                              instructions. Once payment is confirmed, your application will proceed to the compliance
                              check.
                            </p>
                          </div>
                        </div>
                      )}

                      {currentStatus === "compliance" && (
                        <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-500">Compliance Check in Progress</h4>
                            <p className="text-sm text-gray-300 mt-1">
                              Your payment has been confirmed. We are now conducting a compliance check. This typically
                              takes 1-2 business days.
                            </p>
                          </div>
                        </div>
                      )}

                      {currentStatus === "approved" && (
                        <div className="bg-green-900/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-500">Registration Approved</h4>
                            <p className="text-sm text-gray-300 mt-1">
                              Congratulations! Your registration has been approved. You can now access the course
                              materials. The course will begin on {new Date(course.startDate).toLocaleDateString()}.
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Instructor</h4>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Duration</h4>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Level</h4>
                          <p className="text-sm text-muted-foreground">{course.level}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Start Date</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(course.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium">Course Description</h4>
                        <p className="text-sm text-muted-foreground mt-1">{course.fullDescription}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="messages" className="space-y-4 pt-4">
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Messages</h3>
                          <Button variant="outline" size="sm">
                            Refresh
                          </Button>
                        </div>

                        {currentStatus === "review" && (
                          <div className="text-center py-8">
                            <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-400">No messages yet</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Messages related to your registration will appear here
                            </p>
                          </div>
                        )}

                        {currentStatus !== "review" && (
                          <div className="space-y-4">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">AariyaIQ Admin</span>
                                <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-gray-300">
                                Your registration for {course.title} has been initially approved. Please check your
                                email for payment instructions.
                              </p>
                            </div>

                            {currentStatus === "compliance" && (
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">AariyaIQ Admin</span>
                                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                  Thank you for your payment. Your registration is now undergoing a compliance check.
                                  We'll notify you once this process is complete.
                                </p>
                              </div>
                            )}

                            {currentStatus === "approved" && (
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">AariyaIQ Admin</span>
                                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                  Congratulations! Your registration for {course.title} has been fully approved. You can
                                  now access the course materials. We look forward to seeing you on the start date.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>Registration Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Registration Submitted</p>
                        <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {currentStatus !== "pending" && (
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Initial Review Completed</p>
                          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {(currentStatus === "compliance" || currentStatus === "approved") && (
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Payment Confirmed</p>
                          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {currentStatus === "approved" && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Compliance Check Completed</p>
                            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Final Approval Granted</p>
                            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
                      <Bell className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">Your registration is under review</p>
                        <p className="text-xs text-gray-500">Today</p>
                      </div>
                    </div>

                    {currentStatus !== "pending" && (
                      <div className="flex items-start gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
                        <Bell className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">Initial review completed</p>
                          <p className="text-xs text-gray-500">Today</p>
                        </div>
                      </div>
                    )}

                    {currentStatus === "payment" && (
                      <div className="flex items-start gap-3 bg-yellow-900/20 backdrop-blur-sm rounded-lg p-3 border border-yellow-500/30">
                        <Bell className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">Payment required</p>
                          <p className="text-xs text-gray-500">Today</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    If you have any questions about your registration status, please contact our support team.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
