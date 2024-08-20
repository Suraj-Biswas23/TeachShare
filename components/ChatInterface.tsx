import React, { useState } from 'react'
import { Send } from 'lucide-react'
import axios from 'axios'

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function ChatInterface({ textContent }: { textContent: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage: Message = { role: 'user', content: inputMessage };
      setMessages([...messages, newMessage]);
  
      const apiToken = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
      console.log('Hugging Face API token:', apiToken);
  
      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/distilbert-base-uncased-distilled-squad',
          {
            inputs: {
              question: inputMessage,
              context: textContent,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        console.log('Hugging Face API response:', response.data);
  
        const aiResponse: Message = { role: 'ai', content: response.data.answer };
        setMessages((prev) => [...prev, aiResponse]);
        setInputMessage('');
      } catch (error) {
        console.error('Error calling Hugging Face API:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
