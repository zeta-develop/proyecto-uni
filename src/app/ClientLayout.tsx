"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { School, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import MobileTabBar from "./components/MobileTabBar"

const menuItems = [
  { text: "Inicio", href: "/" },
  { text: "Grupos", href: "/groups" },
  { text: "Tareas", href: "/tasks" },
  { text: "Chat", href: "/chat" },
  { text: "Configuración", href: "/configuracion" },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = useCallback(() => {
    setOpen(false)
  }, [])

  // Si la ruta actual es /login, no renderizar el layout
  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <School className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">ProActiva</span>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <MobileTabBar />
    </div>
  )
}

