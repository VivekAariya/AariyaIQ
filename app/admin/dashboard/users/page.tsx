import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function UsersPage() {
  const users = [
    { id: "1", name: "Alice Cooper", email: "alice@example.com", signupDate: "2023-04-15", status: "Active" },
    { id: "2", name: "Bob Dylan", email: "bob@example.com", signupDate: "2023-04-14", status: "Active" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", signupDate: "2023-04-12", status: "Inactive" },
    { id: "4", name: "David Bowie", email: "david@example.com", signupDate: "2023-04-10", status: "Active" },
    { id: "5", name: "Eva Green", email: "eva@example.com", signupDate: "2023-04-08", status: "Active" },
    { id: "6", name: "Frank Sinatra", email: "frank@example.com", signupDate: "2023-04-05", status: "Inactive" },
    { id: "7", name: "Grace Kelly", email: "grace@example.com", signupDate: "2023-04-03", status: "Active" },
    { id: "8", name: "Harry Potter", email: "harry@example.com", signupDate: "2023-04-01", status: "Active" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Learners</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search learners..." className="w-full pl-8" />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">Add Learner</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 font-medium">
          <div>Name</div>
          <div>Email</div>
          <div>Signup Date</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-5 gap-4 border-t p-4">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{new Date(user.signupDate).toLocaleDateString()}</div>
            <div>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  user.status === "Active" ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"
                }
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>8</strong> of <strong>8</strong> results
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
