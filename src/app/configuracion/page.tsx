"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"

export default function ConfiguracionPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [remindersEnabled, setRemindersEnabled] = useState(false)
  const [reminderTimes, setReminderTimes] = useState<string[]>([])
  const [newReminderTime, setNewReminderTime] = useState("")
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // Aquí iría la lógica para activar/desactivar notificaciones en el sistema
  }

  const handleRemindersToggle = () => {
    setRemindersEnabled(!remindersEnabled)
    // Aquí iría la lógica para activar/desactivar recordatorios en el sistema
  }

  const handleAddReminderTime = () => {
    if (newReminderTime && !reminderTimes.includes(newReminderTime)) {
      setReminderTimes([...reminderTimes, newReminderTime])
      setNewReminderTime("")
    }
    setReminderDialogOpen(false)
  }

  const handleRemoveReminderTime = (time: string) => {
    setReminderTimes(reminderTimes.filter((t) => t !== time))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia de ProActiva</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="theme-switch">Modo Oscuro</Label>
              <p className="text-sm text-muted-foreground">Cambia entre el modo claro y oscuro</p>
            </div>
            <Switch
              id="theme-switch"
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>Configura las notificaciones de la aplicación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notifications-switch">Activar Notificaciones</Label>
              <p className="text-sm text-muted-foreground">Recibe notificaciones sobre tus tareas y actividades</p>
            </div>
            <Switch
              id="notifications-switch"
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationsToggle}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recordatorios</CardTitle>
          <CardDescription>Configura recordatorios diarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="reminders-switch">Activar Recordatorios</Label>
              <p className="text-sm text-muted-foreground">Recibe recordatorios a horas específicas del día</p>
            </div>
            <Switch id="reminders-switch" checked={remindersEnabled} onCheckedChange={handleRemindersToggle} />
          </div>
          {remindersEnabled && (
            <>
              <div className="mb-4">
                <Label>Horas de recordatorio:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {reminderTimes.map((time) => (
                    <div
                      key={time}
                      className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{time}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-auto p-0"
                        onClick={() => handleRemoveReminderTime(time)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Añadir Hora de Recordatorio
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Añadir Hora de Recordatorio</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="reminder-time" className="text-right">
                        Hora
                      </Label>
                      <Input
                        id="reminder-time"
                        type="time"
                        value={newReminderTime}
                        onChange={(e) => setNewReminderTime(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddReminderTime}>
                      Añadir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

