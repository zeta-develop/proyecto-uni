"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Send, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
  isMine: boolean
}

interface Group {
  id: number
  name: string
}

const initialGroups: Group[] = [
  { id: 1, name: "Grupo A" },
  { id: 2, name: "Grupo B" },
  { id: 3, name: "Grupo C" },
]

const initialMessages: Message[] = [
  { id: 1, sender: "Juan", content: "Hola a todos!", timestamp: new Date(2023, 5, 1, 14, 30), isMine: false },
  { id: 2, sender: "María", content: "¿Cómo va el proyecto?", timestamp: new Date(2023, 5, 1, 14, 32), isMine: false },
  {
    id: 3,
    sender: "Carlos",
    content: "Bastante bien, estamos avanzando",
    timestamp: new Date(2023, 5, 1, 14, 35),
    isMine: true,
  },
]

export default function Chat() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const groupId = searchParams.get("groupId")
    if (groupId) {
      const group = initialGroups.find((g) => g.id === Number.parseInt(groupId))
      if (group) {
        setSelectedGroup(group)
      }
    }
  }, [searchParams])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedGroup) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Usuario",
        content: newMessage.trim(),
        timestamp: new Date(),
        isMine: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const formatMessageDate = (date: Date) => {
    return format(date, "HH:mm", { locale: es })
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {selectedGroup ? (
        <>
          {/* Chat Messages */}
          <ScrollArea className="flex-grow p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isMine ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {!message.isMine && <p className="font-bold text-sm opacity-75">{message.sender}</p>}
                  <p>{message.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">{formatMessageDate(message.timestamp)}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-background border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Button type="button" size="icon" variant="ghost">
                <Paperclip className="h-6 w-6 text-muted-foreground" />
              </Button>
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-6 w-6" />
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-muted-foreground">Selecciona un grupo para comenzar a chatear</p>
        </div>
      )}
    </div>
  )
}

