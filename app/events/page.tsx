'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Events() {
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
              Events & <span className="text-gradient">Workshops</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our events, workshops, and conferences to explore Vedic sciences 
              and connect with fellow researchers and enthusiasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-24 h-24 bg-indian-red/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Calendar size={48} className="text-indian-red" />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Coming Soon
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're working hard to bring you an amazing events and workshops experience. 
                Stay tuned for updates on upcoming Vedic science conferences, workshops, 
                and educational events.
              </p>
              
              <div className="bg-indian-red/5 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>What to expect:</strong> Interactive workshops, expert-led conferences, 
                  hands-on learning sessions, and networking opportunities with fellow Vedic science enthusiasts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* 
COMMENTED OUT: All previous Events page content - to restore, uncomment everything below this line

The original Events page contained:
- Event tabs (upcoming/past events)
- Event listings with detailed information
- Event registration functionality
- Event calendar
- Past events media modal
- All event data and state management

To restore the full Events page functionality, uncomment the entire content above this comment block.
*/






