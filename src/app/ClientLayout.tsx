"use client"

import type React from "react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material"
import Link from "next/link"
import { School, Group, Assignment, Menu } from "@mui/icons-material"
import { useState } from "react"
import MobileTabBar from "../components/MobileTabBar"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const menuItems = [
    { text: "Inicio", icon: <School />, href: "/" },
    { text: "Grupos", icon: <Group />, href: "/groups" },
    { text: "Tareas", icon: <Assignment />, href: "/tasks" },
  ]

  return (
    <html lang="es">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                  {!isMobile && (
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer(true)}
                      sx={{ mr: 2 }}
                    >
                      <Menu />
                    </IconButton>
                  )}
                  <School sx={{ mr: 2 }} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SGE
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item.text} component={Link} href={item.href}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
              <Container component="main" sx={{ mt: 4, mb: isMobile ? 7 : 4, flexGrow: 1 }}>
                <Box sx={{ backgroundColor: "background.paper", p: { xs: 2, sm: 3 }, borderRadius: 2 }}>{children}</Box>
              </Container>
              {isMobile && <MobileTabBar />}
              {!isMobile && (
                <Box component="footer" sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "background.paper" }}>
                  <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                      © {new Date().getFullYear()} SGE
                    </Typography>
                  </Container>
                </Box>
              )}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

