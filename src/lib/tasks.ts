interface Task {
  id: number
  title: string
  assignedTo: string
  dueDate: string
}

const groupTasks: Task[] = [
  { id: 1, title: "Proyecto de Ciencias", assignedTo: "Grupo A", dueDate: "2023-06-15" },
  { id: 2, title: "Presentación de Historia", assignedTo: "Grupo B", dueDate: "2023-06-20" },
  { id: 3, title: "Experimento de Química", assignedTo: "Grupo A", dueDate: "2023-06-25" },
]

const personalTasks: Task[] = [
  { id: 4, title: "Ensayo de Literatura", assignedTo: "Juan Pérez", dueDate: "2023-06-10" },
  { id: 5, title: "Ejercicios de Matemáticas", assignedTo: "María García", dueDate: "2023-06-12" },
  { id: 6, title: "Reporte de Lectura", assignedTo: "Juan Pérez", dueDate: "2023-06-18" },
]

export function getGroupTasks(): Task[] {
  // In a real application, this would fetch data from an API or database
  return groupTasks
}

export function getPersonalTasks(): Task[] {
  // In a real application, this would fetch data from an API or database
  return personalTasks
}

