"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { courses } from "@/lib/courses"
import { RegistrationStatusIndicator } from "@/components/registration-status-indicator"

// Import the email action at the top of the file
import { sendLearnerRegistrationEmail } from "@/app/actions/email-actions"

export default function CourseRegistrationPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const course = courses.find((c) => c.id === params.courseId)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
              <Button onClick={() => router.push("/learnings")}>Back to Courses</Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // Update the handleSubmit function to send an email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const fullName = `${firstName} ${lastName}`

    try {
      // Simulate API call to save registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Send confirmation email
      await sendLearnerRegistrationEmail({
        learnerName: fullName,
        learnerEmail: email,
        courseName: course.title,
        courseStartDate: new Date(course.startDate).toLocaleDateString(),
        applicationDate: new Date().toLocaleDateString(),
        loginLink: `https://aariyatech.co.uk/dashboard/registrations/${params.courseId}`,
      })

      setIsSubmitting(false)
      toast({
        title: "Registration Submitted",
        description: "Your registration has been submitted and is pending approval. Check your email for confirmation.",
      })
      router.push(`/dashboard/registrations/${params.courseId}`)
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Registration Error",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Course Registration</h1>
                <p className="text-muted-foreground">Complete the form below to register for this course</p>
              </div>

              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input id="company" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select defaultValue="beginner">
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goals">Learning Goals</Label>
                        <Textarea id="goals" placeholder="What do you hope to achieve from this course?" rows={3} />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" required />
                        <Label
                          htmlFor="terms"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions and understand that my registration is subject to approval
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <p className="text-sm text-muted-foreground">{new Date(course.startDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/20 dark:border-white/10">
                <CardHeader>
                  <CardTitle>Registration Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <RegistrationStatusIndicator
                    steps={[
                      { id: 1, name: "Submit Registration", status: "upcoming" },
                      { id: 2, name: "Initial Review", status: "upcoming" },
                      { id: 3, name: "Payment", status: "upcoming" },
                      { id: 4, name: "Compliance Check", status: "upcoming" },
                      { id: 5, name: "Final Approval", status: "upcoming" },
                    ]}
                  />
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
