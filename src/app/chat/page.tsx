"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { UserIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
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
  { id: 1, sender: "Juan", content: "Hola a todos!", timestamp: new Date(2023, 5, 1, 14, 30) },
  { id: 2, sender: "María", content: "¿Cómo va el proyecto?", timestamp: new Date(2023, 5, 1, 14, 32) },
  { id: 3, sender: "Carlos", content: "Bastante bien, estamos avanzando", timestamp: new Date(2023, 5, 1, 14, 35) },
]

export default function Chat() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedGroup) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Usuario", // Aquí podrías poner el nombre del usuario actual
        content: newMessage.trim(),
        timestamp: new Date(),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chat de Grupos</h1>

      <div className="mb-4">
        <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona un grupo para chatear:
        </label>
        <select
          id="group-select"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            const group = initialGroups.find((g) => g.id === Number.parseInt(e.target.value))
            setSelectedGroup(group || null)
          }}
          value={selectedGroup?.id || ""}
        >
          <option value="">Selecciona un grupo</option>
          {initialGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {selectedGroup && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b">
            <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-start">
                  <div className="bg-gray-200 rounded-full p-2 mr-2">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-gray-700">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

