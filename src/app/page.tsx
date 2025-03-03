import { Suspense } from "react"
import { TaskList } from "@/components/TaskList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGroupTasks, getPersonalTasks } from "@/lib/tasks"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Sistema de Gestión Estudiantil</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Suspense fallback={<TaskListSkeleton title="Tareas del Grupo" />}>
          <GroupTasksCard />
        </Suspense>
        <Suspense fallback={<TaskListSkeleton title="Tareas Personales" />}>
          <PersonalTasksCard />
        </Suspense>
      </div>
    </div>
  )
}

function GroupTasksCard() {
  const groupTasks = getGroupTasks()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas del Grupo</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList tasks={groupTasks} />
      </CardContent>
    </Card>
  )
}

function PersonalTasksCard() {
  const personalTasks = getPersonalTasks()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas Personales</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList tasks={personalTasks} />
      </CardContent>
    </Card>
  )
}

function TaskListSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

