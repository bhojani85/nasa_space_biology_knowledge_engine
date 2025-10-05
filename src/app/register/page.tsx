"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles, Mail, Lock, User, Loader2 } from "lucide-react"
import { toast } from "sonner"

// Firebase client
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"
import { isSupported, getAnalytics } from "firebase/analytics"

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
if (typeof window !== "undefined") {
  void isSupported().then((ok) => {
    if (ok) {
      try { getAnalytics(app) } catch {}
    }
  })
}
const auth = getAuth(app)
const db = getFirestore(app)

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // Validate password length
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      if (formData.name.trim()) {
        try { await updateProfile(cred.user, { displayName: formData.name.trim() }) } catch {}
      }
      // Save registration data to Firestore collection `User_AuthData`
      await addDoc(collection(db, "User_AuthData"), {
        uid: cred.user.uid,
        name: formData.name.trim(),
        email: cred.user.email,
        password: formData.password, // avoid storing plaintext passwords in production
        createdAt: serverTimestamp(),
      })
      toast.success("Account created successfully! Please sign in.")
      router.push("/login?registered=true")
    } catch (err: any) {
      if (err?.code === "auth/email-already-in-use") {
        toast.error("Email already registered")
      } else if (err?.code === "auth/invalid-email") {
        toast.error("Invalid email")
      } else if (err?.code === "auth/weak-password") {
        toast.error("Password is too weak")
      } else {
        toast.error("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-blue-950/20 to-black">
      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px]" />
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
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Space Biology Engine
              </h1>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base">Join NASA Research Console</p>
          </div>

          {/* Register Card */}
          <div className="relative backdrop-blur-xl bg-black/40 border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Create Account</h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                      placeholder="Dr. Jane Doe"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                      placeholder="astronaut@nasa.gov"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <input
                      id="password"
                      type="password"
                      required
                      autoComplete="off"
                      value={formData.password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      autoComplete="off"
                      value={formData.confirmPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4 sm:mt-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm transition-colors inline-flex items-center gap-1"
            >
              ← Back to Research Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}