"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { EmailTemplate } from "@/components/email-templates"
import type { EmailType, EmailData } from "@/lib/email-service"

export default function EmailTemplatesPage() {
  const [selectedType, setSelectedType] = useState<EmailType>("learner-registration-received")

  // Sample data for preview
  const sampleData: Record<EmailType, EmailData> = {
    "learner-registration-received": {
      recipientName: "John Smith",
      recipientEmail: "john@example.com",
      courseName: "AI Recruitment Fundamentals",
      courseStartDate: "June 15, 2023",
      applicationDate: "May 20, 2023",
      loginLink: "https://aariyatech.co.uk/dashboard/registrations/1",
    },
    "learner-initial-approval": {
      recipientName: "John Smith",
      recipientEmail: "john@example.com",
      courseName: "AI Recruitment Fundamentals",
      courseStartDate: "June 15, 2023",
      paymentAmount: "$499",
      paymentLink: "https://aariyatech.co.uk/payment/learner/1",
      loginLink: "https://aariyatech.co.uk/dashboard/registrations/1",
    },
    "learner-payment-required": {
      recipientName: "John Smith",
      recipientEmail: "john@example.com",
      courseName: "AI Recruitment Fundamentals",
      courseStartDate: "June 15, 2023",
      paymentAmount: "$499",
      paymentLink: "https://aariyatech.co.uk/payment/learner/1",
    },
    "learner-compliance-check": {
      recipientName: "John Smith",
      recipientEmail: "john@example.com",
      courseName: "AI Recruitment Fundamentals",
      loginLink: "https://aariyatech.co.uk/dashboard/registrations/1",
    },
    "learner-final-approval": {
      recipientName: "John Smith",
      recipientEmail: "john@example.com",
      courseName: "AI Recruitment Fundamentals",
      courseStartDate: "June 15, 2023",
      loginLink: "https://aariyatech.co.uk/dashboard/courses",
      nextSteps: [
        "Log in to your dashboard to access course materials",
        "Complete your profile information",
        "Join the course orientation session",
      ],
    },
    "instructor-application-received": {
      recipientName: "Robert Johnson",
      recipientEmail: "robert@example.com",
      expertise: "Artificial Intelligence",
      applicationDate: "May 20, 2023",
      loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
    },
    "instructor-initial-approval": {
      recipientName: "Robert Johnson",
      recipientEmail: "robert@example.com",
      expertise: "Artificial Intelligence",
      paymentAmount: "$299",
      paymentLink: "https://aariyatech.co.uk/payment/instructor/1",
      loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
    },
    "instructor-payment-required": {
      recipientName: "Robert Johnson",
      recipientEmail: "robert@example.com",
      paymentAmount: "$299",
      paymentLink: "https://aariyatech.co.uk/payment/instructor/1",
    },
    "instructor-compliance-check": {
      recipientName: "Robert Johnson",
      recipientEmail: "robert@example.com",
      loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
    },
    "instructor-final-approval": {
      recipientName: "Robert Johnson",
      recipientEmail: "robert@example.com",
      loginLink: "https://aariyatech.co.uk/instructor/dashboard",
      nextSteps: [
        "Log in to your instructor dashboard",
        "Complete your instructor profile",
        "Prepare your course materials",
        "Schedule an onboarding session with our team",
      ],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
      </div>

      <Tabs defaultValue="learner">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="learner">Learner Emails</TabsTrigger>
          <TabsTrigger value="instructor">Instructor Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="learner" className="space-y-6 pt-6">
          <Card className="border border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle>Learner Email Templates</CardTitle>
              <CardDescription>Preview and manage email templates for learners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Template</label>
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as EmailType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learner-registration-received">Registration Received</SelectItem>
                      <SelectItem value="learner-initial-approval">Initial Approval</SelectItem>
                      <SelectItem value="learner-payment-required">Payment Required</SelectItem>
                      <SelectItem value="learner-compliance-check">Compliance Check</SelectItem>
                      <SelectItem value="learner-final-approval">Final Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-md p-4 bg-white">
                  <div className="text-black">
                    <EmailTemplate type={selectedType} data={sampleData[selectedType]} />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Edit Template</Button>
                  <Button>Send Test Email</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor" className="space-y-6 pt-6">
          <Card className="border border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle>Instructor Email Templates</CardTitle>
              <CardDescription>Preview and manage email templates for instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Template</label>
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as EmailType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor-application-received">Application Received</SelectItem>
                      <SelectItem value="instructor-initial-approval">Initial Approval</SelectItem>
                      <SelectItem value="instructor-payment-required">Payment Required</SelectItem>
                      <SelectItem value="instructor-compliance-check">Compliance Check</SelectItem>
                      <SelectItem value="instructor-final-approval">Final Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-md p-4 bg-white">
                  <div className="text-black">
                    <EmailTemplate type={selectedType} data={sampleData[selectedType]} />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Edit Template</Button>
                  <Button>Send Test Email</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
