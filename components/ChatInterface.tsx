import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function ChatInterface({ textContent }: { textContent: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage: Message = { role: 'user', content: inputMessage };
      setMessages((prev) => [...prev, newMessage]);

      try {
        const response = await axios.post('/api/gemini-chat', {
          message: inputMessage,
          context: textContent,
        });

        const aiResponse: Message = { role: 'ai', content: response.data.response };
        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        const errorMessage: Message = { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' };
        setMessages((prev) => [...prev, errorMessage]);
      }

      setInputMessage('');
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputMessage('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textContent && messages.length === 0) {
      setMessages([{ role: 'ai', content: 'I have analyzed the PDF. What would you like to know about it?' }]);
    }
  }, [textContent, messages.length]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
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
              {message.role === 'user' ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
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
          <button
            type="button"
            onClick={handleNewChat}
            className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
          >
            New Chat
          </button>
        </div>
      </form>
    </div>
  );
}