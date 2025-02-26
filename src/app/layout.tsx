import type React from "react"
import { ThemeProvider } from "./theme-provider"
import ClientLayout from "./ClientLayout"
import "./globals.css"

export const metadata = {
  title: "ProActiva - Sistema de Gestión Estudiantil",
  description: "Gestiona grupos de estudiantes y tareas de manera eficiente",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

