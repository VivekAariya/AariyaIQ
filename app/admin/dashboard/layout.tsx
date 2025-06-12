import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-indigo-900/5 via-purple-800/5 to-cyan-900/5 backdrop-blur-sm relative overflow-hidden border-l border-white/10">
        {/* Subtle neon border effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  )
}
