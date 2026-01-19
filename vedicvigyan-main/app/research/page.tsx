'use client'

import { motion } from 'framer-motion'
import { FileText, Download, ExternalLink } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Research() {
  const researchPapers = [
    {
      title: 'Adrishya Vimaan',
      description: 'A foundational study on Vedic science and its modern applications.',
      authors: 'VVES Research Team',
      href: '/research/Adrishya%20Vimaan.pdf',
      tags: ['Vedic Science', 'IKS'],
    },
    {
      title: 'Gita-Arthashastra.pdf',
      description: 'Exploring interdisciplinary insights from Sanskrit and traditional knowledge systems.',
      authors: 'VVES Research Team',
      href: '/research/Gita-Arthashastra.pdf',
      tags: ['Sanskrit', 'Traditional Knowledge'],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Research Papers Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Research Papers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse and download the latest research publications from VVES.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchPapers.map((paper) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{paper.title}</h3>
                    <p className="text-sm text-indian-red font-semibold mt-1">{paper.authors}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indian-red/10 flex items-center justify-center">
                    <FileText size={22} className="text-indian-red" />
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5">{paper.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indian-red text-white font-semibold px-4 py-2 transition-colors hover:bg-indian-deepRed"
                  >
                    <ExternalLink size={16} />
                    View PDF
                  </a>
                  <a
                    href={paper.href}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 text-gray-700 font-semibold px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
