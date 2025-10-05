"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import FloatingPanel from '@/components/FloatingPanel'
import GraphVisualization from '@/components/GraphVisualization'
import Navbar from '@/components/Navbar'
import { BarChart3, TrendingUp, Database, Activity } from 'lucide-react'

// Use next/dynamic instead of React.lazy for better Next.js compatibility
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-900/20 to-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Loading 3D scene...</div>
      </div>
    </div>
  )
})

export default function Statistics() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900/20 to-black">
      {/* 3D Background Scene - Dynamically loaded */}
      <Scene3D />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-16 sm:pt-20 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12 pt-4 sm:pt-6 md:pt-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BarChart3 className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 text-gray-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-transparent">
              Data Visualizations
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">Analyze Research Insights</p>
        </header>

        {/* Graph Visualization Panel */}
        <div className="max-w-6xl mx-auto">
          <FloatingPanel title="Data Visualizations" glowColor="purple" className="min-h-[500px]">
            <GraphVisualization />
          </FloatingPanel>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 sm:mt-8 md:mt-12 pb-4 sm:pb-6 md:pb-8 px-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            Powered by NASA GeneLab • Space Biology Database
          </p>
        </footer>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px]" />
      </div>
    </div>
  )
}