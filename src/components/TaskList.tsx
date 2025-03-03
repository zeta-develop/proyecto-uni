import { CalendarIcon, GroupIcon, UserIcon } from "lucide-react"

interface Task {
  id: number
  title: string
  assignedTo: string
  dueDate: string
}

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="border-b pb-2">
          <p className="font-medium">{task.title}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {task.assignedTo.startsWith("Grupo") ? <GroupIcon className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
            <span>{task.assignedTo}</span>
            <CalendarIcon className="h-4 w-4 ml-2" />
            <span>{task.dueDate}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

