import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

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

      console.log('User message:', inputMessage);
      console.log('Text content (context) sent to model:', textContent);

      const apiToken = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
      console.log('Hugging Face API token:', apiToken);

      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
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
      } catch (error) {
        console.error('Error calling Hugging Face API:', error);
      }

      // Clear the input field after sending the message
      setInputMessage('');
    }
  };

  const handleNewChat = () => {
    // Clear all messages and reset input
    setMessages([]);
    setInputMessage('');
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Set default message if there are no messages and textContent is available
    if (textContent && messages.length === 0) {
      setMessages([{ role: 'ai', content: 'Get started with your questions!' }]);
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
