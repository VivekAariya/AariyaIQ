export interface Course {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  startDate: string
  instructor: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  externalLink?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "superadmin"
  createdAt: string
}
