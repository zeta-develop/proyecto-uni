"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Users, LogIn, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

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

// Function to generate a random code in XXXX-XXXX format
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
  const [newGroupName, setNewGroupName] = useState("")
  const [joinGroupCode, setJoinGroupCode] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const router = useRouter()

  const handleCreateGroup = () => {
    if (newGroupName) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: newGroupName,
        code: generateRandomCode(),
        members: [],
      }
      setGroups([...groups, newGroup])
      setNewGroupName("")
      setIsCreateDialogOpen(false)
      toast({
        title: "Grupo creado",
        description: `El grupo "${newGroup.name}" ha sido creado exitosamente.`,
      })
    }
  }

  const handleJoinGroup = () => {
    const group = groups.find((g) => g.code === joinGroupCode)
    if (group) {
      // Here you would typically add the current user to the group
      toast({
        title: "Grupo unido",
        description: `Te has unido al grupo "${group.name}" exitosamente.`,
      })
    } else {
      toast({
        title: "Error",
        description: "No se encontró ningún grupo con ese código.",
        variant: "destructive",
      })
    }
    setJoinGroupCode("")
    setIsJoinDialogOpen(false)
  }

  const handleEnterGroup = (groupId: number) => {
    // Here you would typically navigate to the group's page
    router.push(`/chat?groupId=${groupId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Grupos de Estudiantes</h1>
        <div className="flex gap-2">
          {/* Mobile view: Actions dropdown */}
          <div className="sm:hidden flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Acciones
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Crear Grupo</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsJoinDialogOpen(true)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Unirse a Grupo</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop view: Regular buttons */}
          <div className="hidden sm:flex sm:gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Grupo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Grupo</DialogTitle>
                  <DialogDescription>
                    Ingresa el nombre para tu nuevo grupo. Se generará un código único automáticamente.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateGroup}>Crear Grupo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <LogIn className="mr-2 h-4 w-4" />
                  Unirse a Grupo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Unirse a un Grupo</DialogTitle>
                  <DialogDescription>Ingresa el código del grupo al que deseas unirte.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Código
                    </Label>
                    <Input
                      id="code"
                      value={joinGroupCode}
                      onChange={(e) => setJoinGroupCode(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleJoinGroup}>Unirse al Grupo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {group.name}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones de Grupo</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEnterGroup(group.id)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Entrar al Grupo</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar Grupo</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Eliminar Grupo</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardDescription>Código: {group.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <Label>Miembros:</Label>
              <ScrollArea className="h-[100px] w-full rounded-md border p-4 mt-2">
                {group.members.map((member) => (
                  <div key={member.id} className="text-sm">
                    {member.name}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleEnterGroup(group.id)}>
                <Users className="mr-2 h-4 w-4" />
                Entrar al Grupo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

