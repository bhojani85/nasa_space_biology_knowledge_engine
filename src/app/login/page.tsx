"use client"

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles, Mail, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"

// ✅ Firebase Imports
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth"
import { isSupported, getAnalytics } from "firebase/analytics"

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBqs07OByzwq1ox-wyd-m4yBXfteRH_Dng",
  authDomain: "nasa-bio-dashboard.firebaseapp.com",
  projectId: "nasa-bio-dashboard",
  storageBucket: "nasa-bio-dashboard.firebasestorage.app",
  messagingSenderId: "27321660799",
  appId: "1:27321660799:web:b31e2f7b32d9e69e5e964a",
  measurementId: "G-WHHK01PWH7"
}

// ✅ Initialize Firebase (guard against HMR re-init) and safe analytics in browser
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
// Initialize Analytics only on client and when supported
if (typeof window !== "undefined") {
  void isSupported().then((ok) => {
    if (ok) {
      try {
        getAnalytics(app)
      } catch {}
    }
  })
}
const auth = getAuth(app)

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  // If already signed in, skip login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/")
      }
    })
    return () => unsub()
  }, [router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Set persistence based on rememberMe
      await setPersistence(
        auth,
        formData.rememberMe ? browserLocalPersistence : browserSessionPersistence
      )

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // ✅ Success: User authenticated
      const user = userCredential.user
      toast.success(`Welcome back, ${user.email || "Astronaut"}! 🚀`)
      router.push("/") // Redirect to home after login
    } catch (error: any) {
      // ✅ Handle Errors
      console.error(error)
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email. Please register first.")
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.")
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.")
      } else {
        toast.error("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-blue-950/20 to-black">
      {/* Animated Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Starfield Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Space Biology Engine
              </h1>
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <p className="text-gray-400 text-base">Access NASA Research Console</p>
          </div>

          {/* Login Card */}
          <div className="relative backdrop-blur-xl bg-black/40 border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 text-base bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="astronaut@nasa.gov"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                      id="password"
                      type="password"
                      required
                      autoComplete="off"
                      value={formData.password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 text-base bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, rememberMe: !!e.target.checked })
                    }
                    className="w-4 h-4 bg-black/50 border-cyan-500/30 rounded text-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors inline-flex items-center gap-1"
            >
              ← Back to Research Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
