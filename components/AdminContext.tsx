'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminContextType {
  isLoggedIn: boolean
  username: string | null
  login: (username: string) => void
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

interface AdminProviderProps {
  children: ReactNode
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('vves-admin-username')
    if (savedUsername) {
      setUsername(savedUsername)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (username: string) => {
    setUsername(username)
    setIsLoggedIn(true)
    localStorage.setItem('vves-admin-username', username)
  }

  const logout = () => {
    setUsername(null)
    setIsLoggedIn(false)
    localStorage.removeItem('vves-admin-username')
  }

  const value = {
    isLoggedIn,
    username,
    login,
    logout
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}
