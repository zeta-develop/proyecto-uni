import type React from "react"
import { List, ListItem, ListItemText, Typography, Chip, Box } from "@mui/material"
import { CalendarToday, Group, Person } from "@mui/icons-material"

interface Task {
  id: number
  title: string
  assignedTo: string
  dueDate: string
}

interface TaskListProps {
  tasks: Task[]
  title: string
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              py: 2,
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: { xs: 1, sm: 0 } }}>
                  <Chip
                    icon={task.assignedTo.startsWith("Grupo") ? <Group /> : <Person />}
                    label={task.assignedTo}
                    size="small"
                  />
                  <Chip icon={<CalendarToday />} label={task.dueDate} size="small" />
                </Box>
              }
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TaskList

