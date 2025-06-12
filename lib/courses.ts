import type { Course } from "./types"

// Helper function to create dates relative to current date
const futureDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export const courses: Course[] = [
  {
    id: "1",
    title: "AI Recruitment Fundamentals",
    shortDescription: "Master AI-driven recruitment strategies and tools",
    fullDescription:
      "This comprehensive course covers the fundamentals of AI in recruitment, including resume screening, candidate matching, interview scheduling, and bias mitigation. Learn how to leverage AI tools to streamline your recruitment process and find the best candidates.",
    image: "/ai-recruitment-interface.png",
    startDate: futureDate(7), // Starting in 7 days
    instructor: "Dr. Sarah Johnson",
    duration: "6 weeks",
    level: "Intermediate",
    externalLink: "https://classroom.google.com/c/example1",
  },
  {
    id: "2",
    title: "MERN Stack Fundamentals",
    shortDescription: "Build full-stack applications with MongoDB, Express, React, and Node.js",
    fullDescription:
      "Learn to build modern web applications using the MERN stack. This course covers MongoDB for database management, Express.js for backend development, React for frontend interfaces, and Node.js for server-side JavaScript. By the end, you'll be able to create complete web applications from scratch.",
    image: "/mern-stack-workflow.png",
    startDate: futureDate(14), // Starting in 14 days
    instructor: "Alex Rodriguez",
    duration: "8 weeks",
    level: "Intermediate",
    externalLink: "https://teams.microsoft.com/l/meetup-join/example2",
  },
  {
    id: "3",
    title: "Data Science Essentials",
    shortDescription: "Learn data analysis, visualization, and machine learning fundamentals",
    fullDescription:
      "This course provides a solid foundation in data science concepts and techniques. You'll learn data cleaning, exploratory data analysis, data visualization, statistical analysis, and machine learning algorithms. Practical exercises will help you apply these skills to real-world datasets.",
    image: "/data-insights-flow.png",
    startDate: futureDate(21), // Starting in 21 days
    instructor: "Dr. Michael Chen",
    duration: "10 weeks",
    level: "Beginner",
    externalLink: "https://zoom.us/j/example3",
  },
  {
    id: "4",
    title: "Cloud Computing Fundamentals",
    shortDescription: "Master essential cloud services and deployment strategies",
    fullDescription:
      "Explore the fundamentals of cloud computing with a focus on major platforms like AWS, Azure, and Google Cloud. Learn about infrastructure as a service, platform as a service, and software as a service models. Gain hands-on experience deploying applications to the cloud.",
    image: "/interconnected-digital-world.png",
    startDate: futureDate(30), // Starting in 30 days
    instructor: "James Wilson",
    duration: "6 weeks",
    level: "Beginner",
    externalLink: "https://classroom.google.com/c/example4",
  },
  {
    id: "5",
    title: "DevOps Engineering",
    shortDescription: "Implement CI/CD pipelines and automate deployment workflows",
    fullDescription:
      "This course covers the principles and practices of DevOps engineering. Learn to implement continuous integration and continuous deployment pipelines, automate testing, and manage infrastructure as code. Gain experience with tools like Docker, Kubernetes, Jenkins, and Terraform.",
    image: "/interconnected-devops.png",
    startDate: futureDate(45), // Starting in 45 days
    instructor: "Emily Parker",
    duration: "8 weeks",
    level: "Advanced",
    externalLink: "https://teams.microsoft.com/l/meetup-join/example5",
  },
  {
    id: "6",
    title: "UX/UI Design Principles",
    shortDescription: "Create user-centered designs with modern design tools",
    fullDescription:
      "Learn the principles of user experience and user interface design. This course covers user research, wireframing, prototyping, and usability testing. You'll gain hands-on experience with design tools like Figma and learn to create intuitive, accessible, and visually appealing interfaces.",
    image: "/modern-ux-ui-workspace.png",
    startDate: futureDate(60), // Starting in 60 days
    instructor: "Sophia Lee",
    duration: "7 weeks",
    level: "Beginner",
    externalLink: "https://zoom.us/j/example6",
  },
]
