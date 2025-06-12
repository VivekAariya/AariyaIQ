import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, User, FileText, Settings } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Learner Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your learning journey!</p>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-white/20 dark:border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Access your enrolled courses</p>
            <Button variant="learner" className="w-full" asChild>
              <Link href="/dashboard/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                View Courses
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-white/20 dark:border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Update your personal information</p>
            <Button variant="learner" className="w-full" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-white/20 dark:border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Check your application progress</p>
            <Button variant="learner" className="w-full" asChild>
              <Link href="/dashboard/learner-application">
                <FileText className="mr-2 h-4 w-4" />
                View Status
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-white/20 dark:border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage your account settings</p>
            <Button variant="learner" className="w-full" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Manage Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="border border-white/20 dark:border-white/10">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 rounded-md bg-black/40">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                <span>Completed Module 1 in AI Fundamentals</span>
              </div>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-black/40">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <span>Started Module 2 in AI Fundamentals</span>
              </div>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-black/40">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                <span>Enrolled in MERN Stack Development</span>
              </div>
              <span className="text-sm text-muted-foreground">Yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
