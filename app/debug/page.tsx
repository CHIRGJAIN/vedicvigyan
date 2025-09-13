'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

const DebugPage = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem('vves-users') || '[]')
      setUsers(storedUsers)
    }
    
    loadUsers()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadUsers()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Debug: Registered Users</h1>
          <p className="text-gray-600">All registered students and their login credentials</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No users registered yet.</p>
              <p className="text-sm text-gray-500">
                Go to <a href="/courses" className="text-indian-red hover:underline">Courses page</a> and register a student to see credentials here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Registered Students ({users.length})</h2>
              {users.map((user, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                      <p className="text-sm text-gray-600">Course: {user.selectedCourse}</p>
                      <p className="text-sm text-gray-600">Enrolled: {user.enrollmentDate}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Login Credentials:</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Student ID:</strong> <span className="font-mono bg-white px-2 py-1 rounded">{user.id}</span></p>
                        <p><strong>Password:</strong> <span className="font-mono bg-white px-2 py-1 rounded">{user.password}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default DebugPage
