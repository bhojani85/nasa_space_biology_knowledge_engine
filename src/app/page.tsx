"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import ArticleFlipCard from '@/components/ArticleFlipCard'
import FloatingChatbot from '@/components/FloatingChatbot'
import { Sparkles, Search } from 'lucide-react'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { isSupported, getAnalytics } from 'firebase/analytics'
import { useRouter } from 'next/navigation'

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })

// Simulate many cards by duplicating a base set; show only first 24 by default
const base = [
  { id: 1, title: 'Impact of Microgravity on Gene Expression in Space Biology', summary: 'This study examines how microgravity environments affect cellular gene expression patterns in various organisms. Research conducted on the ISS shows significant changes in metabolic pathways and stress response mechanisms.' },
  { id: 2, title: 'Mars Regolith Analysis: Chemical Composition and Biological Implications', summary: 'Comprehensive analysis of Martian soil samples reveals complex mineralogy and potential resources for future missions. The study explores implications for in-situ resource utilization and potential biomarkers.' },
  { id: 3, title: 'Plant Growth Systems in Controlled Space Environments', summary: 'Investigation of the Veggie plant growth system aboard the ISS demonstrates successful cultivation of leafy greens. Results show adaptation mechanisms and nutritional content analysis for long-duration missions.' },
]
const mockArticles = Array.from({ length: 600 }).map((_, i) => {
  const b = base[i % base.length]
  return { ...b, id: i + 1 }
})

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [ready, setReady] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBqs07OByzwq1ox-wyd-m4yBXfteRH_Dng",
    authDomain: "nasa-bio-dashboard.firebaseapp.com",
    projectId: "nasa-bio-dashboard",
    storageBucket: "nasa-bio-dashboard.firebasestorage.app",
    messagingSenderId: "27321660799",
    appId: "1:27321660799:web:b31e2f7b32d9e69e5e964a",
    measurementId: "G-WHHK01PWH7",
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    void isSupported().then((ok) => { if (ok) { try { getAnalytics(app) } catch {} } })
  }
  const auth = getAuth(app)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login')
        return
      }
      setReady(true)
    })
    return () => unsub()
  }, [auth, router])

  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const visibleArticles = searchQuery.trim() ? filteredArticles : filteredArticles.slice(0, 24)

  if (!ready) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900/20 to-black">
      <Scene3D />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-16 sm:pt-20 p-3 sm:p-4 md:p-6">
        <header className="text-center mb-6 sm:mb-8 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 text-gray-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-transparent">Space Biology Engine</h1>
            <Sparkles className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 text-gray-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">NASA Research Console • AI-Powered Knowledge Discovery</p>
        </header>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search space biology articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleArticles.map((article) => (
              <ArticleFlipCard key={article.id} title={article.title} summary={article.summary} />
            ))}
          </div>
        </div>
      </div>
      <FloatingChatbot />
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px]" />
      </div>
    </div>
  )
}