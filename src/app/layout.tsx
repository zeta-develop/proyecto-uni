import './globals.css'
import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Sistema de Gestión Estudiantil",
  description: "Gestiona grupos de estudiantes y tareas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

