"use client"

import { useState } from 'react'
import { FileText, X } from 'lucide-react'

interface ArticleFlipCardProps {
  title: string
  summary: string
}

export default function ArticleFlipCard({ title, summary }: ArticleFlipCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Card Thumbnail */}
      <div 
        className="h-48 cursor-pointer rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <FileText className="w-8 h-8 text-cyan-400 mb-3" />
        <h3 className="text-sm font-semibold text-gray-200 line-clamp-3">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-2">Click to read more</p>
      </div>

      {/* Full Screen Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl max-h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500/50 transition-all group"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[80vh] p-6 sm:p-8 md:p-10 scrollbar-hide">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Research Article</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 leading-tight">
                  {title}
                </h2>
              </div>

              {/* Summary Content */}
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                  {summary}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">
                  Source: NASA GeneLab Space Biology Database
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}