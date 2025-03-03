import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/app/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ProActiva - Sistema de Gestión Estudiantil",
  description: "Gestiona grupos de estudiantes y tareas de manera eficiente",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
