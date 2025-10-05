"use client"

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import FloatingPanel from '@/components/FloatingPanel'
import Navbar from '@/components/Navbar'
import UserDashboard from '@/components/UserDashboard'
import { User, Mail, Calendar, Activity } from 'lucide-react'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { isSupported, getAnalytics } from 'firebase/analytics'
import { useRouter } from 'next/navigation'

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

export default function Profile() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

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
    void isSupported().then((ok) => {
      if (ok) {
        try { getAnalytics(app) } catch {}
      }
    })
  }
  const auth = getAuth(app)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login')
        return
      }
      setDisplayName(user.displayName || 'Astronaut')
      setEmail(user.email || '')
    })
    return () => unsub()
  }, [auth, router])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900/20 to-black">
      {/* 3D Background Scene - Dynamically loaded */}
      <Scene3D />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-16 sm:pt-20 p-3 sm:p-4 md:p-6">
        {/* Header (no name/email above the dashboard) */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12 pt-4 sm:pt-6 md:pt-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <User className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 text-gray-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-transparent">
              User Dashboard
            </h1>
          </div>
        </header>

        {/* User Dashboard Panel */}
        <div className="max-w-4xl mx-auto">
          <FloatingPanel title="User Dashboard" glowColor="purple" className="min-h-[500px]">
            <UserDashboard />
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