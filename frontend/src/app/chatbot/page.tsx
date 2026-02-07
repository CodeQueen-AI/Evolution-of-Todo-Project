'use client'

import { useState, useRef, useEffect } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello 👋 How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userText = input
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:8000/api/1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userText,
          conversation_id: conversationId,
        }),
      })

      const data = await res.json()

      setConversationId(data.conversation_id)

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.response },
      ])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-800 bg-black/80 backdrop-blur">
        <h1 className="text-2xl font-semibold text-purple-400 tracking-wide">
          AI Chatbot
        </h1>
        <div className="text-sm text-purple-500">Online</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-5 py-3 rounded-2xl shadow-lg max-w-xs md:max-w-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                  : 'bg-[#111] border border-purple-800 text-purple-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-purple-400 text-sm animate-pulse">
            Assistant is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-5 border-t border-purple-800 bg-black">
        <div className="flex items-center gap-3 bg-[#111] border border-purple-800 rounded-2xl px-4 py-3 shadow-inner">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-purple-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-xl text-sm font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
