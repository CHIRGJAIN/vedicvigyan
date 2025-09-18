'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface UserContextType {
  isLoggedIn: boolean
  userData: any | null
  login: (userData: any) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('vves-user-session')
    if (savedUserData) {
      const user = JSON.parse(savedUserData)
      setUserData(user)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (userData: any) => {
    setUserData(userData)
    setIsLoggedIn(true)
    localStorage.setItem('vves-user-session', JSON.stringify(userData))
  }

  const logout = () => {
    setUserData(null)
    setIsLoggedIn(false)
    localStorage.removeItem('vves-user-session')
  }

  const value = {
    isLoggedIn,
    userData,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}











