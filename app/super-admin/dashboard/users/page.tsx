import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function LearnersPage() {
  // Dummy learner data
  const learners = [
    {
      id: "learner-1",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      enrolledCourses: 3,
      joinDate: "2023-01-15",
      lastActive: "2023-07-28",
    },
    {
      id: "learner-2",
      name: "Emma Johnson",
      email: "emma.j@example.com",
      status: "Active",
      enrolledCourses: 5,
      joinDate: "2023-02-22",
      lastActive: "2023-07-30",
    },
    {
      id: "learner-3",
      name: "Michael Brown",
      email: "m.brown@example.com",
      status: "Inactive",
      enrolledCourses: 1,
      joinDate: "2023-03-10",
      lastActive: "2023-05-15",
    },
    {
      id: "learner-4",
      name: "Sophia Garcia",
      email: "sophia.g@example.com",
      status: "Pending",
      enrolledCourses: 0,
      joinDate: "2023-07-25",
      lastActive: "2023-07-25",
    },
    {
      id: "learner-5",
      name: "William Chen",
      email: "w.chen@example.com",
      status: "Active",
      enrolledCourses: 2,
      joinDate: "2023-04-05",
      lastActive: "2023-07-29",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Learners</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Learner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Learners</CardTitle>
          <CardDescription>Manage learner accounts, track course enrollments, and monitor activity.</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input type="text" placeholder="Search learners..." className="flex-1" />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell className="font-medium">
                    <Link href={`/super-admin/dashboard/users/${learner.id}`} className="hover:underline">
                      {learner.name}
                    </Link>
                  </TableCell>
                  <TableCell>{learner.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        learner.status === "Active"
                          ? "default"
                          : learner.status === "Inactive"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {learner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{learner.enrolledCourses}</TableCell>
                  <TableCell>{learner.joinDate}</TableCell>
                  <TableCell>{learner.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
