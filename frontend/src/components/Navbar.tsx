'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { signOut } from '@/services/auth'
import { FaCheckCircle } from 'react-icons/fa'

export const Navbar = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/signin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-black border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaCheckCircle className="text-[#9929EA] text-2xl" />
          <span className="text-xl font-bold">
            Tick<span className="text-[#9929EA]">Done</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="#features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition">
            How It Works
          </Link>
          <Link href="/chatbot" className="hover:text-white transition">
            AI Chatbot
          </Link>
        </div>

        {/* Right Side Auth */}
        {!loading && isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">
              Welcome, {user.name || user.email}
            </span>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#9929EA] px-5 py-2 rounded-xl hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}


export default Navbar;