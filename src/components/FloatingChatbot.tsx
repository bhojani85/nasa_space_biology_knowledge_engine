"use client"

import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import ChatbotInterface from './ChatbotInterface'
import FloatingPanel from './FloatingPanel'

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Open AI Research Assistant"
        >
          <MessageSquare className="w-8 h-8 text-white" />
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
        </button>
        <span className="text-xs text-gray-400 text-center max-w-[100px]">
          your AI Research Assistant
        </span>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[80vh] max-h-[700px]">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>

            {/* Chatbot Panel */}
            <FloatingPanel 
              title="AI Research Assistant" 
              glowColor="cyan" 
              className="h-full"
            >
              <ChatbotInterface />
            </FloatingPanel>
          </div>
        </div>
      )}
    </>
  )
}