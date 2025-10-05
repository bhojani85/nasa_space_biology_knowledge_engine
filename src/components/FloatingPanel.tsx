"use client"

import { ReactNode, memo } from 'react'

interface FloatingPanelProps {
  children: ReactNode
  title?: string
  glowColor?: 'cyan' | 'purple' | 'green'
  className?: string
}

function FloatingPanel({ children, title, glowColor = 'cyan', className = '' }: FloatingPanelProps) {
  const glowColors = {
    cyan: 'shadow-[0_0_30px_rgba(0,255,255,0.1)]',
    purple: 'shadow-[0_0_30px_rgba(139,92,246,0.1)]',
    green: 'shadow-[0_0_30px_rgba(0,255,0,0.1)]'
  }

  return (
    <div className={`backdrop-blur-lg bg-black/30 border border-gray-700/50 rounded-2xl p-4 sm:p-6 ${glowColors[glowColor]} ${className}`}>
      {title && (
        <h2 className="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">{title}</h2>
      )}
      {children}
    </div>
  )
}

export default memo(FloatingPanel)