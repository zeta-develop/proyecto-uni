import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./theme-provider"
import ClientLayout from "./ClientLayout"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ProActiva - Sistema de Gestión Estudiantil",
  description: "Gestiona grupos de estudiantes y tareas de manera eficiente",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: [
      { url: "/icon512_maskable.png", sizes: "512x512", type: "image/png" },
      { url: "/icon512_rounded.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ProActiva"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}