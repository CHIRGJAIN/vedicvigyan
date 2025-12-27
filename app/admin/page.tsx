'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAdmin } from '../../components/AdminContext'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import {
  Users, UserPlus, UserCheck, UserX, Mail, Phone, Calendar, MapPin,
  BookOpen, GraduationCap, FileText, CreditCard, Settings, Search,
  Filter, Download, Upload, Edit3, Trash2, Eye, Plus, BarChart3,
  PieChart, TrendingUp, Award, Clock, Star, CheckCircle, AlertCircle,
  LogOut, Database, Shield, Bell, MessageSquare, Tag, DollarSign,
  Bookmark, Archive, RefreshCw, Send, Copy, ExternalLink, Key
} from 'lucide-react'

const AdminDashboard = () => {
  const router = useRouter()
  const { isLoggedIn, username, logout } = useAdmin()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Customer data state
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      status: 'active',
      membershipType: 'Premium',
      joinDate: '2024-01-15',
      lastActive: '2024-01-28',
      courses: ['Vedic Science Fundamentals', 'Sanskrit Basics'],
      events: ['Vedic Conference 2024'],
      location: 'Mumbai, Maharashtra',
      profession: 'Professor',
      organization: 'Mumbai University',
      interests: ['Vedic Mathematics', 'Astronomy'],
      subscription: 'Annual',
      paymentStatus: 'paid',
      totalSpent: 25000,
      notes: 'Very interested in advanced courses'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      status: 'active',
      membershipType: 'Standard',
      joinDate: '2024-01-20',
      lastActive: '2024-01-27',
      courses: ['Vedic Science Fundamentals'],
      events: [],
      location: 'Delhi, NCR',
      profession: 'Student',
      organization: 'Delhi University',
      interests: ['Vedic Philosophy'],
      subscription: 'Monthly',
      paymentStatus: 'paid',
      totalSpent: 8000,
      notes: 'New student, needs guidance'
    },
    {
      id: 3,
      name: 'Prof. Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      status: 'inactive',
      membershipType: 'Premium',
      joinDate: '2023-12-01',
      lastActive: '2024-01-10',
      courses: ['Vedic Science Fundamentals', 'Advanced Sanskrit', 'Vedic Mathematics'],
      events: ['Vedic Conference 2024', 'Sanskrit Workshop'],
      location: 'Bangalore, Karnataka',
      profession: 'Researcher',
      organization: 'IISc Bangalore',
      interests: ['Vedic Mathematics', 'Astronomy', 'Sanskrit'],
      subscription: 'Annual',
      paymentStatus: 'overdue',
      totalSpent: 45000,
      notes: 'Expert in Vedic Mathematics'
    }
  ])

  // Course data
  const [courses] = useState([
    { id: 1, name: 'Vedic Science Fundamentals', students: 45, price: 12000, duration: '3 months' },
    { id: 2, name: 'Sanskrit Basics', students: 32, price: 8000, duration: '2 months' },
    { id: 3, name: 'Vedic Mathematics', students: 28, price: 15000, duration: '4 months' },
    { id: 4, name: 'Vedic Philosophy', students: 38, price: 10000, duration: '3 months' },
    { id: 5, name: 'Advanced Sanskrit', students: 15, price: 20000, duration: '6 months' }
  ])

  // Event data
  const [events] = useState([
    { id: 1, name: 'Vedic Conference 2024', attendees: 120, date: '2024-03-15', status: 'upcoming' },
    { id: 2, name: 'Sanskrit Workshop', attendees: 45, date: '2024-02-20', status: 'upcoming' },
    { id: 3, name: 'Vedic Mathematics Seminar', attendees: 80, date: '2024-01-10', status: 'completed' }
  ])

  // Enrollment data state
  const [enrollments, setEnrollments] = useState<any[]>([])
  
  // Enquiry data state
  const [enquiries, setEnquiries] = useState<any[]>([])
  
  // Research papers state
  const [researchPapers, setResearchPapers] = useState<any[]>([])

  // Check authentication on mount
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      toast.error('Please login to access admin dashboard')
    }
  }, [isLoggedIn, router])

  // Load enrollments data from localStorage
  useEffect(() => {
    const storedEnrollments = localStorage.getItem('vves-users')
    if (storedEnrollments) {
      try {
        const parsedEnrollments = JSON.parse(storedEnrollments)
        setEnrollments(parsedEnrollments)
      } catch (error) {
        console.error('Error parsing enrollments:', error)
      }
    }
  }, [])

  if (!isLoggedIn) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logged out successfully')
  }

  const handleAddCustomer = () => {
    toast.success('Add Customer functionality - Form would open here')
  }

  const handleAddEnrollment = () => {
    toast.success('Add Enrollment functionality - Form would open here')
  }

  const handleEditCustomer = (id: number) => {
    toast.success(`Edit customer ${id} - Form would open here`)
  }

  const handleDeleteCustomer = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id))
      toast.success('Customer deleted successfully')
    }
  }

  const handleExportData = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast.success('Customer data exported successfully!')
      setIsLoading(false)
    }, 2000)
  }

  const handleSendBulkEmail = () => {
    toast.success('Bulk email functionality - Email composer would open here')
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'customers', name: 'Customer Management', icon: Users },
    { id: 'course-purchases', name: 'Course Purchases', icon: CreditCard },
    { id: 'courses', name: 'Course Management', icon: BookOpen },
    { id: 'events', name: 'Event Management', icon: Calendar },
    { id: 'communications', name: 'Communications', icon: Mail },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
            <Users size={24} className="text-blue-200" />
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
              <p className="text-green-100 text-sm">Active Members</p>
              <p className="text-2xl font-bold">{customers.filter(c => c.status === 'active').length}</p>
            </div>
            <UserCheck size={24} className="text-green-200" />
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
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
            </div>
            <DollarSign size={24} className="text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Payments</p>
              <p className="text-2xl font-bold">{customers.filter(c => c.paymentStatus === 'overdue').length}</p>
            </div>
            <AlertCircle size={24} className="text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings size={20} className="mr-2 text-indian-red" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddCustomer}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <UserPlus size={20} className="text-indian-red mb-2" />
            <p className="font-medium">Add Customer</p>
            <p className="text-sm text-gray-600">Register new member</p>
          </button>
          <button
            onClick={handleAddEnrollment}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <GraduationCap size={20} className="text-indian-red mb-2" />
            <p className="font-medium">Add Enrollment</p>
            <p className="text-sm text-gray-600">Enroll student in course</p>
          </button>
          <button
            onClick={handleSendBulkEmail}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <Mail size={20} className="text-indian-red mb-2" />
            <p className="font-medium">Send Email</p>
            <p className="text-sm text-gray-600">Bulk communication</p>
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <MessageSquare size={20} className="text-indian-red mb-2" />
            <p className="font-medium">View Enquiries</p>
            <p className="text-sm text-gray-600">Check messages</p>
          </button>
          <button
            onClick={handleExportData}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <Download size={20} className="text-indian-red mb-2" />
            <p className="font-medium">Export Data</p>
            <p className="text-sm text-gray-600">Download reports</p>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className="p-4 border-2 border-indian-red/20 rounded-lg hover:border-indian-red hover:bg-indian-red/5 transition-colors text-left"
          >
            <BarChart3 size={20} className="text-indian-red mb-2" />
            <p className="font-medium">View Analytics</p>
            <p className="text-sm text-gray-600">Performance metrics</p>
          </button>
        </div>
      </motion.div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button
              onClick={handleAddCustomer}
              className="btn-primary flex items-center space-x-2"
            >
              <UserPlus size={16} />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Contact</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Membership</th>
                <th className="text-left py-3 px-4 font-semibold">Payment</th>
                <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.profession} at {customer.organization}</p>
                      <p className="text-xs text-gray-500">{customer.location}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{customer.email}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium">{customer.membershipType}</p>
                      <p className="text-xs text-gray-600">{customer.subscription}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      customer.paymentStatus === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium">₹{customer.totalSpent.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCustomer(customer.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Edit"
                      >
                        <Edit3 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded"
                        title="View Details"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )

  const renderCoursePurchases = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Enrollments</p>
              <p className="text-2xl font-bold">{enrollments.length}</p>
            </div>
            <GraduationCap size={24} className="text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">₹{enrollments.reduce((sum, enrollment) => sum + (enrollment.amount || 0), 0).toLocaleString()}</p>
            </div>
            <DollarSign size={24} className="text-blue-200" />
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
              <p className="text-purple-100 text-sm">Active Students</p>
              <p className="text-2xl font-bold">{enrollments.filter(e => e.status === 'active').length}</p>
            </div>
            <UserCheck size={24} className="text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Courses Offered</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <BookOpen size={24} className="text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Enrollments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Course Enrollments</h3>
          <button 
            onClick={handleAddEnrollment}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Enrollment</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Student</th>
                <th className="text-left py-3 px-4 font-semibold">Course</th>
                <th className="text-left py-3 px-4 font-semibold">Enrollment Date</th>
                <th className="text-left py-3 px-4 font-semibold">Amount Paid</th>
                <th className="text-left py-3 px-4 font-semibold">Payment Method</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Login Credentials</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? (
                enrollments.map((enrollment, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{enrollment.name}</p>
                        <p className="text-sm text-gray-600">{enrollment.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium">{enrollment.course}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{enrollment.enrollmentDate || 'N/A'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-green-600">₹{enrollment.amount || 0}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{enrollment.paymentMethod || 'N/A'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {enrollment.status || 'active'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          ID: {enrollment.studentId}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(`${enrollment.studentId}:${enrollment.password}`)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copy credentials"
                        >
                          <Copy size={14} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-200 rounded" title="View Details">
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded" title="Edit">
                          <Edit3 size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <GraduationCap size={32} className="text-gray-400" />
                      <p>No course enrollments yet</p>
                      <p className="text-sm">Students will appear here after they register for courses</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Course Management</h3>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{course.name}</h4>
                <span className="text-sm text-gray-600">{course.duration}</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Students:</span> {course.students}</p>
                <p><span className="font-medium">Price:</span> ₹{course.price.toLocaleString()}</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="text-indian-red hover:text-indian-deepRed text-sm">Edit</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm">View Students</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Event Management</h3>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Event</span>
          </button>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{event.name}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.attendees} attendees</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderCommunications = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Communication Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Email Campaigns</h4>
            <p className="text-sm text-gray-600 mb-3">Send bulk emails to customers</p>
            <button className="btn-primary">Create Campaign</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">SMS Notifications</h4>
            <p className="text-sm text-gray-600 mb-3">Send SMS alerts and reminders</p>
            <button className="btn-primary">Send SMS</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-3">Create and send newsletters</p>
            <button className="btn-primary">Create Newsletter</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Announcements</h4>
            <p className="text-sm text-gray-600 mb-3">Post important announcements</p>
            <button className="btn-primary">Post Announcement</button>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Customer Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800">Growth Rate</h4>
            <p className="text-2xl font-bold text-blue-600">+15%</p>
            <p className="text-sm text-blue-600">This month</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800">Retention Rate</h4>
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-green-600">Annual retention</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800">Avg. Revenue</h4>
            <p className="text-2xl font-bold text-purple-600">₹18,500</p>
            <p className="text-sm text-purple-600">Per customer</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800">Satisfaction</h4>
            <p className="text-2xl font-bold text-orange-600">4.8/5</p>
            <p className="text-sm text-orange-600">Customer rating</p>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">System Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">General Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input type="text" defaultValue="Vedic Vigyanam Explorer Society" className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input type="email" defaultValue="admin@vves.org" className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" defaultValue="+91 98765 43210" className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Notification Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">SMS notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Push notifications</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary">Save Settings</button>
        </div>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'customers':
        return renderCustomers()
      case 'course-purchases':
        return renderCoursePurchases()
      case 'courses':
        return renderCourses()
      case 'events':
        return renderEvents()
      case 'communications':
        return renderCommunications()
      case 'analytics':
        return renderAnalytics()
      case 'settings':
        return renderSettings()
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
              <h1 className="text-3xl font-bold text-gray-900">Customer Management System</h1>
              <p className="text-gray-600 mt-1">Welcome back, {username}! Manage your VVES customers efficiently.</p>
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

export default AdminDashboard 
