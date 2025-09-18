'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Research() {
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
              Research & <span className="text-gradient">Development</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advancing the understanding of Vedic sciences through rigorous research, 
              innovative methodologies, and collaborative studies.
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
                <Search size={48} className="text-indian-red" />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Coming Soon
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're developing a comprehensive research platform that will showcase our 
                ongoing studies, published papers, and collaborative research projects in 
                Vedic sciences.
              </p>
              
              <div className="bg-indian-red/5 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>What to expect:</strong> Research papers, ongoing projects, 
                  collaboration opportunities, and access to our digital research library 
                  with publications on Vedic mathematics, astronomy, medicine, and more.
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
COMMENTED OUT: All previous Research page content - to restore, uncomment everything below this line

The original Research page contained:
- Research areas with filtering
- Research papers with search functionality
- Ongoing research projects
- Research impact statistics
- Download and citation features
- All research data and state management

To restore the full Research page functionality, uncomment the entire content above this comment block.
*/

