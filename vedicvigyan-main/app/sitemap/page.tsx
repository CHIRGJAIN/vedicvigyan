'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Map } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const sitemapSections = [
  {
    title: 'Main',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { name: 'Courses', href: '/courses' },
      { name: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Research', href: '/research' },
      { name: 'Library', href: '/library' },
    ],
  },
]

export default function Sitemap() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative py-20 bg-gradient-to-br from-indian-red/10 via-indian-maroon/20 to-indian-gold/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Sitemap</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore all public pages and key sections of the Vedic Vigyanam Explorer Society site.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="w-20 h-20 bg-indian-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Map size={40} className="text-indian-red" />
              </div>
              <p className="text-center text-gray-600 mb-10">
                Find the right destination quickly with these direct links.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sitemapSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-700 hover:text-indian-red transition-colors duration-300"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
