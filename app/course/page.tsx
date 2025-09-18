"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, DollarSign, Star, CheckCircle, UserPlus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import CourseModal from '../../components/CourseModal'

const CoursePage = () => {
  // selectedCourse stores the full course object when modal is open
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    organization: '',
    selectedCourse: ''
  })

  const courses = [
    {
      id: 1,
      name: 'Vedic Science Fundamentals',
      description: 'A comprehensive introduction to the ancient wisdom of Vedic science, covering basic principles and foundational concepts.',
      duration: '3 months',
      students: 45,
      price: 12000,
      rating: 4.8,
      features: [
        'Live interactive sessions',
        'Study materials and resources',
        'Certificate upon completion',
        '24/7 support',
        'Access to VVES community'
      ],
      curriculum: [
        'Introduction to Vedic Science',
        'Ancient Indian Knowledge Systems',
        'Vedic Mathematics Basics',
        'Sanskrit Fundamentals',
        'Practical Applications'
      ]
    },
    {
      id: 2,
      name: 'Sanskrit Basics',
      description: 'Learn the ancient language of Sanskrit with modern teaching methods and practical applications.',
      duration: '2 months',
      students: 32,
      price: 8000,
      rating: 4.6,
      features: [
        'Grammar and vocabulary',
        'Reading and writing practice',
        'Cultural context',
        'Online practice sessions',
        'Progress tracking'
      ],
      curriculum: [
        'Sanskrit Alphabet and Pronunciation',
        'Basic Grammar Rules',
        'Simple Texts and Stories',
        'Cultural Significance',
        'Modern Applications'
      ]
    },
    {
      id: 3,
      name: 'Vedic Mathematics',
      description: 'Master the ancient mathematical techniques that make complex calculations simple and efficient.',
      duration: '4 months',
      students: 28,
      price: 15000,
      rating: 4.9,
      features: [
        '16 Vedic sutras',
        'Mental calculation techniques',
        'Problem-solving strategies',
        'Real-world applications',
        'Advanced topics'
      ],
      curriculum: [
        'Introduction to Vedic Sutras',
        'Basic Operations',
        'Multiplication Techniques',
        'Division Methods',
        'Advanced Applications'
      ]
    },
    {
      id: 4,
      name: 'Vedic Philosophy',
      description: 'Explore the profound philosophical concepts and spiritual wisdom of the Vedic tradition.',
      duration: '3 months',
      students: 38,
      price: 10000,
      rating: 4.7,
      features: [
        'Philosophical discussions',
        'Text analysis',
        'Meditation practices',
        'Life application',
        'Expert guidance'
      ],
      curriculum: [
        'Vedic Worldview',
        'Karma and Dharma',
        'Moksha and Liberation',
        'Ethics and Values',
        'Modern Relevance'
      ]
    },
    {
      id: 5,
      name: 'Advanced Sanskrit',
      description: 'Advanced level Sanskrit course for those who have completed the basics and want to dive deeper.',
      duration: '6 months',
      students: 15,
      price: 20000,
      rating: 4.9,
      features: [
        'Advanced grammar',
        'Classical texts',
        'Poetry and literature',
        'Research methodology',
        'Academic writing'
      ],
      curriculum: [
        'Advanced Grammar',
        'Classical Literature',
        'Vedic Texts Analysis',
        'Poetry and Prosody',
        'Research Projects'
      ]
    }
  ]

  // Open course details modal. Registration flow is triggered from inside the modal.
  const handleCourseSelect = (courseId: number) => {
    const course = courses.find(c => c.id === courseId) || null
    setSelectedCourse(course)
  }

  const handleOpenRegistration = (courseId: number) => {
    const course = courses.find(c => c.id === courseId)
    setRegistrationData(prev => ({ ...prev, selectedCourse: course?.name || '' }))
    setShowRegistration(true)
  }

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate unique user ID and password
    const userId = `STU${Date.now().toString().slice(-6)}`
    const password = `Vves@${Math.random().toString(36).slice(-4)}#${Date.now().toString().slice(-2)}`
    
    // Save to localStorage (in real app, this would go to database)
    const userData = {
      id: userId,
      password,
      ...registrationData,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      courses: [registrationData.selectedCourse],
      paymentStatus: 'pending'
    }
    
    const existingUsers = JSON.parse(localStorage.getItem('vves-users') || '[]')
    existingUsers.push(userData)
    localStorage.setItem('vves-users', JSON.stringify(existingUsers))
    
    toast.success(`Registration successful! Your login credentials:\nUsername: ${userId}\nPassword: ${password}`)
    setShowRegistration(false)
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      profession: '',
      organization: '',
      selectedCourse: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the ancient wisdom of Vedic science through our comprehensive courses designed for modern learners.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{course.students} students</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-indian-red">
                    ₹{course.price.toLocaleString()}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {course.curriculum.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCourseSelect(course.id)}
                  className="w-full bg-indian-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-indian-deepRed transition-colors flex items-center justify-center space-x-2"
                >
                  <UserPlus size={16} />
                  <span>View Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onRegister={(courseId: number) => {
            setSelectedCourse(null)
            handleOpenRegistration(courseId)
          }}
        />
      )}

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Registration</h2>
            <p className="text-gray-600 mb-6">Complete your registration for: <strong>{registrationData.selectedCourse}</strong></p>
            
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <input
                  type="text"
                  value={registrationData.profession}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, profession: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={registrationData.organization}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, organization: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-indian-red"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indian-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-indian-deepRed"
                >
                  Register
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CoursePage