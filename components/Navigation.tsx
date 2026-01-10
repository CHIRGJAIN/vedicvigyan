'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut, BarChart3 } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'
import UserLoginModal from './UserLoginModal'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserLoginModal, setShowUserLoginModal] = useState(false)
  const pathname = usePathname()
  const { user, isLoggedIn, logout } = useAuth()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Events', href: '/events' },
    { name: 'Research', href: '/research' },
    { name: 'Library', href: '/library' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const handleAdminLogin = () => {
    setShowLoginModal(true)
    setIsOpen(false)
  }

  const handleUserLogin = () => {
    setShowUserLoginModal(true)
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a href="/" className="flex items-center">
              <Image
                src="/vves-logo.png"
                alt="Vedic Vigyanam Explorer Society"
                width={63}
                height={105}
                className="hover:opacity-80 transition-opacity"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <a
                  key={item.name}
                  href={item.href}
                className={`text-sm font-semibold px-2 py-1.5 transition-colors ${
                    pathname === item.href
                      ? 'text-indian-red'
                    : 'text-gray-700 hover:text-indian-red'
                  }`}
                >
                  <span className="relative inline-flex items-center">
                    <span>{item.name}</span>
                    {item.name === 'Courses' && (
                      <span className="ml-2 px-2 py-0.5 text-[10px] leading-none uppercase font-bold rounded-full bg-indian-gold text-white shadow animate-bounce">
                        New
                      </span>
                    )}
                  </span>
              </a>
              ))}
            </div>

          {/* Desktop CTA with login buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                {user?.role === 'admin' ? (
                  <a
                    href="/admin"
                    className="btn-primary"
                  >
                    Admin Dashboard
                  </a>
                ) : (
                  <a
                    href="/dashboard"
                    className="btn-primary"
                  >
                    My Dashboard
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indian-red transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                {/* COMMENTED OUT: Login buttons (reserved for future use)
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleUserLogin}
                    className="text-gray-700 hover:text-indian-red transition-colors"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="btn-primary"
                  >
                    Admin Login
                  </button>
                </div>
                */}
                {null}
              </>
            )}
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indian-red transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                      key={item.name}
                      href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        pathname === item.href
                      ? 'text-indian-red bg-indian-red/10'
                      : 'text-gray-700 hover:text-indian-red hover:bg-gray-50'
                      }`}
                  onClick={() => setIsOpen(false)}
                    >
                      <span className="relative inline-flex items-center">
                        <span>{item.name}</span>
                        {item.name === 'Courses' && (
                          <span className="ml-2 px-2 py-0.5 text-[10px] leading-none uppercase font-bold rounded-full bg-indian-gold text-white shadow animate-bounce">
                            New
                          </span>
                        )}
                      </span>
                </a>
              ))}
            </div>
            
            {/* Mobile CTA with login buttons */}
            <div className="px-2 py-3 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <span className="block px-3 py-2 text-sm text-gray-600">Welcome, {user?.name}</span>
                  {user?.role === 'admin' ? (
                    <a
                      href="/admin"
                      className="block w-full text-center btn-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </a>
                  ) : (
                    <a
                      href="/dashboard"
                      className="block w-full text-center btn-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      My Dashboard
                    </a>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-center px-4 py-2 text-gray-600 hover:text-indian-red transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  {/* COMMENTED OUT: Mobile login buttons (reserved for future use)
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleUserLogin()
                        setIsOpen(false)
                      }}
                      className="block w-full text-center px-4 py-2 text-gray-700 hover:text-indian-red transition-colors"
                    >
                      Student Login
                    </button>
                    <button
                      onClick={() => {
                        handleAdminLogin()
                        setIsOpen(false)
                      }}
                      className="block w-full text-center btn-primary"
                    >
                      Admin Login
                    </button>
                  </div>
                  */}
                  {null}
                </>
              )}
              </div>
            </motion.div>
          )}
      </div>

      {/* Login Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      <UserLoginModal
        isOpen={showUserLoginModal}
        onClose={() => setShowUserLoginModal(false)}
      />
      </nav>
  )
}

export default Navigation


