"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, UserPlus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CourseModal from '../../components/CourseModal'

const SYLLABUS_PLACEHOLDER_TEXT =
  'We will give the syllabus only to enrolled students at the beginning of each course.'

const normalizeSyllabusPlaceholder = (value: string) =>
  value.replace(/^\d+\.?\s*/, '').trim()

const isSyllabusPlaceholder = (value: string) =>
  normalizeSyllabusPlaceholder(value) === SYLLABUS_PLACEHOLDER_TEXT

const CoursesPage = () => {
  // selectedCourse stores the full course object when modal is open
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null)

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)


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
        'Mastery of traditional bows, arrows, and shooting techniques from Dhanurveda.',
        'Understanding of historical weaponry, warrior ethics, and cultural heritage.',
        'Development of focus, balance, strength, and precision through practice.',
        'Knowledge of arrow types, flight dynamics, and ancient training methods.',
        "Combines martial discipline with cultural enrichment, connecting to India's ancient legacy."
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
        'Understand basic microbiological principles.',
        'Identify Ayurvedic and Vedic references to subtle life forms.',
        "Analyze ancient Indian texts' concepts of disease and health.",
        'Compare ancient healing practices with modern microbiological insights.',
        'Appreciate intuitive knowledge of ancient seers while applying modern scientific rigor.',
        'Think critically about integrating traditional and modern knowledge.'
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
        'Compare ancient methods with modern astronomy and recognize continuities and differences.',
        'Appreciate the cosmological vision (yugas, time cycles).',
        'Apply selected computational methods (e.g., sine table, planetary positions, and eclipse prediction).',
        'Understand and interpret the astronomical framework (planetary motions, eclipses, calendars).',
        'The significance and historical development of the Sūrya Siddhānta within the Siddhānta tradition.'
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
        'Need of the course, philosophy, present status of IKS-related literature, and areas to be explored.'
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
        '1. Basic concepts and terminologies',
        '2. Scientific comparison',
        '3. Less known aspects from scriptures.'
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
        'Understand the foundations of Nyāyashāstra—its purpose, reasoning methods, and role in decision-making.',
        'Apply Pratyakṣa (perception) and Anumāna (inference) in professional and personal judgments.',
        'Use Tarka (debate) and Vāda (dialogue) for conflict resolution and collaborative problem-solving.',
        'Identify and avoid Hetvābhāsa (logical fallacies) in academic and workplace situations.',
        'Practice structured thinking through real-world case studies and performance evaluations.'
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
        '1. Basic Time Calculation.',
        '2. Concept of Yuga.',
        '3. Concept of Yuga.',
        '4. Kaliyuga.'
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
        '1. Encoding the Infinite in the Finite.',
        '2. Preserving Esoteric Knowledge.',
        '3. Ritual as Cosmic Drama.',
        '4. Multiple Layers of Meaning.',
        '5. Facilitating Inner Transformation.'
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
        '1. What Is the Prasthanatrayi?',
        '2. Why Study the Prasthanatrayi?',
        '3. To Integrate Knowledge, Action, and Devotion.',
        '4. To Cultivate Ethical and Spiritual Leadership.',
        '5. To Bridge Ancient Wisdom with Modern Inquiry.'
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
        '1. Modern theories of origin of universe.',
        '2. Naad Brahma and the Big Bang theory of origin of the universe.',
        '3. Quest through Nasadiya Sukta, conversion of energy to matter via Pourush Suktam, and creation via Hiranyagarbha Suktam from the 10th Mandal of Rig Veda.',
        '4. Philosophical depth and scientific interpretation of creation as an ongoing process and Multiverse theory.',
        '5. Integration with modern inquiry.'
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
        '1. Aerospace concepts ahead of their time.',
        '2. Materials science and metallurgy.',
        '3. Advanced energy systems.',
        '4. Cognitive and symbolic modelling.',
        '5. Cultural and ethical innovation.'
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
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indian-red via-indian-gold to-indian-maroon" />
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-indian-red font-medium mt-1">Instructor: {course.instructor}</p>
                  </div>
                  <span className="bg-indian-red/10 text-indian-red font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                    {formatPrice(course.price)}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-medium text-xs uppercase tracking-wide ${
                      course.online
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {course.online ? 'Online' : 'Offline'}
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll learn</h4>
                  <ul className="space-y-2">
                    {course.curriculum.slice(0, 3).map((item, idx) => {
                      const isPlaceholder = isSyllabusPlaceholder(item)
                      const displayText = isPlaceholder ? SYLLABUS_PLACEHOLDER_TEXT : item

                      return (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="mt-0.5 text-green-500" />
                          <span className={isPlaceholder ? 'font-semibold' : undefined}>{displayText}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <button
                  onClick={() => handleCourseSelect(course.id)}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-indian-red to-indian-deepRed text-white font-semibold py-3 transition-all duration-300 hover:from-indian-deepRed hover:to-indian-maroon"
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
        />
      )}

      <Footer />
    </div>
  )
}

export default CoursesPage
