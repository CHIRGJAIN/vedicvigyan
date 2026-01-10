/**
 * Authentication Context
 * Unified authentication system for both users and admins
 */

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../utils/api'
import toast from 'react-hot-toast'

interface User {
  _id: string
  name: string
  email: string
  studentId?: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (username: string, password: string, role?: 'user' | 'admin') => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // Verify token with backend
          const response = await authAPI.getMe()
          if (response.data) {
            setUser(response.data)
            setIsLoggedIn(true)
          } else {
            // Invalid token, clear it
            localStorage.removeItem('token')
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Session check failed:', error)
        // Clear invalid session
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (username: string, password: string, role: 'user' | 'admin' = 'user') => {
    try {
      let response
      
      if (role === 'admin') {
        response = await authAPI.loginAdmin(username, password)
      } else {
        response = await authAPI.loginUser(username, password)
      }

      if (response.data && response.data.token) {
        const { token, user: userData } = response.data
        
        // Store token and user data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        setUser(userData)
        setIsLoggedIn(true)
        
        // Redirect based on role
        if (role === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/dashboard'
        }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Reset state
    setUser(null)
    setIsLoggedIn(false)
    
    // Redirect to home
    window.location.href = '/'
  }

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}




