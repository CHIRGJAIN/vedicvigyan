"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, DollarSign, CheckCircle, UserPlus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import CourseModal from '../../components/CourseModal'

const CoursesPage = () => {
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
      name: 'Dhanurveda',
      instructor: 'Anantha M.A',
      description: 'Learn the ancient art and science of archery and warfare as described in the Vedic texts.',
      duration: '6 hours',
      students: 25,
      price: 1500,
      online: true,
      // rating: 4.8,
      features: [
        'Live interactive sessions',
        'Study materials and resources',
        'Certificate upon completion',
        '24/7 support',
        'Access to VVES community'
      ],
      curriculum: [
        'Brainstorming about TIA',
        'Introduction to the subject',
        'Pedagogy (Teaching techniques) through guru-shishya-parampara',
        'Practical Application',
        'Inter-disciplinary aspects',
        'Multi-disciplinary aspect',
        'Trans-disciplinary aspects'
      ]
    },
    {
      id: 2,
      name: 'Sookshma Jivany in Veda',
      instructor: 'Anuradha Dubey',
      description: 'Explore the subtle life forces and energies as described in Vedic literature.',
      duration:  '4 hours',
      students: 32,
      price: 1500,
      online: true,
      // rating: 4.6,
      features: [
        'In-depth Vedic studies',
        'Energy and consciousness exploration',
        'Practical applications',
        'Expert guidance',
        'Research materials'
      ],
      curriculum: [
        'Introduction to Microbiology (Modern Science)',
        'Overview of Vedic Literature and Ayurveda',
        'Ancient References to Invisible Life',
        'Traditional Practices with Microbiological Relevance Limitations and Critical Thinking'
      ]
    },
    {
      id: 3,
      name: 'The Cosmic Wisdom of the Sūrya Siddhānta',
      instructor: 'Dr. Mrunal Yawalkar',
      description: 'Master the ancient astronomical treatise and its profound cosmic insights.',
      duration: '4 hours',
      students: 28,
      price: 1500,
      online: true,
      // rating: 4.9,
      features: [
        'Ancient astronomy principles',
        'Mathematical calculations',
        'Cosmic cycles understanding',
        'Real-world applications',
        'Advanced topics'
      ],
      curriculum: [
        'Introduction to Sūrya Siddhānta',
        'Astronomical Principles',
        'Cosmological Framework',
        'Mathematical Techniques',
        'Relevance and Legacy'
      ]
    },
    {
      id: 4,
      name: 'Indian Knowledge System',
      instructor: 'Prof. Sanjay Kumar Sharma',
      description: 'Comprehensive study of traditional Indian knowledge systems and their contemporary relevance.',
      duration: '4 hours',
      students: 38,
      price: 1000,
      online: true,
      // rating: 4.7,
      features: [
        'Traditional knowledge exploration',
        'Modern relevance analysis',
        'Research methodology',
        'Academic perspective',
        'Expert guidance'
      ],
      curriculum: [
        'We will give the syllabus only to enrolled students at the beginning of each course.'
      ]
    },
    {
      id: 5,
      name: 'Sristi and Samskritam',
      instructor: 'Venkat Rangan M.C',
      description: 'Understanding creation theories and the role of Sanskrit in preserving ancient wisdom.',
      duration: '4 hours',
      students: 50,
      price: 1500,
      online: true,
      // rating: 4.8,
      features: [
        'Creation theories study',
        'Sanskrit language focus',
        'Ancient texts analysis',
        'Cultural preservation',
        'Language applications'
      ],
      curriculum: [
        'Basic Concepts',
        'States of Evolution',
        'Sanskrit and Creation',
        'Science Concepts'
      ]
    },
    {
      id: 6,
      name: 'Nyaya Shastra',
      instructor: 'Vijay Khambete & Anantha+Naresh',
      description: 'Master the ancient Indian system of logic and reasoning.',
      duration: '36 hours',
      students: 50,
      price: 6000,
      online: false,
      // rating: 4.9,
      features: [
        'Logical reasoning systems',
        'Ancient Indian logic',
        'Problem-solving methods',
        'Critical thinking',
        'Expert instruction'
      ],
      curriculum: [
        'Introduction to Nyāyashāstra, Pratyakṣa & Anumāna in workplace decisions.',
	      'Tarka & Vāda for conflict resolution, recognizing Hetvābhāsa through interactive case studies.',
        'Practical applications in HR—simulated appraisals, feedback models, and structured reasoning practice.',
      ]
    },
    {
      id: 7,
      name: 'Yuga Concept (Time calculations)',
      instructor: 'Vijay Vadnere',
      description: 'Understanding the Vedic concept of time cycles and their calculations.',
      duration: '4 days',
      students: 50,
      price: 1500,
      online: true,
      // rating: 4.5,
      features: [
        'Basic Time Calculation.',
        'Concept of Yuga.',
        'Concept of Yuga. ',
        'Kaliyuga.'
      ],
      curriculum: [
        'Introduction of Time calculation in different Yuga.'
      ]
    },
    {
      id: 8,
      name: 'Veda and Sacred Symbolism',
      instructor: 'Dr. Madhuri Sharon',
      description: 'Explore the profound symbolism embedded in Vedic texts and their deeper meanings.',
      duration: '5 hours',
      students: 50,
      price: 1500,
      online: true,
      // rating: 4.8,
      features: [
        'Encoding the Infinite in the Finite.',
        'Preserving Esoteric Knowledge.',
        'Ritual as Cosmic Drama.',  
        'Multiple Layers of Meaning.',
        'Facilitating Inner Transformation.'
      ],
      curriculum: [
        'We will give the syllabus only to enrolled students at the beginning of each course.'
        
      ]
    },
    {
      id: 9,
      name: 'Prasthānatrayī',
      instructor: 'Dr. Madhuri Sharon',
      description: 'Study of the three foundational texts of Vedanta philosophy.',
      duration: '5 hours',
      students: 50,
      price: 1500,
      online: true,
      // rating: 4.9,
      features: [
        'What Is the Prasthanatrayi?',
        'Why Study the Prasthanatrayi?',
        'To Integrate Knowledge, Action, and Devotion.',
        'To Cultivate Ethical and Spiritual Leadership. ',
        'To Bridge Ancient Wisdom with Modern Inquiry.'
      ],
      curriculum: [
        'We will give the syllabus only to enrolled students at the beginning of each course.'
      ]
    },
    {
      id: 10,
      name: 'Origin of Universe through the Eyes of Veda',
      instructor: 'Dr. Madhuri Sharon',
      description: 'Understanding the Vedic perspective on the origin and evolution of the universe.',
      duration: '22 hours',
      students: 50,
      price: 5000,
      online: true,
      // rating: 4.7,
      features: [
        'Cosmological studies',
        'Vedic universe theories',
        'Scientific connections',
        'Philosophical insights',
        'Research methodology'
      ],
      curriculum: [
        'We will give the syllabus only to enrolled students at the beginning of each course.'
      ]
    },
    {
      id: 11,
      name: 'Science & Technology in Vimaan Shastra',
      instructor: 'VVES Group',
      description: 'Explore the ancient science of aerial vehicles and advanced technology as described in Vedic texts.',
      duration: '34 hours',
      students: 50,
      price: 6000,
      online: true,
      // rating: 4.8,
      features: [
        'Ancient technology study',
        'Aerospace principles',
        'Advanced engineering concepts',
        'Historical analysis',
        'Modern applications'
      ],
      curriculum: [
        'We will give the syllabus only to enrolled students at the beginning of each course.'
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
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-indian-red font-semibold">Instructor: {course.instructor}</p>
                </div>
                
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
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

export default CoursesPage
