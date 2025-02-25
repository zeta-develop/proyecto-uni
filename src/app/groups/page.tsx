"use client"

import { useState } from "react"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  Collapse,
  IconButton,
  Chip,
} from "@mui/material"
import { Add, ExpandMore, ExpandLess, Login } from "@mui/icons-material"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
  code: string
  members: User[]
}

// Función para generar un código aleatorio en formato XXXX-XXXX
const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const getRandomChars = (length: number) =>
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `${getRandomChars(4)}-${getRandomChars(4)}`
}

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Grupo A",
      code: "ABCD-1234",
      members: [
        { id: 1, name: "Juan Pérez" },
        { id: 2, name: "María García" },
      ],
    },
    {
      id: 2,
      name: "Grupo B",
      code: "EFGH-5678",
      members: [
        { id: 3, name: "Carlos López" },
        { id: 4, name: "Ana Martínez" },
      ],
    },
  ])
  const [open, setOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null)
  const [joinGroupCode, setJoinGroupCode] = useState("")
  const [openJoinDialog, setOpenJoinDialog] = useState(false)
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddGroup = () => {
    if (newGroupName) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: newGroupName,
        code: generateRandomCode(),
        members: [],
      }
      setGroups([...groups, newGroup])
      setNewGroupName("")
      handleClose()
    }
  }

  const handleExpandGroup = (groupId: number) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId)
  }

  const handleJoinGroup = () => {
    // Aquí iría la lógica para unirse a un grupo
    console.log("Intentando unirse al grupo con código:", joinGroupCode)
    setOpenJoinDialog(false)
    setJoinGroupCode("")
  }

  const handleEnterGroup = (groupId: number) => {
    // Aquí iría la lógica para entrar en un grupo
    console.log("Entrando al grupo:", groupId)
    router.push(`/chat?groupId=${groupId}`)
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
        Grupos de Estudiantes
      </Typography>

      <List>
        {groups.map((group) => (
          <Paper key={group.id} elevation={2} sx={{ mb: 2, overflow: "hidden" }}>
            <ListItem
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleExpandGroup(group.id)}>
                    {expandedGroup === group.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Login />}
                    onClick={() => handleEnterGroup(group.id)}
                    sx={{ ml: 1 }}
                  >
                    Entrar
                  </Button>
                </Box>
              }
            >
              <ListItemText primary={group.name} secondary={`Código: ${group.code}`} />
            </ListItem>
            <Collapse in={expandedGroup === group.id} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2, pl: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Miembros:
                </Typography>
                {group.members.map((member) => (
                  <Chip key={member.id} label={member.name} sx={{ mr: 1, mb: 1 }} />
                ))}
                {group.members.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No hay miembros en este grupo.
                  </Typography>
                )}
              </Box>
            </Collapse>
          </Paper>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<Add />} sx={{ mt: 2, mr: 2 }}>
        Crear Nuevo Grupo
      </Button>

      <Button variant="outlined" color="primary" onClick={() => setOpenJoinDialog(true)} sx={{ mt: 2 }}>
        Unirse a un Grupo
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Nuevo Grupo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del Grupo"
            type="text"
            fullWidth
            variant="outlined"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddGroup} variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoinDialog} onClose={() => setOpenJoinDialog(false)}>
        <DialogTitle>Unirse a un Grupo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Código del Grupo"
            type="text"
            fullWidth
            variant="outlined"
            value={joinGroupCode}
            onChange={(e) => setJoinGroupCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJoinDialog(false)}>Cancelar</Button>
          <Button onClick={handleJoinGroup} variant="contained" color="primary">
            Unirse
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

