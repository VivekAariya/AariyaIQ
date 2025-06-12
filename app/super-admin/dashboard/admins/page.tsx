import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function InstructorsPage() {
  const instructors = [
    { id: "1", name: "John Doe", email: "john@aariyatech.com", role: "Course Instructor", lastLogin: "2023-04-15" },
    { id: "2", name: "Jane Smith", email: "jane@aariyatech.com", role: "Course Instructor", lastLogin: "2023-04-14" },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@aariyatech.com",
      role: "Course Instructor",
      lastLogin: "2023-04-12",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@aariyatech.com",
      role: "Course Instructor",
      lastLogin: "2023-04-10",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@aariyatech.com",
      role: "Course Instructor",
      lastLogin: "2023-04-08",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Instructors</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search instructors..." className="w-full pl-8" />
        </div>
        <div className="flex space-x-2">
          <Button variant="admin" asChild>
            <Link href="/super-admin/dashboard/admins/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Instructor
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-white/20 bg-black/90 backdrop-blur-none overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 font-medium">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Last Login</div>
          <div>Actions</div>
        </div>
        {instructors.map((instructor) => (
          <div key={instructor.id} className="grid grid-cols-5 gap-4 border-t p-4">
            <div className="truncate">{instructor.name}</div>
            <div className="truncate">{instructor.email}</div>
            <div className="truncate">{instructor.role}</div>
            <div className="truncate">{new Date(instructor.lastLogin).toLocaleDateString()}</div>
            <div className="flex flex-wrap gap-1">
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link href={`/super-admin/dashboard/admins/${instructor.id}`}>Edit</Link>
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 text-xs">
                Remove
              </Button>
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                Reset Password
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
