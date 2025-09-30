'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Users, BookOpen, Target, Eye, Heart, Calendar, MapPin, Phone, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Founder {
  name: string
  designation: string
  shortDescription: string
  fullDescription: string
  image: string
}

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null)

  const founders: Founder[] = [
    {
      name: 'Dr. Madhuri Sharon',
      designation: 'Founder & Director',
      shortDescription: 'Internationally recognized scientist with PhD from Leicester University, UK, and postdoctoral research at Bolton Institute of Technology.',
      fullDescription: 'Dr. Madhuri Sharon is an internationally recognized scientist with a PhD from Leicester University, UK, and postdoctoral research at Bolton Institute of Technology. She currently serves as Director of Sharon Institute of Nanotechnology, Visiting Professor at MNIT, Adjunct Faculty at SRIVIT, Marg-Darshak at Bhishma IKS, and Advisor to Bhishma Sanatan Vedic Hindu University in the US. She also holds senior industrial positions including MD of MONAD and Technical Director at Vasudhaiv and NanoWealth. Her expertise spans nanotechnology, biotechnology, Sanatana Dharma, spirituality, Vimaan Shastra, and the Vedas. She has authored 19 books, 251 research articles, and holds 18 patents, guiding 14 PhD students and over 180 postgraduate students.',
      image: '/images/dr-sharon/portrait.jpg'
    },
    {
      name: 'Dr. Sanjay Kumar Sharma',
      designation: 'Co-Founder',
      shortDescription: 'Former Dean and Professor at Gautam Buddha University with extensive experience across ISRO, CSIR, DRDO, MHRD, IUAC and MoEFCC.',
      fullDescription: 'Former Dean and Professor at Gautam Buddha University with extensive experience across ISRO, CSIR, DRDO, MHRD, IUAC and MoEFCC. He blends ancient and contemporary science, from AI to electronics, and is known as a living library of knowledge and ancient wisdom.',
      image: '/images/dr-sharon/image.png'
    },
    {
      name: 'Dr. Anantha M.A',
      designation: 'Co-Founder',
      shortDescription: 'Ph.D. & M.A. (Nyaya Vidvat Uttama), Assistant Professor at CTKDSI, Trans Disciplinary University.',
      fullDescription: 'Ph.D. & M.A. (Nyaya Vidvat Uttama), Assistant Professor at CTKDSI, Trans Disciplinary University. Expert in Sanskrit, Kannada, Hindi, and English, he has published and edited books and articles and is vital to Vimaan Shastra studies.',
      image: '/images/dr-sharon/image_1.png'
    },
    {
      name: 'Dr. Mrunal Yawalkar',
      designation: 'Co-Founder',
      shortDescription: 'Ph.D. in Physics and Assistant Professor at RTM Nagpur University for eight years, now a freelance researcher.',
      fullDescription: 'Ph.D. in Physics and Assistant Professor at RTM Nagpur University for eight years, now a freelance researcher. She has published multiple articles and a book chapter, with deep interest in ancient aeronautics and metallurgy.',
      image: '/images/dr-sharon/image_2.png'
    },
    {
      name: 'Ms. Anuradha Pandey-Dubey',
      designation: 'Co-Founder',
      shortDescription: 'M.Sc. in Biotechnology and 15 years as Assistant Professor. Author of a book and several chapters.',
      fullDescription: 'M.Sc. in Biotechnology and 15 years as Assistant Professor. Author of a book and several chapters, she holds a patent and is pursuing a PhD in bionanotechnology while being a member of the Royal Society of Chemistry.',
      image: '/images/dr-sharon/image_3.png'
    },
    {
      name: 'Mr. Venkat Rangan M.C.',
      designation: 'Co-Founder',
      shortDescription: 'B.E. Electronics and Communication with PMP certification, expert in embedded software applications.',
      fullDescription: 'B.E. Electronics and Communication with PMP certification, expert in embedded software applications in the automotive domain. A lifelong Vimaan enthusiast, he combines engineering expertise with a passion for Sanskrit and Puranas.',
      image: '/images/dr-sharon/image_4.png'
    },
    {
      name: 'Mr. Vijay Khambete',
      designation: 'Co-Founder',
      shortDescription: 'An IT professional with an MBA and multiple postgraduate diplomas. He is the pillar of VVES.',
      fullDescription: 'An IT professional with an MBA and multiple postgraduate diplomas. He is the pillar of VVES, passionately advocating for ancient Indian aeronautics and demonstrating remarkable project-management and recruitment skills.',
      image: '/images/dr-sharon/image_5.png'
    },
    {
      name: 'Prof. (Dr.) Naresh Kumar Vats',
      designation: 'Co-Founder',
      shortDescription: 'Dean Academic and Finance Officer, former Registrar RGNUL Punjab, and Professor of Law.',
      fullDescription: 'Dean Academic and Finance Officer, former Registrar RGNUL Punjab, and Professor of Law. With over 36 research papers, 160 conference presentations, and 32 edited books, he is a leading figure in law and academic leadership.',
      image: '/images/dr-sharon/image_6.png'
    },
    {
      name: 'Mr. Vijay Madhukar Vadnere',
      designation: 'Co-Founder',
      shortDescription: 'Director at S.V. Ved Yantra Pvt. Ltd. with 39 years of experience in DOCSIS, CATV, and HFC networks.',
      fullDescription: 'Director at S.V. Ved Yantra Pvt. Ltd. with 39 years of experience in DOCSIS, CATV, and HFC networks. He is also a Limca Book record holder and expert in network design and Ayurvedic engineering concepts.',
      image: '/images/dr-sharon/image_7.png'
    },
    {
      name: 'Aashish Kumar',
      designation: 'Co-Founder',
      shortDescription: 'Engineering student specializing in Electronics and Communication with AI and ML at Gautam Buddha University.',
      fullDescription: 'Engineering student specializing in Electronics and Communication with AI and ML at Gautam Buddha University. Treasurer of VVES, he integrates traditional knowledge with modern technology through projects in IoT, aerospace, and 3D printing.',
      image: '/images/dr-sharon/image_8.png'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + founders.length) % founders.length)
  }

  const openModal = (founder: Founder) => {
    setSelectedFounder(founder)
  }

  const closeModal = () => {
    setSelectedFounder(null)
  }

  const milestones = [
    {
      year: ' June 2023',
      title: 'Foundation',
      description: 'Main Core members had undergone Viman Vidya course conducted by Bhisma School of Indic Studies with Dr. Madhuri Sharon as leading faculty.'
    },
    {
      year: 'October 2023',
      title: 'First Course Launch',
      description: 'Under the guidance of Dr. Madhuri Sharon this group of 8 students out of 50 who attended that course decided to carry forward this knowledge by doing R & D work with main focus on Maharshi Bharadwaj’s Vaimanik Shastra'
    },
    {
      year: 'June 2024',
      title: 'International Recognition',
      description: 'Decided to form a group as a society with a mission to Explore, Interpret and Preserve the Vedic Science to Reinforce its Relevance and disseminate the knowledge in Modern Society'
    },
    {
      year: '2024',
      title: 'Digital Library',
      description: 'Launched comprehensive digital library with over 1000 Vedic texts'
    },
    {
      year: ' Jan 2025',
      title: 'Global Expansion',
      description: 'We officially registered as VEDIC VIGYANAM EXPLORER SOCIETY with office at Kurukshetra'
    },
    {
      year: ' September 2025',
      title: 'Global Expansion',
      description: 'VVES is now in an advanced stage of rolling out a few in-depth courses based on Vedic systems.'
    }
  ]

  const partners = [
    { name: 'IIT Mumbai', type: 'Academic Partner', logo: '/images/partners/iit-mumbai.png' },
    { name: 'BHU Varanasi', type: 'Research Partner', logo: '/images/partners/bhu.png' },
    { name: 'Sanskrit University', type: 'Academic Partner', logo: '/images/partners/sanskrit-uni.png' },
    { name: 'Vedic Research Institute', type: 'Research Partner', logo: '/images/partners/vri.png' },
    { name: 'Ministry of Culture', type: 'Government Partner', logo: '/images/partners/moc.png' },
    { name: 'UNESCO', type: 'International Partner', logo: '/images/partners/unesco.png' }
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
              About <span className="text-gradient">VVES</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading authority in the preservation and interpretation of Vedic Science, 
              integrating it into modern academic and cultural frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indian-red rounded-full flex items-center justify-center mr-4">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To preserve, research, and disseminate the ancient wisdom of Vedic sciences, 
                making this knowledge accessible to modern scholars, researchers, and enthusiasts 
                while maintaining the authenticity and depth of traditional understanding.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We strive to bridge the gap between ancient Vedic knowledge and contemporary 
                scientific understanding, fostering a deeper appreciation for India's rich 
                intellectual heritage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indian-gold rounded-full flex items-center justify-center mr-4">
                  <Eye size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>"To become a leading authority in the preservation and interpretation 
                of Vedic Science, integrating it into modern academic and cultural frameworks."</strong>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a world where Vedic knowledge is recognized as a valuable resource 
                for addressing contemporary challenges, contributing to global understanding 
                of science, philosophy, and human potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message from our founders Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Message from our founders</h2>
            <p className="text-xl text-gray-600">A message from the visionary leaders behind VVES</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* First Row - Full Width Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="relative lg:col-span-1">
                    <div className="aspect-[4/3] relative">
                      <img
                        src="/images/dr-sharon/academic.jpg"
                        alt="Academic Image"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-gray-500">Image not available</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision for Vedic Sciences</h3>
                    <div className="space-y-3 text-gray-700 leading-relaxed">
                      <p>
                        The Vedic knowledge system represents one of humanity's most profound 
                        intellectual achievements. Our mission at VVES is to ensure that this 
                        ancient wisdom is not only preserved but also made relevant for 
                        contemporary understanding and application.
                      </p>
                      <p>
                        Through rigorous research, comprehensive documentation, and innovative 
                        educational programs, we are creating bridges between the ancient and 
                        modern worlds. Our work encompasses not just the preservation of texts, 
                        but also the interpretation and application of Vedic principles in 
                        today's context.
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-gray-600 italic">— Sanjay Kumar & Team VVES</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Second Row - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Card 2 - Vedic Knowledge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative">
                    <div className="aspect-[4/3] relative">
                      <img
                        src="/images/dr-sharon/image_1.png"
                        alt="Vedic Sciences Image"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-gray-500">Image not available</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Vedic Knowledge</h3>
                    <p className="text-sm text-gray-600">Ancient wisdom for modern times</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Research Excellence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative">
                    <div className="aspect-[4/3] relative">
                      <img
                        src="/images/dr-sharon/image_2.png"
                        alt="Research Image"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-gray-500">Image not available</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Research Excellence</h3>
                    <p className="text-sm text-gray-600">Bridging ancient and modern science</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Education & Learning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative">
                    <div className="aspect-[4/3] relative">
                      <img
                        src="/images/dr-sharon/image_4.png"
                        alt="Education Image"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-gray-500">Image not available</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Education & Learning</h3>
                    <p className="text-sm text-gray-600">Empowering minds through Vedic knowledge</p>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* Our Founders Grid */}
              <div className="mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Founders</h2>
                  <p className="text-xl text-gray-600">Meet the visionary leaders behind VVES</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {founders.slice(0, 5).map((founder, index) => (
                    <motion.div
                      key={founder.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                      onClick={() => openModal(founder)}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                          <span className="text-gray-500">Image not available</span>
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-2">
                            <Eye size={20} className="text-indian-red" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{founder.name}</h3>
                        <p className="text-sm text-indian-red font-semibold mb-2">{founder.designation}</p>
                        <p className="text-xs text-gray-600 line-clamp-3">{founder.shortDescription}</p>
                        <div className="mt-2 flex items-center text-indian-red text-xs">
                          <span>Click to read more</span>
                          <Eye size={12} className="ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Founder Details */}
      <AnimatePresence>
        {selectedFounder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indian-red to-indian-gold rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedFounder.image}
                        alt={selectedFounder.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <span className="text-white text-lg font-bold hidden">
                        {selectedFounder.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedFounder.name}</h3>
                      <p className="text-indian-red font-semibold">{selectedFounder.designation}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedFounder.fullDescription}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeModal}
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


      {/* VVES Journey */}
      <section className="section-padding bg-indian-maroon text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl opacity-90">Milestones in VVES's growth and development</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-white/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-custom rounded-lg p-6">
                      <div className="text-2xl font-bold text-indian-gold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="opacity-90">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-indian-gold rounded-full border-4 border-white relative z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
      Partners Section
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners & Collaborators</h2>
            <p className="text-xl text-gray-600">Working together to preserve and promote Vedic knowledge</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-center text-xs">
                    {partner.name}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{partner.name}</h4>
                <p className="text-xs text-gray-600">{partner.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Authenticity',
                description: 'Maintaining the purity and accuracy of Vedic knowledge'
              },
              {
                icon: Users,
                title: 'Inclusivity',
                description: 'Making Vedic knowledge accessible to all seekers'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Pursuing the highest standards in research and education'
              },
              {
                icon: Heart,
                title: 'Preservation',
                description: 'Safeguarding ancient wisdom for future generations'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-indian-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*
      Contact CTA
      <section className="section-padding bg-indian-red text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of our journey to preserve and promote Vedic knowledge. 
            Whether you're a scholar, researcher, or enthusiast, there's a place for you at VVES.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-accent text-lg px-8 py-4">
              Contact Us
            </a>
            <a href="/course" className="btn-secondary text-lg px-8 py-4">
              Explore Courses
            </a>
          </div>
        </div>
      </section>
      */}

      <Footer />
    </div>
  )
}



