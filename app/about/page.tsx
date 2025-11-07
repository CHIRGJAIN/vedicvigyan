'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, Target, Eye, Calendar, MapPin, Phone, Mail, X, ChevronLeft, ChevronRight, ShieldCheck, HeartHandshake, Share2, Sparkles } from 'lucide-react'
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
  const [selectedLeadershipCard, setSelectedLeadershipCard] = useState<'Dr. Sanjay Kumar Sharma' | 'Dr. Madhuri Sharon' | 'Prof. (Dr.) Naresh Kumar Vats' | 'Dr. Mrunal Yawalkar' | null>(null)

  const founders: Founder[] = [
    {
      name: 'Ashish Kumar',
      designation: 'Treasurer',
      shortDescription: 'Innovation & Finance - Merging Vedic wisdom with modern technology initiatives.',
      fullDescription: `Engineering student specializing in Electronics and Communication with AI and ML at Gautam Buddha University.
Treasurer of VVES, spearheading initiatives that merge traditional knowledge with modern technology.
Leads IoT, aerospace, and 3D printing projects to translate Vedic concepts into contemporary applications.
Passionate about creating sustainable innovation pipelines that keep Vedic sciences relevant for future generations.`,
      image: '/images/dr-sharon/image_8.png'
    },
    {
      name: 'Mr. Venkat Rangan M.C.',
      designation: 'Executive Member',
      shortDescription: 'B.E. Electronics and Communication with PMP certification, expert in automotive embedded software.',
      fullDescription: `B.E. Electronics and Communication with PMP certification, expert in embedded software applications in the automotive domain. A lifelong Vimaan enthusiast, he combines engineering expertise with a passion for Sanskrit and Puranas.`,
      image: '/images/dr-sharon/image_4.png'
    },
    {
      name: 'Dr. Anantha M.A',
      designation: 'Executive Member',
      shortDescription: 'Ph.D. & M.A. (Nyaya Vidvat Uttama) - We cannot read Vimaan Shastra without him. Expert in Sanskrit and traditional knowledge.',
      fullDescription: `Ph.D. & M.A. (Nyaya Vidvat Uttama)

We cannot read Vimaan Shastra without him.

Proficient in Sanskrit, Kannada, Hindi, English

Asst. Prof. in Centre for Traditional Knowledge Data Science and Informatics (CTKDSI), University of Trans Disciplinary Health Science &Technology (Trans Disciplinary University)

Published & Edited books and many articles

Attended many conferences and worked on several Projects.

He has many Recognitions and Honors.

We wouldn't have been able to venture in this BOOK without his support.

His exceptional expertise in Sanskrit and traditional knowledge systems makes him an indispensable member of VVES. His ability to interpret and translate ancient texts, particularly Vimaan Shastra, is crucial to the society's mission of preserving and understanding Vedic sciences. His academic contributions and recognition in the field of traditional knowledge demonstrate his deep commitment to bridging ancient wisdom with contemporary understanding.`,
      image: '/images/dr-sharon/image_1.png'
    },
    {
      name: 'Mr. Vijay Madhukar Vadnere',
      designation: 'Executive Member',
      shortDescription: 'Veteran DOCSIS, CATV, and HFC network specialist with 39 years of experience driving large-scale telecom operations.',
      fullDescription: `Vijay Madhukar Vadnere has 39 years of experience in DOCSIS, CATV, CCTV, HFC and ISP network design, implementation and monitoring. As Assistant Vice President - Technical at Hathway Cable & Datacom, Pune, he managed over 6 lakh digital subscribers and 3 lakh DOCSIS subscribers.

He designed structured networks for Magarpatta City and worked as a consultant on HFC/Docsis networks, procurement, implementation and testing. He holds multiple professional certifications in Headend Architecture, Return Path and Fiber Optics and is a member of SCTE since 2002.

His career began at Diamond Group (1985-1994) as Senior Technician, then S.V. Enterprises (1994-1998) on network design and automation, followed by 23 years at Hathway Cable & Datacom (1998-2021) heading HFC/Docsis/FTTH/Digital Cable operations. Since 2022 he is Director at S.V. Ved Yantra Pvt. Ltd. developing automation instruments and Ayurvedic engineering concepts.

He owns a wide range of test instruments and a digital music studio for testing sound frequencies. His interests include reading, documentaries, collecting rare items and designing new gadgets. He is a Limca Book of Records holder and member of multiple organizations including Rotary Club of Pune Wisdom and ADMA.`,
      image: '/images/dr-sharon/image_7.png'
    },
    {
      name: 'Ms. Anuradha Pandey-Dubey',
      designation: 'Executive Member',
      shortDescription: 'Academician and researcher in both Ancient & Contemporary science. Served as Asst Prof. Biotechnology for 15yrs.',
      fullDescription: `An academician and researcher in both Ancient & Contemporary science. 
Served as Asst Prof. Biotechnology for 15yrs

Member of - Royal Society of Chemistry (London).

Educational Qualifications:
• Certificate Course: Study of Vimaan Vidya
• B.Ed
• Post Grad. Dip. In Nanobiotechnology

Her Contribution to Science:
• Has written a Book - Mandelic Acid (2017), Partridge Publishers
• 4 Chapters in 4 books by Wiley, Elsevier & Springer
• 16 International Paper Publications
• 1 Indian Patent
• Working as Research Associate and doing Ph D in Bionanotechnology

THIS BEAUTIFUL GIRL IS A MOST FOCUSSED BRILLIANT RESEARCHER

Her dedication to bridging ancient and contemporary science, combined with her extensive research experience and academic achievements, makes her a valuable asset to VVES. Her work in biotechnology and nanobiotechnology, along with her interest in Vimaan Vidya, demonstrates her commitment to exploring the intersection of traditional knowledge and modern scientific research.`,
      image: '/images/dr-sharon/image_3.png'
    },
    {
      name: 'Mr. Vijay Khambete',
      designation: 'Executive Member',
      shortDescription: 'An IT professional with an MBA and multiple postgraduate diplomas, championing ancient Indian aeronautics.',
      fullDescription: `An IT professional with an MBA and multiple postgraduate diplomas. He is the pillar of VVES, passionately advocating for ancient Indian aeronautics and demonstrating remarkable project-management and recruitment skills.`,
      image: '/images/dr-sharon/image_5.png'
    },
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
                <h2 className="text-3xl font-bold text-gray-900">Vision</h2>
              </div>
            
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To become a leading authority in the preservation and interpretation 
                of Vedic Science, integrating it into modern academic and cultural frameworks.
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
                <h2 className="text-3xl font-bold text-gray-900">Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Explore, Interpret and preserve the vedic science to Reinforce its Relevance and disseminate the knowledge in modern Society.
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
                className="bg-white rounded-xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedLeadershipCard('Dr. Sanjay Kumar Sharma')}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="relative lg:col-span-1">
                    <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
                      <img
                        src="/images/dr-sharon/academic.jpg"
                        alt="Academic Image"
                        className="absolute inset-0 w-full h-full object-cover"
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
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2">
                          <Eye size={20} className="text-indian-red" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center lg:col-span-2">
                    <div className="mb-4">
                      <h4 className="text-2xl font-bold text-gray-900 mb-1">Dr. Sanjay Kumar Sharma</h4>
                      <p className="text-lg font-bold text-indian-red mb-4">President</p>
                    </div>
                    <h3 className="text-lg font-normal text-gray-900 mb-4">Our Vision for Vedic Sciences</h3>
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
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => setSelectedLeadershipCard('Dr. Madhuri Sharon')}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src="/images/dr-sharon/portrait.jpg"
                    alt="Dr. Madhuri Sharon"
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2">
                      <Eye size={20} className="text-indian-red" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Dr. Madhuri Sharon</h3>
                  <p className="text-sm text-indian-red font-semibold mb-2">Vice-President</p>
                  <p className="text-xs text-gray-600 line-clamp-3">Vedic Knowledge - Ancient wisdom for modern times</p>
                </div>
              </motion.div>

              {/* Card 3 - Research Excellence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => setSelectedLeadershipCard('Prof. (Dr.) Naresh Kumar Vats')}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src="/images/dr-sharon/image_6.png"
                    alt="Prof. (Dr.) Naresh Kumar Vats"
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2">
                      <Eye size={20} className="text-indian-red" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Prof. (Dr.) Naresh Kumar Vats</h3>
                  <p className="text-sm text-indian-red font-semibold mb-2">Secretary</p>
                  <p className="text-xs text-gray-600 line-clamp-3">Research Excellence - Bridging ancient and modern science</p>
                </div>
              </motion.div>

              {/* Card 4 - Joint Secretary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => setSelectedLeadershipCard('Dr. Mrunal Yawalkar')}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src="/images/dr-sharon/image_2.png"
                    alt="Dr. Mrunal Yawalkar"
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2">
                      <Eye size={20} className="text-indian-red" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Dr. Mrunal Yawalkar</h3>
                  <p className="text-sm text-indian-red font-semibold mb-2">Joint Secretary</p>
                  <p className="text-xs text-gray-600 line-clamp-3">Ancient Aeronautics & Metallurgy - Championing research on Vedic sciences</p>
                </div>
              </motion.div>
              </div>

              {/* Additional Founder Cards */}
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {founders.map((founder, index) => (
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

        {selectedLeadershipCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLeadershipCard(null)}
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
                        src={getLeadershipImage(selectedLeadershipCard)}
                        alt={selectedLeadershipCard}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <span className="text-white text-lg font-bold hidden">
                        {selectedLeadershipCard.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedLeadershipCard}</h3>
                      <p className="text-indian-red font-semibold">{getDesignation(selectedLeadershipCard)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLeadershipCard(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {getLeadershipDescription(selectedLeadershipCard)}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedLeadershipCard(null)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Honesty & Integrity',
                description: 'We remain truthful, transparent, and ethical in all our actions.'
              },
              {
                icon: BookOpen,
                title: 'Wisdom & Knowledge',
                description: 'We seek, preserve, and share timeless wisdom, blending it with modern understanding.'
              },
              {
                icon: HeartHandshake,
                title: 'Trust',
                description: 'We build confidence through sincerity, consistency, and authenticity.'
              },
              {
                icon: Users,
                title: 'Respect',
                description: 'We honor diverse perspectives, traditions, and the dignity of every individual.'
              },
              {
                icon: Share2,
                title: 'Collaboration',
                description: 'We work together across disciplines and backgrounds to enrich collective knowledge.'
              },
              {
                icon: Sparkles,
                title: 'Tradition with Innovation',
                description: 'We respect our cultural and spiritual heritage while exploring its relevance in today\'s world.'
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

const getLeadershipImage = (name: string) => {
  switch (name) {
    case 'Dr. Madhuri Sharon':
      return '/images/dr-sharon/portrait.jpg';
    case 'Prof. (Dr.) Naresh Kumar Vats':
      return '/images/dr-sharon/image_6.png';
    case 'Dr. Sanjay Kumar Sharma':
      return '/images/dr-sharon/academic.jpg';
    case 'Mr. Vijay Madhukar Vadnere':
      return '/images/dr-sharon/image_7.png';
    case 'Dr. Mrunal Yawalkar':
      return '/images/dr-sharon/image_2.png';
    default:
      return '/images/dr-sharon/portrait.jpg';
  }
};

const getDesignation = (name: string) => {
  switch (name) {
    case 'Dr. Madhuri Sharon':
      return 'Vice President';
    case 'Prof. (Dr.) Naresh Kumar Vats':
      return 'Secretary';
    case 'Dr. Sanjay Kumar Sharma':
      return 'President';
    case 'Dr. Mrunal Yawalkar':
      return 'Joint Secretary';
    default:
      return '';
  }
};

const getLeadershipDescription = (name: string) => {
  switch (name) {
    case 'Dr. Sanjay Kumar Sharma':
      return `Dr. Sanjay Kumar Sharma:
"Formal Dean & Prof. Gautam Buddha University
A book-worm & Store of Knowledge - Our Library
A researcher of Ancient & Contemporary science- AI to Electronics
Multifarious Personality diverging from Academic, Research,
Administration, holding umpteen position in Govt. (ISRO, CSIR, DRDO, MHRD, IUAC & MoEFCC). & Industry.
A bank of Ancient Wisdom and most Sthit-Pragya Person I have come across.
If you ask me what I appreciate the best in him - It is the Aura that his personality emits"`;
    case 'Dr. Madhuri Sharon':
      return `Dr. Madhuri Sharon:
Dr. Madhuri Sharon is an internationally recognized scientist with a PhD from Leicester University, UK, and postdoctoral research at Bolton Institute of Technology. She currently serves as Director of Sharon Institute of Nanotechnology, Visiting Professor at MNIT, Adjunct Faculty at SRIVIT, Marg-Darshak at Bhishma IKS, and Advisor to Bhishma Sanatan Vedic Hindu University in the US. She also holds senior industrial positions including MD of MONAD and Technical Director at Vasudhaiv and NanoWealth. Her expertise spans nanotechnology, biotechnology, Sanatana Dharma, spirituality, Vimaan Shastra, and the Vedas. She has authored 19 books, 251 research articles, and holds 18 patents, guiding 14 PhD students and over 180 postgraduate students. Her previous roles include Director at Reliance and NSNRC, VP at Gufic, senior managerial and academic posts across India and the UK, and consultant for the UN, BCIL, and the Government of India. She has served as a jury member for Swachcha Bharat projects and as an expert in industrial, chemical, and nuclear disaster management for Bihar State. Dr. Sharon has also contributed to national reports like MNRE's roadmap for fuel cells and undertaken international collaborations with leading institutions in Japan, France, Italy, the Netherlands, China, and Mexico. Her distinguished career bridges cutting-edge science, ancient Indian knowledge systems, and global cultural exchange.`;
    case 'Prof. (Dr.) Naresh Kumar Vats':
      return `Prof. (Dr.) Naresh Kumar Vats:
Dean Academic & Finance Officer; Former Registrar, RGNUL, Punjab
• Professor of Law and Dean Academic at RGNUL, Punjab
• Former Officiating Vice-Chancellor, Registrar, RTI Appellate Authority at RGNUL
• Leadership roles at Galgotias University, MNLU Nagpur, NLUJA Assam, BGC Trust University Bangladesh
• 36+ research papers, 160+ conference presentations, 32 edited books
• Supervised 7 Ph.D., 2 Post-Doctoral, 75+ LL.M. dissertations
• Member of Academic/Executive/Finance Councils; Life Member Indian Law Institute
• WIPO Academy Advanced Arbitration & Mediation; Trademark Law & Examination (WIPO–KIPO)
• Book: Alternative Dispute Resolution – Prospects and Challenges (2020)
• Visiting Professor IIM Rohtak; Chairman Mediation Committee, Central University Punjab
• Edited volumes: IP in Modern Era (2024), International Law & Policy (2024), Uniform Civil Code (2024)
• Ph.D., LL.M., B.A. (Kurukshetra University), LL.B. (Barkatullah University), UGC-NET (Law)
• M.B.A. (HR), PGDPM & Labour Welfare, Interpretership Diploma (Sinhala)
• Honoured by Babu Jagjivan Ram Kala Sanskriti & Sahitya Academy, Delhi.`;
    case 'Dr. Mrunal Yawalkar':
      return `Dr. Mrunal Yawalkar:
Asst. Prof. at RTM Nagpur University for 8 years with a Certificate Course in Vimaan Vidya.
Published 10 articles and a book chapter; regular participant in national and international conferences.
Currently an independent researcher with deep focus on ancient aeronautics-related metallurgy.
Honours include B.Ed Gold Medalist, National Merit Scholarship, and the Appreciation Prize from NCLA.
Committed to translating Vedic science into actionable modern research as Joint Secretary of VVES.`;
    case 'Mr. Vijay Madhukar Vadnere':
      return `Mr. Vijay Madhukar Vadnere:
Vijay Madhukar Vadnere has 39 years’ experience in DOCSIS, CATV, CCTV, HFC and ISP network design, implementation and monitoring. He is an expert in CATV headend design, HFC networks and reverse path network design for DOCSIS 3+. As Assistant Vice President – Technical at Hathway Cable & Datacom, Pune, he managed over 6 lakh digital subscribers and 3 lakh DOCSIS subscribers.
He designed structured networks for Magarpatta City and worked as consultant on HFC/Docsis networks, procurement, implementation and testing. He holds multiple professional certifications in Headend Architecture, Return Path and Fiber Optics and is a member of SCTE since 2002.
His career began at Diamond Group (1985–1994) as Senior Technician, then S.V. Enterprises (1994–1998) on network design and automation, followed by 23 years at Hathway Cable & Datacom (1998–2021) heading HFC/Docsis/FTTH/Digital Cable operations. Since 2022 he is Director at S.V. Ved Yantra Pvt. Ltd. developing automation instruments and Ayurvedic engineering concepts.
He owns a wide range of test instruments and a digital music studio for testing sound frequencies. His interests include reading, documentaries, collecting rare items and designing new gadgets. He is a Limca Book of Records holder and member of multiple organizations including Rotary Club of Pune Wisdom and ADMA.`;
    default:
      return '';
  }
};
