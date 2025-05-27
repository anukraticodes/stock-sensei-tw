"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, LayoutDashboard, TrendingUp, BookOpen, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio Builder", href: "/portfolio", icon: TrendingUp },
  { name: "Learning Guide", href: "/learning", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <Clock className="h-6 w-6" />
        <span className="text-lg font-semibold">Investment Guide</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors w-full">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  )
}
