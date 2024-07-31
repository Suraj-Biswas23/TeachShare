'use client'
import React, { useState } from 'react'

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newMessage: Message = { role: 'user', content: inputMessage }
      setMessages([...messages, newMessage])
      // Here you would typically send the message to your AI backend
      // and then add the AI's response to the chat
      // For now, we'll just simulate an AI response
      setTimeout(() => {
        const aiResponse: Message = { role: 'ai', content: `AI response to: ${inputMessage}` }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
      setInputMessage('')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  )
}