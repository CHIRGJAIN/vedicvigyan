'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, BookOpen, Award, ArrowRight, Quote, Calendar, MapPin, Clock, X } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { format } from 'date-fns'
import Footer from '@/components/Footer'

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [currentSubhashit, setCurrentSubhashit] = useState(0)
  const [showFounderModal, setShowFounderModal] = useState(false)

  const subhashits = [
    {
      sanskrit: "विद्या ददाति विनयं विनयाद् याति पात्रताम्। पात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुखम्॥",
      english: "Knowledge gives discipline, discipline gives worthiness, worthiness gives wealth, wealth gives righteousness, and righteousness gives happiness.",
      meaning: "The path to happiness through knowledge and discipline"
    },
    {
      sanskrit: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।",
      english: "Truth alone triumphs, not falsehood. By truth, the divine path is spread wide.",
      meaning: "The victory of truth over falsehood"
    },
    {
      sanskrit: "अहिंसा परमो धर्मः धर्मस्य प्रभुः परमः।",
      english: "Non-violence is the highest duty, the highest duty is the supreme lord.",
      meaning: "The principle of non-violence as the highest virtue"
    }
  ]

  // COMMENTED OUT: partners list - removed from rendered homepage but kept for easy restore
  // const partners = [
  //   { name: 'IIT Mumbai', logo: '/images/partners/iit-mumbai.png' },
  //   { name: 'BHU Varanasi', logo: '/images/partners/bhu.png' },
  //   { name: 'Sanskrit University', logo: '/images/partners/sanskrit-uni.png' },
  //   { name: 'Vedic Research Institute', logo: '/images/partners/vri.png' },
  // ]

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor, Sanskrit Studies',
      content: 'VVES has been instrumental in bridging the gap between ancient Vedic wisdom and modern scientific understanding.',
      avatar: '/images/testimonials/dr-rajesh.jpg'
    },
    {
      name: 'Prof. Priya Sharma',
      designation: 'Research Scholar',
      content: 'The courses offered by VVES have deepened my understanding of Vedic sciences and their practical applications.',
      avatar: '/images/testimonials/prof-priya.jpg'
    },
    {
      name: 'Amit Patel',
      designation: 'Student Member',
      content: 'Being part of VVES has opened new horizons in my understanding of our ancient knowledge systems.',
      avatar: '/images/testimonials/amit-patel.jpg'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Vedic Science Workshop',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'VVES Auditorium',
      description: 'Interactive workshop on Vedic mathematics and astronomy'
    },
    {
      title: 'Sanskrit Learning Session',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Online',
      description: 'Beginner-friendly Sanskrit learning session'
    }
  ]

  useEffect(() => {
    // Simulate visitor count
    setVisitorCount(15450)
    
    // Rotate subhashit every 10 seconds
    const interval = setInterval(() => {
      setCurrentSubhashit((prev) => (prev + 1) % subhashits.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [subhashits.length])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Announcement Ticker */}
      <section className="bg-indian-maroon text-white">
        <div className="w-full py-2">
          <div className="marquee-shell h-8 flex items-center">
            <div className="marquee-track">
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="marquee-group" aria-hidden={groupIndex === 1}>
                  {[...Array(4)].map((_, index) => (
                    <span key={`${groupIndex}-${index}`} className="uppercase tracking-[0.001em] text-sm font-semibold">
                      VVES starting a New course on Indian Knowledge System by Prof. Sanjay Kumar Sharma
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with spiritual landscape */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/spiritual_3.jpg')] bg-cover" style={{backgroundPosition: 'center bottom'}}></div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Additional gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-indian-red/20 via-indian-maroon/30 to-indian-gold/20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden bg-white/80 border border-white/70 shadow-2xl backdrop-blur">
                <Image src="/vves-logo(1).png" alt="VVES logo" width={190} height={96} className="object-contain drop-shadow-lg" />
                <span className="sr-only">Vedic Vigyanam Explorer Society</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'}}>
                Vedic Vigyanam Explorer Society
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white drop-shadow-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Preserving and Interpreting Vedic Science
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto text-white drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                Leading authority in the preservation and interpretation of Vedic Science, 
                integrating it into modern academic and cultural frameworks.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/courses" className="btn-primary text-lg px-8 py-4">
                Explore Courses
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
              <Link href="/contact" className="btn-accent text-lg px-8 py-4">
                Join Us
              </Link>
            </div>

            {/* Visitor Counter */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto border border-white/30 shadow-2xl">
              <p className="text-lg mb-2 text-white font-semibold drop-shadow-md">Total Visitors</p>
              <div className="text-3xl font-bold text-indian-gold drop-shadow-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                <CountUp end={visitorCount} duration={2.5} separator="," />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Message from our founder */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Message from our founder</h2>
            <p className="text-lg text-gray-600">A note from Dr. Madhuri Sharon</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-0 cursor-pointer min-h-[22rem] lg:min-h-[26rem]"
            onClick={() => setShowFounderModal(true)}
          >
            <div className="relative lg:col-span-1">
              <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-[28rem] overflow-hidden">
                <img
                  src="/images/dr-sharon/portrait.jpg"
                  alt="Dr. Madhuri Sharon"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-gray-500">Image not available</span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10 flex flex-col justify-center lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Madhuri Sharon</h3>
                <p className="text-lg font-semibold text-indian-red">Founder</p>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An internationally acclaimed nanotechnologist and educator, Dr. Sharon bridges modern research with ancient Indian knowledge systems. Her work spans nanotechnology, biotechnology, Sanatana Dharma, and Vimaan Shastra, guiding scholars to explore Vedic sciences with academic rigor.
                </p>
                <p>
                  At VVES she mentors research, curriculum, and collaborations, ensuring our initiatives unite scientific excellence with the depth of Vedic wisdom to inspire the next generation of explorers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showFounderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFounderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indian-red to-indian-gold rounded-full overflow-hidden flex items-center justify-center">
                      <img
                        src="/images/dr-sharon/portrait.jpg"
                        alt="Dr. Madhuri Sharon"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Dr. Madhuri Sharon</h3>
                      <p className="text-indian-red font-semibold">Founder</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFounderModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close founder message"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>
                    Dr. Madhuri Sharon is an internationally recognized scientist with a PhD from Leicester University, UK, and postdoctoral research at Bolton Institute of Technology. She currently serves as Director of Sharon Institute of Nanotechnology, Visiting Professor at MNIT, Adjunct Faculty at SRIVIT, Marg-Darshak at Bhishma IKS, and Advisor to Bhishma Sanatan Vedic Hindu University in the US.
                  </p>
                  <p>
                    Her expertise spans nanotechnology, biotechnology, Sanatana Dharma, Vimaan Shastra, and the Vedas. She has authored 19 books, 251 research articles, and holds 18 patents, guiding 14 PhD students and over 180 postgraduate students. Her leadership bridges cutting-edge science, ancient Indian knowledge systems, and global cultural exchange.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowFounderModal(false)}
                    className="w-full bg-indian-red text-white py-3 px-6 rounded-lg hover:bg-indian-deepRed transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Lecture</h2>
            <p className="text-xl text-gray-600">from Dr. Madhuri Sharon</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 flex flex-col items-center justify-center text-white text-center p-6">
                <p className="text-2xl font-semibold mb-2">Introduction video coming soon</p>
                <p className="text-sm text-gray-200 max-w-xl">
                  We are preparing a fresh welcome lecture from Dr. Madhuri Sharon. Check back shortly to watch it here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Did You Know?</h2>
            <p className="text-xl text-gray-600">Discover fascinating insights about Vedic Science</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-indian-red rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ancient Knowledge</h3>
              <p className="text-gray-600">
                Within our Vedas and Puranas lie hidden nuggets of knowledge - their science still waiting to be unearthed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-indian-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Applications</h3>
              <p className="text-gray-600">
                Validation of the ancient wisdom preserved in the Vedas, Puranas, Scriptures, and Treatises, uncovering their scientific wisdom and revealing its relevance to modern fields and sustainable innovations through contemporary scientific methods.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-indian-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Community</h3>
              <p className="text-gray-600">
                VVES connects scholars, researchers, and enthusiasts worldwide to explore 
                and preserve Vedic knowledge for future generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sanskrit Subhashit Section */}
      <section className="section-padding bg-indian-maroon text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-8">Daily Sanskrit Wisdom</h2>
          <motion.div
            key={currentSubhashit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-custom rounded-xl p-8 mb-6">
              <p className="text-2xl mb-4 hindi-text leading-relaxed">
                {subhashits[currentSubhashit].sanskrit}
              </p>
              <p className="text-lg mb-3 italic">
                "{subhashits[currentSubhashit].english}"
              </p>
              <p className="text-sm text-gray-300">
                {subhashits[currentSubhashit].meaning}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMMENTED OUT: Partners Section - removed from homepage but kept for restoration
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners & Collaborators</h2>
            <p className="text-xl text-gray-600">Working together to preserve and promote Vedic knowledge</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-center text-sm">
                    {partner.name}
                  </span>
                </div>
                <p className="text-center font-medium text-gray-700">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Testimonials Section */}
      {/* Why Join VVES Section */}
      {/* QR Code Registration Section */}

      <Footer />
    </div>
  )
}
