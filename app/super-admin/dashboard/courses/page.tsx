import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // Dummy course data
  const courses = [
    {
      id: "course-1",
      title: "Introduction to Web Development",
      category: "Development",
      status: "Published",
      enrollments: 245,
      instructor: "Dr. Sarah Johnson",
      lastUpdated: "2023-05-15",
    },
    {
      id: "course-2",
      title: "Advanced React Patterns",
      category: "Development",
      status: "Published",
      enrollments: 189,
      instructor: "Michael Chen",
      lastUpdated: "2023-06-22",
    },
    {
      id: "course-3",
      title: "Data Science Fundamentals",
      category: "Data Science",
      status: "Draft",
      enrollments: 0,
      instructor: "Dr. Emily Rodriguez",
      lastUpdated: "2023-07-10",
    },
    {
      id: "course-4",
      title: "UX/UI Design Principles",
      category: "Design",
      status: "Published",
      enrollments: 312,
      instructor: "Alex Thompson",
      lastUpdated: "2023-04-30",
    },
    {
      id: "course-5",
      title: "Cloud Computing with AWS",
      category: "Cloud",
      status: "Published",
      enrollments: 178,
      instructor: "James Wilson",
      lastUpdated: "2023-06-05",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your platform courses, edit content, and track enrollments.</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input type="text" placeholder="Search courses..." className="flex-1" />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Link href={`/super-admin/dashboard/courses/${course.id}`} className="hover:underline">
                      {course.title}
                    </Link>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>{course.status}</Badge>
                  </TableCell>
                  <TableCell>{course.enrollments}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.lastUpdated}</TableCell>
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
