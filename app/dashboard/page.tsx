'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useUser } from '../../components/UserContext'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import {
  BookOpen, Clock, Users, DollarSign, Star, CheckCircle, 
  LogOut, User, Calendar, Award, Play, BarChart3,
  FileText, Video, Download, MessageSquare
} from 'lucide-react'

const UserDashboard = () => {
  const router = useRouter()
  const { isLoggedIn, userData, logout } = useUser()
  const [activeTab, setActiveTab] = useState('overview')

  // Check authentication on mount
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      toast.error('Please login to access your dashboard')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !userData) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logged out successfully')
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'progress', name: 'Progress', icon: Award },
    { id: 'resources', name: 'Resources', icon: FileText },
    { id: 'support', name: 'Support', icon: MessageSquare }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-indian-red to-indian-deepRed text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {userData.name}!</h2>
            <p className="text-indian-gold/90 mt-1">Student ID: {userData.id}</p>
            <p className="text-indian-gold/90">Enrolled: {userData.enrollmentDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-indian-gold/90">Status</p>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
              {userData.status}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold">{userData.courses?.length || 0}</p>
            </div>
            <BookOpen size={24} className="text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Progress</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
            <Award size={24} className="text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Study Hours</p>
              <p className="text-2xl font-bold">24h</p>
            </div>
            <Clock size={24} className="text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('courses')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-center"
          >
            <BookOpen size={24} className="text-indian-red mx-auto mb-2" />
            <p className="font-medium">My Courses</p>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-center"
          >
            <Award size={24} className="text-indian-red mx-auto mb-2" />
            <p className="font-medium">Progress</p>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-center"
          >
            <FileText size={24} className="text-indian-red mx-auto mb-2" />
            <p className="font-medium">Resources</p>
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-center"
          >
            <MessageSquare size={24} className="text-indian-red mx-auto mb-2" />
            <p className="font-medium">Support</p>
          </button>
        </div>
      </motion.div>
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-6">My Enrolled Courses</h3>
        <div className="space-y-4">
          {userData.courses?.map((course: string, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{course}</h4>
                  <p className="text-sm text-gray-600 mt-1">Enrolled on {userData.enrollmentDate}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indian-red h-2 rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="btn-primary flex items-center space-x-2">
                    <Play size={16} />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-6">Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Course Progress</h4>
            {userData.courses?.map((course: string, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{course}</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indian-red h-2 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Achievements</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Award size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">First Course Completed</p>
                  <p className="text-sm text-green-600">You completed your first lesson!</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Clock size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Study Streak</p>
                  <p className="text-sm text-blue-600">5 days in a row!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderResources = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-6">Study Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FileText size={20} className="text-indian-red" />
              <h4 className="font-medium">Study Materials</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Download course materials and reference guides</p>
            <button className="btn-primary w-full">Download</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Video size={20} className="text-indian-red" />
              <h4 className="font-medium">Video Lectures</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Access recorded video lectures and tutorials</p>
            <button className="btn-primary w-full">Watch</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Download size={20} className="text-indian-red" />
              <h4 className="font-medium">Assignments</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Submit and track your assignments</p>
            <button className="btn-primary w-full">Submit</button>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-6">Support & Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageSquare size={20} className="text-indian-red" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-600">support@vves.org</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User size={20} className="text-indian-red" />
                <div>
                  <p className="font-medium">Student ID</p>
                  <p className="text-sm text-gray-600">{userData.id}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Quick Help</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                How to access course materials?
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                Technical issues with video lectures
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                Assignment submission guidelines
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'courses':
        return renderCourses()
      case 'progress':
        return renderProgress()
      case 'resources':
        return renderResources()
      case 'support':
        return renderSupport()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {userData.name}! Track your learning progress.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indian-red transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indian-red text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default UserDashboard











