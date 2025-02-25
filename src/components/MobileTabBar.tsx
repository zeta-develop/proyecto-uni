"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline"

const navItems = [
  { label: "Inicio", icon: HomeIcon, href: "/" },
  { label: "Grupos", icon: UserGroupIcon, href: "/groups" },
  { label: "Tareas", icon: ClipboardDocumentListIcon, href: "/tasks" },
  { label: "Chat", icon: ChatBubbleLeftRightIcon, href: "/chat" },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

