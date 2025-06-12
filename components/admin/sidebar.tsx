"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, LogOut, Menu, Settings, Users, X } from "lucide-react"
import { usePathname } from "next/navigation"

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-indigo-900/90 via-purple-800/90 to-cyan-800/90 backdrop-blur-lg border-r border-white/10 p-4 text-white transition-transform duration-200 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">AariyaIQ Instructor</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1">
            <Link
              href="/admin/dashboard"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/admin/dashboard" ? "bg-white/20 text-white" : "hover:bg-white/10"
              }`}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/courses"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith("/admin/dashboard/courses")
                  ? "bg-purple-600/50 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Manage Courses
            </Link>
            <Link
              href="/admin/dashboard/users"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith("/admin/dashboard/users")
                  ? "bg-purple-600/50 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Link>
            <Link
              href="/admin/dashboard/settings"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/admin/dashboard/settings" ? "bg-white/20 text-white" : "hover:bg-white/10"
              }`}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </nav>
          <div className="pt-4">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
