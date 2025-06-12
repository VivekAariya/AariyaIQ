import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { courses } from "@/lib/courses"

export default function SuperAdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your entire learning platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Excellent</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Instructors</h2>
            <Link href="/super-admin/dashboard/admins/new">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">Add Instructor</Button>
            </Link>
          </div>
          <div className="mt-4 rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-5">Email</div>
              <div className="col-span-4">Actions</div>
            </div>
            {[
              { id: "1", name: "John Doe", email: "john@aariyatech.com" },
              { id: "2", name: "Jane Smith", email: "jane@aariyatech.com" },
              { id: "3", name: "Robert Johnson", email: "robert@aariyatech.com" },
            ].map((instructor) => (
              <div key={instructor.id} className="grid grid-cols-12 gap-2 border-t p-4 items-center">
                <div className="col-span-3 truncate">{instructor.name}</div>
                <div className="col-span-5 truncate">{instructor.email}</div>
                <div className="col-span-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Recent Learners</h2>
            <Link href="/super-admin/dashboard/users">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="mt-4 rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Joined</div>
              <div className="col-span-4">Status</div>
            </div>
            {[
              { id: "1", name: "Alice Cooper", joined: "2023-04-15", status: "Active" },
              { id: "2", name: "Bob Dylan", joined: "2023-04-14", status: "Active" },
              { id: "3", name: "Charlie Brown", joined: "2023-04-12", status: "Inactive" },
              { id: "4", name: "David Bowie", joined: "2023-04-10", status: "Active" },
            ].map((learner) => (
              <div key={learner.id} className="grid grid-cols-12 gap-2 border-t p-4 items-center">
                <div className="col-span-4 truncate">{learner.name}</div>
                <div className="col-span-4 truncate">{new Date(learner.joined).toLocaleDateString()}</div>
                <div className="col-span-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      learner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {learner.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
