'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, BookOpen, Play, Download, Star, CheckCircle, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { format } from 'date-fns'

export default function Course() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showRegistration, setShowRegistration] = useState(false)

  const courses = {
    upcoming: [
      {
        id: 1,
        title: "Understanding Maharshi Bharadwaj's Vimaan Shastra",
        instructor: "Dr. Madhuri Sharon",
        duration: "12 Weeks",
        level: "Advanced",
        price: "₹15,000",
        startDate: "2024-03-01",
        seats: 25,
        enrolled: 18,
        description: "A comprehensive study of ancient Indian aviation technology as described in Maharshi Bharadwaj's Vimaan Shastra, exploring the scientific principles behind Vedic flying machines.",
        syllabus: [
          "Introduction to Vimaan Shastra and its historical context",
          "Analysis of ancient Sanskrit texts on aviation",
          "Study of Vedic materials and their properties",
          "Understanding Vedic propulsion systems",
          "Mathematical principles in Vedic aviation",
          "Practical applications and modern interpretations",
          "Comparative study with modern aviation technology",
          "Research methodology and documentation"
        ],
        faculty: [
          {
            name: "Dr. Madhuri Sharon",
            designation: "Course Director & Lead Instructor",
            expertise: "Vedic Sciences, Sanskrit Literature, Ancient Technology",
            experience: "25+ years in Vedic research and teaching"
          },
          {
            name: "Prof. Rajesh Verma",
            designation: "Co-Instructor",
            expertise: "Vedic Mathematics, Sanskrit Grammar",
            experience: "20+ years in Sanskrit studies"
          },
          {
            name: "Dr. Priya Sharma",
            designation: "Research Coordinator",
            expertise: "Vedic Astronomy, Ancient Indian Sciences",
            experience: "15+ years in Vedic astronomy research"
          }
        ],
        highlights: [
          "Access to rare manuscripts and texts",
          "Hands-on workshops and demonstrations",
          "Certificate from VVES upon completion",
          "Lifetime access to course materials",
          "Networking with fellow researchers",
          "Research publication opportunities"
        ]
      }
    ],
    ongoing: [
      {
        id: 2,
        title: "Vedic Mathematics Fundamentals",
        instructor: "Prof. Rajesh Verma",
        duration: "8 Weeks",
        level: "Beginner",
        price: "₹8,000",
        startDate: "2024-01-15",
        seats: 30,
        enrolled: 25,
        description: "Learn the ancient mathematical techniques from Vedic texts that enable rapid mental calculations.",
        progress: 60
      },
      {
        id: 3,
        title: "Sanskrit for Vedic Studies",
        instructor: "Dr. Priya Sharma",
        duration: "10 Weeks",
        level: "Intermediate",
        price: "₹10,000",
        startDate: "2024-01-20",
        seats: 20,
        enrolled: 15,
        description: "Master Sanskrit grammar and vocabulary essential for understanding Vedic texts.",
        progress: 40
      }
    ]
  }

  const testimonials = [
    {
      name: "Dr. Amit Patel",
      role: "Research Scholar",
      content: "The Vimaan Shastra course opened my eyes to the incredible depth of ancient Indian knowledge. Dr. Sharon's expertise is unmatched.",
      rating: 5
    },
    {
      name: "Prof. Meera Singh",
      role: "Academician",
      content: "Excellent course structure and comprehensive coverage of the subject. Highly recommended for serious researchers.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Student",
      content: "The practical workshops and access to original texts made this course truly exceptional.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indian-red/10 via-indian-maroon/20 to-indian-gold/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive courses on Vedic sciences, designed to bridge ancient wisdom with modern understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-indian-red text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming Courses
              </button>
              <button
                onClick={() => setActiveTab('ongoing')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
                  activeTab === 'ongoing'
                    ? 'bg-indian-red text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ongoing Courses
              </button>
            </div>
          </div>

          {/* Course List */}
          <div className="space-y-8">
            {courses[activeTab as keyof typeof courses].map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Course Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-indian-red font-semibold mb-2">Instructor: {course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-indian-red">{course.price}</div>
                        <div className="text-sm text-gray-600">Course Fee</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

                    {/* Course Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm">Starts {format(new Date(course.startDate), 'dd/MM/yyyy')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-2" />
                        <span className="text-sm">{course.enrolled}/{course.seats} Enrolled</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <BookOpen size={16} className="mr-2" />
                        <span className="text-sm">{course.level}</span>
                      </div>
                    </div>

                    {/* Progress Bar for Ongoing Courses */}
                    {activeTab === 'ongoing' && 'progress' in course && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Course Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indian-red h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {activeTab === 'upcoming' ? (
                        <>
                          <button
                            onClick={() => setShowRegistration(true)}
                            className="btn-primary flex items-center justify-center"
                          >
                            <ArrowRight size={16} className="mr-2" />
                            Register Now
                          </button>
                          <button className="btn-secondary flex items-center justify-center">
                            <Download size={16} className="mr-2" />
                            Download Flyer
                          </button>
                        </>
                      ) : (
                        <button className="btn-primary flex items-center justify-center">
                          <Play size={16} className="mr-2" />
                          Continue Learning
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Course Image/Preview */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-100 rounded-lg p-6 h-full flex flex-col justify-center items-center">
                      <div className="w-32 h-32 bg-indian-red rounded-full flex items-center justify-center mb-4">
                        <BookOpen size={48} className="text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-center mb-2">Course Preview</h4>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Watch introduction video and download course materials
                      </p>
                      <button className="btn-accent flex items-center">
                        <Play size={16} className="mr-2" />
                        Watch Preview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detailed Syllabus for Upcoming Courses */}
                {activeTab === 'upcoming' && 'syllabus' in course && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4">Course Syllabus</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.syllabus.map((topic, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle size={20} className="text-indian-red mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Faculty Details for Upcoming Courses */}
                {activeTab === 'upcoming' && 'faculty' in course && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4">Course Faculty</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {course.faculty.map((member, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-1">{member.name}</h5>
                          <p className="text-indian-red text-sm mb-2">{member.designation}</p>
                          <p className="text-sm text-gray-600 mb-2">{member.expertise}</p>
                          <p className="text-xs text-gray-500">{member.experience}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Highlights for Upcoming Courses */}
                {activeTab === 'upcoming' && 'highlights' in course && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4">Course Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center">
                          <Star size={16} className="text-indian-gold mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Testimonials from course participants</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-indian-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Course Registration</h3>
              <button
                onClick={() => setShowRegistration(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Educational Background</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent">
                  <option>Select your background</option>
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Ph.D.</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join this course?</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Submit Registration
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}



