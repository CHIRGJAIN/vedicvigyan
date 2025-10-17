'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import ReactPlayer from 'react-player'
import { Play, Users, BookOpen, Award, ArrowRight, Quote, Calendar, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { format } from 'date-fns'
import Footer from '@/components/Footer'

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentSubhashit, setCurrentSubhashit] = useState(0)

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
                <div className="w-30 h-30 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden bg-transparent">
                <Image src="/vves-logo(1).png" alt="VVES logo" width={190} height={96} className="object-contain" />
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

      {/* Video Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Lecture</h2>
            <p className="text-xl text-gray-600">from Dr. Madhuri Sharon</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
              {!isVideoPlaying ? (
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="flex items-center space-x-3 bg-indian-red text-white px-8 py-4 rounded-lg hover:bg-indian-deepRed transition-colors duration-300"
                  >
                    <Play size={24} />
                    <span className="text-lg font-semibold">Watch Introduction</span>
                  </button>
                </div>
              ) : (
                <ReactPlayer
                  url="/videos/intro.mp4"
                  width="100%"
                  height="100%"
                  controls
                  playing
                  onEnded={() => setIsVideoPlaying(false)}
                />
              )}
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
