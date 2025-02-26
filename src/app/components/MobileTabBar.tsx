"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, CheckSquare, MessageSquare, Settings } from "lucide-react"

const navItems = [
  { label: "Inicio", icon: Home, href: "/" },
  { label: "Grupos", icon: Users, href: "/groups" },
  { label: "Tareas", icon: CheckSquare, href: "/tasks" },
  { label: "Chat", icon: MessageSquare, href: "/chat" },
  { label: "Config", icon: Settings, href: "/configuracion" },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              } hover:text-primary transition-colors`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

