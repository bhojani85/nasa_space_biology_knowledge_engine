"use client"

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Info, BarChart3 } from 'lucide-react'

function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/about', label: 'About', icon: Info },
    { href: '/statistics', label: 'Statistics', icon: BarChart3 },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-gray-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              NASA Lab
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gray-500/20 text-gray-300 shadow-[0_0_20px_rgba(107,114,128,0.3)]'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default memo(Navbar)