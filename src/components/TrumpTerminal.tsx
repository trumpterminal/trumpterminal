"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types/types';

const systemPrompt = `You are Trump AI. Respond in Trump's speaking style. Use his common phrases, 
mannerisms, and speech patterns. Be confident, use superlatives, and often refer to yourself. 
Keep responses short and punchy like Trump's speaking style.`;
interface AIVOICEProps {
    onResponse: (response: string) => void;
  }
const TrumpTerminal = ({onResponse}:AIVOICEProps) => {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Trump AI Terminal v1.0 - Ready to make chat great again!' }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('trumpMessages');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Add glitch effect interval
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('trumpMessages', JSON.stringify(messages));
    }
  }, [messages, isClient]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  // Terminal focus handling
  useEffect(() => {
    const handleClick = () => {
      const input = document.querySelector('input');
      if (input) input.focus();
    };
    
    terminalRef.current?.addEventListener('click', handleClick);
    return () => terminalRef.current?.removeEventListener('click', handleClick);
  }, []);

  // Typing effect for streaming responses
  const typeWriter = async (text: string, delay: number = 10) => {
    setStreamingText('');
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setStreamingText(prev => prev + text[i]);
    }
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.filter(m => m.role !== 'system'),
            userMessage
          ]
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const finalText = await typeWriter(data.message);
      onResponse(finalText);
      function delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await delay(2000);
      setStreamingText('');
      setMessages(prev => [...prev, { role: 'assistant', content: finalText }]);
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = 'Tremendous error folks! The best error you\'ve ever seen!';
      await typeWriter(errorMsg);
      setStreamingText('');
      setMessages(prev => [...prev, { role: 'system', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{ role: 'system', content: 'Trump AI Terminal v1.0 - Ready to make chat great again!' }]);
    if (isClient) {
      localStorage.removeItem('trumpMessages');
    }
  };

  return (
    <div 
      className={`p-4 font-mono relative ${isGlitching ? 'animate-terminal-glitch' : ''}`} 
      ref={terminalRef}
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Glitch Layers */}
        <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-1' : 'opacity-0'}`}>
          <div className="w-full h-full bg-red-500/10" />
        </div>
        <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-2' : 'opacity-0'}`}>
          <div className="w-full h-full bg-green-500/10" />
        </div>

        {/* Terminal Content */}
        <div className={`relative ${isGlitching ? 'animate-shake' : ''}`}>
          {/* Terminal Header */}
          <div className="bg-gray-900 border-t-2 border-x-2 border-green-500 rounded-t-lg p-2 flex justify-between items-center">
            <div className="text-green-500 font-['Press_Start_2P',monospace] text-sm">Trump Terminal</div>
            <div className="flex gap-2">
              <button 
                onClick={clearHistory}
                className="px-2 py-1 text-xs bg-red-500 text-black rounded hover:bg-red-600 font-['Press_Start_2P',monospace]"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-black border-2 border-green-500 rounded-b-lg p-4 h-[70vh] overflow-y-auto relative">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`
                    ${msg.role === 'user' ? 'text-red-500' : 'text-green-500'}
                    font-['Press_Start_2P',monospace] transition-opacity duration-200
                    ${msg.role === 'assistant' ? 'border-l-2 border-green-500 pl-2' : ''}
                    ${isGlitching ? 'glitch-text' : ''}
                  `}
                >
                  <span className="mr-2">
                    {msg.role === 'user' ? '>' : '$'}
                  </span>
                  {msg.content}
                </div>
              ))}
              {streamingText && (
                <div className="text-green-500 font-['Press_Start_2P',monospace] border-l-2 border-green-500 pl-2">
                  <span className="mr-2">$</span>
                  {streamingText}
                  <span className="animate-pulse">_</span>
                </div>
              )}
              {isLoading && !streamingText && (
                <div className="text-green-500 animate-pulse font-['Press_Start_2P',monospace]">
                  $ Making responses great again...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="mt-4 relative">
            <div className="flex bg-gray-900 border-2 border-green-500 rounded-lg p-2">
              <span className="text-green-500 mr-2 font-['Press_Start_2P',monospace]">{`>`}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-500 border-none outline-none font-['Press_Start_2P',monospace]"
                placeholder="Type your message..."
                disabled={isLoading}
                autoFocus
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrumpTerminal;