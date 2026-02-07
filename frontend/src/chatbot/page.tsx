'use client'

import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello 👋 How can I help you today?' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { role: 'user', text: input },
      { role: 'bot', text: 'Typing...' }, // placeholder
    ]

    setMessages(newMessages)
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="p-4 border-b border-purple-800 text-center text-xl font-semibold text-purple-400">
        AI Chatbot
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900 border border-purple-700 text-purple-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-800 flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-900 text-white border border-purple-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 px-6 rounded-xl font-medium"
        >
          Send
        </button>
      </div>
    </div>
  )
}
