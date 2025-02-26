import type React from "react"
import { ThemeProvider } from "./theme-provider"
import ClientLayout from "./ClientLayout"
import "./globals.css"

export const metadata = {
  title: "ProActiva - Sistema de Gestión Estudiantil",
  description: "Gestiona grupos de estudiantes y tareas de manera eficiente",
  manifest: "/manifest.json",
  themeColor: "#8936FF",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    apple: "/icon512_rounded.png",
    icon: [
      { url: "/icon512_rounded.png", sizes: "512x512", type: "image/png" },
      { url: "/icon512_maskable.png", sizes: "512x512", type: "image/png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ProActiva"
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
