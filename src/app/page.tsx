import Link from "next/link"

const groupTasks = [
  { id: 1, title: "Proyecto de Ciencias", assignedTo: "Grupo A", dueDate: "2023-06-15" },
  { id: 2, title: "Presentación de Historia", assignedTo: "Grupo B", dueDate: "2023-06-20" },
  { id: 3, title: "Experimento de Química", assignedTo: "Grupo A", dueDate: "2023-06-25" },
]

const personalTasks = [
  { id: 4, title: "Ensayo de Literatura", assignedTo: "Juan Pérez", dueDate: "2023-06-10" },
  { id: 5, title: "Ejercicios de Matemáticas", assignedTo: "María García", dueDate: "2023-06-12" },
  { id: 6, title: "Reporte de Lectura", assignedTo: "Juan Pérez", dueDate: "2023-06-18" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Sistema de Gestión Estudiantil</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tareas del Grupo</h2>
          <ul className="space-y-3">
            {groupTasks.map((task) => (
              <li key={task.id} className="border-b pb-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">
                  Asignado a: {task.assignedTo} | Fecha límite: {task.dueDate}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tareas Personales</h2>
          <ul className="space-y-3">
            {personalTasks.map((task) => (
              <li key={task.id} className="border-b pb-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">
                  Asignado a: {task.assignedTo} | Fecha límite: {task.dueDate}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Link href="/groups" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Ver Grupos
        </Link>
        <Link href="/tasks" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Gestionar Tareas
        </Link>
      </div>
    </div>
  )
}

