import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { courses } from "@/lib/courses"

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id) || courses[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Edit the basic information for this course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course-id">Course ID</Label>
              <Input id="course-id" value={course.id} readOnly />
              <p className="text-xs text-muted-foreground">
                This is the unique identifier for the course and cannot be changed
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" defaultValue={course.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Textarea id="short-description" defaultValue={course.shortDescription} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full-description">Full Description</Label>
              <Textarea id="full-description" defaultValue={course.fullDescription} rows={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" defaultValue={course.instructor} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" defaultValue={course.duration} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <select
                  id="level"
                  defaultValue={course.level}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Media & Schedule</CardTitle>
            <CardDescription>Update the course image and schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Course Image URL</Label>
              <Input id="image" defaultValue={course.image} />
              <p className="text-xs text-muted-foreground">Enter a URL for the course image or upload a new one</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                defaultValue={new Date(course.startDate).toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="external-link">External Learning Platform Link</Label>
              <Input id="external-link" defaultValue={course.externalLink} />
              <p className="text-xs text-muted-foreground">Link to Google Classroom, Microsoft Teams, or Zoom</p>
            </div>
            <div className="pt-4">
              <Button variant="destructive" className="w-full">
                Delete Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
