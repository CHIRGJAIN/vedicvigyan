'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Library() {
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
              Digital <span className="text-gradient">Library</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive collection of Vedic texts, research papers, 
              books, and educational resources.
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
                <BookOpen size={48} className="text-indian-red" />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Coming Soon
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're building a comprehensive digital library that will provide access 
                to our extensive collection of Vedic texts, books, articles, and 
                educational resources.
              </p>
              
              <div className="bg-indian-red/5 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>What to expect:</strong> Digital books, research articles, 
                  educational materials, search functionality, and downloadable resources 
                  covering all aspects of Vedic knowledge and sciences.
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
COMMENTED OUT: All previous Library page content - to restore, uncomment everything below this line

The original Library page contained:
- Library tabs (books/articles)
- Search and filter functionality
- Book and article listings
- Download functionality
- Newsletter subscription
- Library statistics
- All library data and state management

To restore the full Library page functionality, uncomment the entire content above this comment block.
*/
