"use client"

import { useState, useEffect } from "react"
import {
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

interface SubTask {
  id: number
  title: string
  assignedTo: string
  isCompleted: boolean
}

interface Task {
  id: number
  title: string
  groupId: number
  dueDate: string
  subTasks: SubTask[]
  isCompleted: boolean
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

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Ensayo de Microcontroladores",
      groupId: 1,
      dueDate: "2023-06-15",
      subTasks: [
        { id: 1, title: "Investigar qué es un microcontrolador", assignedTo: "Juan Pérez", isCompleted: false },
        {
          id: 2,
          title: "Investigar para qué se usa un microcontrolador",
          assignedTo: "María García",
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ])
  const [groups] = useState<Group[]>(initialGroups)
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "subTasks" | "isCompleted">>({
    title: "",
    groupId: 0,
    dueDate: "",
  })
  const [newSubTasks, setNewSubTasks] = useState<Omit<SubTask, "id">[]>([])
  const [expandedTask, setExpandedTask] = useState<number | null>(null)

  useEffect(() => {
    if (newTask.groupId === 0 && groups.length > 0) {
      setNewTask((prev) => ({ ...prev, groupId: groups[0].id }))
    }
  }, [newTask.groupId, groups])

  const handleClickOpen = (task?: Task) => {
    if (task) {
      setEditingTask(task)
      setNewTask({ title: task.title, groupId: task.groupId, dueDate: task.dueDate })
      setNewSubTasks(task.subTasks.map(({ id, ...rest }) => rest))
    } else {
      setEditingTask(null)
      setNewTask({ title: "", groupId: groups[0]?.id || 0, dueDate: "" })
      setNewSubTasks([])
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingTask(null)
    setNewTask({ title: "", groupId: groups[0]?.id || 0, dueDate: "" })
    setNewSubTasks([])
  }

  const handleSaveTask = () => {
    if (newTask.title && newTask.groupId && newTask.dueDate) {
      if (editingTask) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...newTask,
                subTasks: newSubTasks.map((subTask, index) => ({
                  ...subTask,
                  id: index + 1,
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
        }
        setTasks([...tasks, newTaskWithSubTasks])
      }
      handleClose()
    }
  }

  const handleAddSubTask = () => {
    setNewSubTasks([...newSubTasks, { title: "", assignedTo: "", isCompleted: false }])
  }

  const handleSubTaskChange = (index: number, field: keyof SubTask, value: string | boolean) => {
    const updatedSubTasks = newSubTasks.map((subTask, i) => (i === index ? { ...subTask, [field]: value } : subTask))
    setNewSubTasks(updatedSubTasks)
  }

  const handleRemoveSubTask = (index: number) => {
    setNewSubTasks(newSubTasks.filter((_, i) => i !== index))
  }

  const handleExpandTask = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tareas</h1>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="flex items-center text-sm text-gray-600">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {groups.find((g) => g.id === task.groupId)?.name || "Grupo no encontrado"}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {task.dueDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{task.isCompleted ? "Completada" : "Pendiente"}</span>
                </label>
                <button onClick={() => handleClickOpen(task)} className="text-blue-600 hover:text-blue-800">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => handleExpandTask(task.id)} className="text-gray-600 hover:text-gray-800">
                  {expandedTask === task.id ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {expandedTask === task.id && (
              <div className="bg-gray-50 p-4 border-t">
                <h3 className="font-semibold mb-2">Subtareas:</h3>
                <ul className="space-y-2">
                  {task.subTasks.map((subTask) => (
                    <li key={subTask.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{subTask.title}</p>
                        <p className="text-sm text-gray-600">Asignado a: {subTask.assignedTo}</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={subTask.isCompleted}
                          onChange={() => handleToggleSubTaskCompletion(task.id, subTask.id)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {subTask.isCompleted ? "Completada" : "Pendiente"}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleClickOpen()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Crear Nueva Tarea
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título de la Tarea
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                      Grupo
                    </label>
                    <select
                      id="group"
                      value={newTask.groupId}
                      onChange={(e) => setNewTask({ ...newTask, groupId: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Fecha de Entrega
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Subtareas</h3>
                  {newSubTasks.map((subTask, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={subTask.title}
                        onChange={(e) => handleSubTaskChange(index, "title", e.target.value)}
                        placeholder="Título de la Subtarea"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <select
                        value={subTask.assignedTo}
                        onChange={(e) => handleSubTaskChange(index, "assignedTo", e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="">Asignar a</option>
                        {groups
                          .find((g) => g.id === newTask.groupId)
                          ?.members.map((member) => (
                            <option key={member.id} value={member.name}>
                              {member.name}
                            </option>
                          ))}
                      </select>
                      <button onClick={() => handleRemoveSubTask(index)} className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddSubTask}
                    className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Agregar Subtarea
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2 rounded-b-lg">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingTask ? "Guardar Cambios" : "Crear Tarea"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

