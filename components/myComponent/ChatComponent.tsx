'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import axios from 'axios';
import { IoReloadCircle, IoSend } from 'react-icons/io5';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatComponent({ fileKey }: { fileKey: string }) {
  const [input, setInput] = useState('');
  const [loading,setLoading]=useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      setLoading(true)
      const res = await axios.post('/api/chat', {
        messages: [userMessage],
        fileKey,
      });

      const botMessage: ChatMessage = {
        role: 'assistant',
        content: res.data.response,
      };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false)
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      }]);
      setLoading(false)
    }
  }

  // 🔽 Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <h3 className="text-lg font-semibold">Chat with PDF</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user'
                ? 'ml-auto bg-green-500 text-white'
                : 'mr-auto bg-white text-black border'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} /> {/* Invisible element to scroll to */}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2 bg-white border-t">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-gray-200 text-black"
        />
      {loading ? <IoReloadCircle className='fill-green-500 size-6 animate-spin'/> :
        <button type="submit" className="p-2 hover:opacity-80" disabled={loading}>
          <IoSend className="text-green-600 w-6 h-6" />
        </button>
        
      }
      </form>
    </div>
  );
}
