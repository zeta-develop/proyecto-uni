"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Plus, Calendar, Users, Pencil, Trash2, CheckCircle2, User, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SubTask {
  id: number
  title: string
  assignedTo: string
  isCompleted: boolean
  dueDate: string
  startTime: string
  endTime: string
}

interface Task {
  id: number
  title: string
  groupId: number | null
  dueDate: string
  subTasks: SubTask[]
  isCompleted: boolean
  isSubmitted: boolean
  assignedTo: string[]
  submittedFile?: string
}

interface GroupMember {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
  members: GroupMember[]
}

const initialGroups: Group[] = [
  {
    id: 1,
    name: "Grupo A",
    members: [
      { id: 1, name: "Juan Pérez" },
      { id: 2, name: "María García" },
      { id: 3, name: "Carlos López" },
    ],
  },
  {
    id: 2,
    name: "Grupo B",
    members: [
      { id: 4, name: "Ana Martínez" },
      { id: 5, name: "Pedro Rodríguez" },
    ],
  },
]

// Simulamos un usuario actual
const currentUser = { id: 1, name: "Juan Pérez" }

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Ensayo de Microcontroladores",
      groupId: 1,
      dueDate: "2023-06-15",
      subTasks: [
        {
          id: 1,
          title: "Investigar qué es un microcontrolador",
          assignedTo: "Juan Pérez",
          isCompleted: false,
          dueDate: "2023-06-10",
          startTime: "08:00",
          endTime: "10:00",
        },
        {
          id: 2,
          title: "Investigar para qué se usa un microcontrolador",
          assignedTo: "María García",
          isCompleted: false,
          dueDate: "2023-06-12",
          startTime: "14:00",
          endTime: "16:00",
        },
      ],
      isCompleted: false,
      isSubmitted: false,
      assignedTo: ["Juan Pérez", "María García", "Carlos López"],
    },
    {
      id: 2,
      title: "Reporte Individual de Lectura",
      groupId: null,
      dueDate: "2023-06-20",
      subTasks: [],
      isCompleted: false,
      isSubmitted: false,
      assignedTo: ["Juan Pérez"],
    },
  ])
  const [groups] = useState<Group[]>(initialGroups)
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "subTasks" | "isCompleted" | "isSubmitted">>({
    title: "",
    groupId: null,
    dueDate: "",
    assignedTo: [],
  })
  const [newSubTasks, setNewSubTasks] = useState<Omit<SubTask, "id">[]>([])

  const [editingSubTask, setEditingSubTask] = useState<{ taskId: number; subTaskId: number } | null>(null)
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
  const [submittingTaskId, setSubmittingTaskId] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (newTask.groupId === 0 && groups.length > 0) {
      setNewTask((prev) => ({ ...prev, groupId: groups[0].id }))
    }
  }, [newTask.groupId, groups])

  const handleClickOpen = (task?: Task) => {
    if (task) {
      setEditingTask(task)
      setNewTask({ title: task.title, groupId: task.groupId, dueDate: task.dueDate, assignedTo: task.assignedTo })
      setNewSubTasks(task.subTasks.map(({ id, ...rest }) => rest))
    } else {
      setEditingTask(null)
      setNewTask({ title: "", groupId: null, dueDate: "", assignedTo: [] })
      setNewSubTasks([])
    }
    setOpen(true)
  }

  const handleEditSubTask = (taskId: number, subTaskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    const subTask = task?.subTasks.find((st) => st.id === subTaskId)
    if (task && subTask) {
      setEditingTask(task)
      setNewTask({ title: task.title, groupId: task.groupId, dueDate: task.dueDate, assignedTo: task.assignedTo })
      setNewSubTasks(task.subTasks.map((st) => ({ ...st, id: st.id })))
      setEditingSubTask({ taskId, subTaskId })
      setOpen(true)
    }
  }

  const handleSaveTask = () => {
    if (newTask.title && newTask.dueDate) {
      if (editingTask) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...newTask,
                subTasks: newSubTasks.map((subTask) => ({
                  ...subTask,
                  id: subTask.id || task.subTasks.length + 1,
                  isCompleted: subTask.isCompleted || false,
                })),
              }
            : task,
        )
        setTasks(updatedTasks)
      } else {
        const newTaskWithSubTasks: Task = {
          ...newTask,
          id: tasks.length + 1,
          subTasks: newSubTasks.map((subTask, index) => ({ ...subTask, id: index + 1, isCompleted: false })),
          isCompleted: false,
          isSubmitted: false,
        }
        setTasks([...tasks, newTaskWithSubTasks])
      }
      handleClose()
    }
  }

  const handleAddSubTask = () => {
    setNewSubTasks([
      ...newSubTasks,
      {
        title: "",
        assignedTo: "",
        isCompleted: false,
        dueDate: "",
        startTime: "",
        endTime: "",
      },
    ])
  }

  const handleSubTaskChange = (index: number, field: keyof SubTask, value: string | boolean) => {
    const updatedSubTasks = newSubTasks.map((subTask, i) => (i === index ? { ...subTask, [field]: value } : subTask))
    setNewSubTasks(updatedSubTasks)
  }

  const handleRemoveSubTask = (index: number) => {
    setNewSubTasks(newSubTasks.filter((_, i) => i !== index))
  }

  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task)))
  }

  const handleToggleSubTaskCompletion = (taskId: number, subTaskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubTasks = task.subTasks.map((subTask) =>
            subTask.id === subTaskId ? { ...subTask, isCompleted: !subTask.isCompleted } : subTask,
          )
          return { ...task, subTasks: updatedSubTasks }
        }
        return task
      }),
    )
  }

  const handleSubmitTask = (taskId: number) => {
    setSubmittingTaskId(taskId)
    setSubmitDialogOpen(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && submittingTaskId) {
      // Aquí normalmente enviarías el archivo a tu servidor
      // Por ahora, solo actualizaremos el estado local
      setTasks(
        tasks.map((task) =>
          task.id === submittingTaskId ? { ...task, isSubmitted: true, submittedFile: file.name } : task,
        ),
      )
      setSubmitDialogOpen(false)
      setSubmittingTaskId(null)
    }
  }

  const getTaskProgress = (task: Task) => {
    if (task.subTasks.length === 0) return task.isCompleted ? 100 : 0
    const completedSubTasks = task.subTasks.filter((st) => st.isCompleted).length
    return (completedSubTasks / task.subTasks.length) * 100
  }

  const handleClose = () => {
    setOpen(false)
    setEditingTask(null)
    setEditingSubTask(null)
    setNewTask({ title: "", groupId: null, dueDate: "", assignedTo: [] })
    setNewSubTasks([])
  }

  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl">{task.title}</CardTitle>
          <Checkbox checked={task.isCompleted} onCheckedChange={() => handleToggleTaskCompletion(task.id)} />
        </div>
        <CardDescription>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {task.groupId ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
            <span>{task.groupId ? groups.find((g) => g.id === task.groupId)?.name : "Individual"}</span>
            <Calendar className="h-4 w-4" />
            <span>{task.dueDate}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={getTaskProgress(task)} className="mb-2" />
        {task.subTasks.length > 0 && (
          <Accordion type="single" collapsible className="w-full mb-2">
            <AccordionItem value={`task-${task.id}`}>
              <AccordionTrigger>Ver Subtareas</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {task.subTasks.map((subTask) => (
                    <li key={subTask.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <div className="flex items-center space-x-2 flex-grow">
                        <Checkbox
                          checked={subTask.isCompleted}
                          onCheckedChange={() => handleToggleSubTaskCompletion(task.id, subTask.id)}
                        />
                        <span className={`${subTask.isCompleted ? "line-through" : ""} text-sm`}>{subTask.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground">{subTask.dueDate}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleEditSubTask(task.id, subTask.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className="flex justify-between items-center mt-2">
          <Button variant="outline" size="sm" onClick={() => handleClickOpen(task)}>
            <Pencil className="h-4 w-4 mr-2" /> Editar
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleSubmitTask(task.id)}
            disabled={task.isSubmitted || !task.isCompleted}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {task.isSubmitted ? "Entregada" : "Entregar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const groupTasks = tasks.filter((task) => task.groupId !== null)
  const individualTasks = tasks.filter((task) => task.groupId === null)
  const assignedTasks = tasks.filter((task) => task.assignedTo.includes(currentUser.name))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-primary">Tareas</h1>

      <Tabs defaultValue="assigned" className="mb-2">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="assigned">Asignadas</TabsTrigger>
          <TabsTrigger value="group">Grupales</TabsTrigger>
          <TabsTrigger value="individual">Individuales</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {assignedTasks.map(renderTaskCard)}
          </div>
        </TabsContent>
        <TabsContent value="group">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {groupTasks.map(renderTaskCard)}
          </div>
        </TabsContent>
        <TabsContent value="individual">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {individualTasks.map(renderTaskCard)}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => handleClickOpen()}
            className="fixed bottom-20 right-4 z-40 shadow-lg md:static md:mt-6"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Nueva Tarea
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Tipo
              </Label>
              <Select
                value={newTask.groupId ? "group" : "individual"}
                onValueChange={(value) => setNewTask({ ...newTask, groupId: value === "group" ? groups[0]?.id : null })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona el tipo de tarea" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group">Grupal</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newTask.groupId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="group" className="text-right">
                  Grupo
                </Label>
                <Select
                  value={newTask.groupId.toString()}
                  onValueChange={(value) => setNewTask({ ...newTask, groupId: Number(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Fecha de Entrega
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2 max-h-[40vh] overflow-y-auto">
              <Label>Subtareas</Label>
              {newSubTasks.map((subTask, index) => (
                <div key={index} className="space-y-2 p-4 bg-muted rounded-md">
                  <Input
                    placeholder="Título de la Subtarea"
                    value={subTask.title}
                    onChange={(e) => handleSubTaskChange(index, "title", e.target.value)}
                  />
                  <Select
                    value={subTask.assignedTo}
                    onValueChange={(value) => handleSubTaskChange(index, "assignedTo", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar a" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTask.groupId
                        ? groups
                            .find((g) => g.id === newTask.groupId)
                            ?.members.map((member) => (
                              <SelectItem key={member.id} value={member.name}>
                                {member.name}
                              </SelectItem>
                            ))
                        : [currentUser].map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="date"
                      value={subTask.dueDate}
                      onChange={(e) => handleSubTaskChange(index, "dueDate", e.target.value)}
                    />
                    <Input
                      type="time"
                      value={subTask.startTime}
                      onChange={(e) => handleSubTaskChange(index, "startTime", e.target.value)}
                    />
                    <Input
                      type="time"
                      value={subTask.endTime}
                      onChange={(e) => handleSubTaskChange(index, "endTime", e.target.value)}
                    />
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleRemoveSubTask(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={handleAddSubTask} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Agregar Subtarea
            </Button>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTask}>{editingTask ? "Guardar Cambios" : "Crear Tarea"}</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Entregar Tarea</DialogTitle>
            <DialogDescription>
              Por favor, sube un archivo PDF, Word o PowerPoint para entregar tu tarea.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskFile" className="text-right">
                Archivo
              </Label>
              <Input
                id="taskFile"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Subir y Entregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

