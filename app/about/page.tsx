'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, Target, Eye, Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function About() {
  const founders = [
    {
      name: 'Dr. Madhuri Sharon',
      designation: 'Founder & Director',
      description: 'Renowned scholar in Vedic Sciences with over 25 years of research experience',
      image: '/images/founders/dr-madhuri-sharon.jpg'
    },
    {
      name: 'Prof. Rajesh Verma',
      designation: 'Co-Founder & Research Head',
      description: 'Expert in Sanskrit literature and Vedic mathematics',
      image: '/images/founders/prof-rajesh-verma.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      designation: 'Co-Founder & Academic Director',
      description: 'Specialist in Vedic astronomy and ancient Indian sciences',
      image: '/images/founders/dr-priya-sharma.jpg'
    }
  ]

  const milestones = [
    {
      year: '2018',
      title: 'Foundation',
      description: 'VVES was established with the vision to preserve and promote Vedic knowledge'
    },
    {
      year: '2019',
      title: 'First Course Launch',
      description: 'Successfully launched the inaugural course on Vedic Mathematics'
    },
    {
      year: '2020',
      title: 'Research Initiative',
      description: 'Started comprehensive research on Maharshi Bharadwaj\'s Vimaan Shastra'
    },
    {
      year: '2021',
      title: 'International Recognition',
      description: 'Received recognition from UNESCO for preservation of ancient knowledge'
    },
    {
      year: '2022',
      title: 'Digital Library',
      description: 'Launched comprehensive digital library with over 1000 Vedic texts'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Extended operations to 5 countries with 1000+ active members'
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

      {/* Dr. Madhuri Sharon Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Distinguished Founder</h2>
            <p className="text-xl text-gray-600">Prof. Sanjay Kumar Sharma - A Visionary Leader in Nanotechnology & Vedic Sciences</p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Professional Photos Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Portrait: center and span columns on md+ to remove the empty white card */}
                <div className="md:col-span-2 overflow-hidden">
                  <div className="mx-auto max-w-md md:max-w-lg rounded-xl shadow-none md:shadow-xl overflow-hidden">
                    <div className="aspect-[4/5] relative">
                      <img
                        src="/images/dr-sharon/academic.jpg"
                        alt="Dr. Madhuri Sharon - Academic Portrait"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Previously an empty white card (removed). If you want to restore it, uncomment below */}
                {/**
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    ...
                  </div>
                </div>
                */}
              </div>
            </motion.div>

            {/* Professional Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Prof. Sanjay Kumar Sharma</h3>
                <p className="text-indian-red font-semibold text-lg">Founder & Director, VVES</p>
              </div>

              {/* Professional Positions */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">Current & Past Positions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-indian-red pl-4">
                      <h5 className="font-semibold text-gray-900">Director</h5>
                      <p className="text-gray-700">Sharon Institute of Nanotechnology (SINT), Jaipur, India</p>
                    </div>
                    <div className="border-l-4 border-indian-gold pl-4">
                      <h5 className="font-semibold text-gray-900">Director</h5>
                      <p className="text-gray-700">Nano Wealth, Jaipur India</p>
                    </div>
                    <div className="border-l-4 border-indian-red pl-4">
                      <h5 className="font-semibold text-gray-900">Director</h5>
                      <p className="text-gray-700">Walchand Centre of Research in Nanotech & Bio-Nanotechnology</p>
                    </div>
                    <div className="border-l-4 border-indian-gold pl-4">
                      <h5 className="font-semibold text-gray-900">Visiting Professor</h5>
                      <p className="text-gray-700">MRC, MNIT Jaipur, India</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-l-4 border-indian-red pl-4">
                      <h5 className="font-semibold text-gray-900">Managing Director</h5>
                      <p className="text-gray-700">Monad Nanotech Pvt. Ltd. Mumbai, India</p>
                    </div>
                    <div className="border-l-4 border-indian-gold pl-4">
                      <h5 className="font-semibold text-gray-900">Professor Emeritus & Adjunct Professor</h5>
                      <p className="text-gray-700">University of Mumbai & MGM University</p>
                    </div>
                    <div className="border-l-4 border-indian-red pl-4">
                      <h5 className="font-semibold text-gray-900">Founder Member</h5>
                      <p className="text-gray-700">Vedic Vigyanam Explorer Society</p>
                    </div>
                    <div className="border-l-4 border-indian-gold pl-4">
                      <h5 className="font-semibold text-gray-900">Professor and Dean</h5>
                      <p className="text-gray-700">University School of ICT, Gautam Buddha University, Greater Noida-201312</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">Message from Our Founder</h4>
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic text-center">
                  "The Vedic knowledge system represents one of humanity's most profound 
                  intellectual achievements. Our mission at VVES is to ensure that this 
                  ancient wisdom is not only preserved but also made relevant for 
                  contemporary understanding and application."
                </blockquote>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <p className="leading-relaxed">
                    "Through rigorous research, comprehensive documentation, and innovative 
                    educational programs, we are creating bridges between the ancient and 
                    modern worlds. Our work encompasses not just the preservation of texts, 
                    but also the interpretation and application of Vedic principles in 
                    today's context."
                  </p>
                  <p className="leading-relaxed">
                    "I invite you to join us in this noble endeavor of exploring, 
                    understanding, and preserving our rich Vedic heritage for future generations."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Founders</h2>
            <p className="text-xl text-gray-600">Meet the visionary leaders behind VVES</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="w-32 h-32 bg-indian-red rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-indian-red font-semibold mb-4">{founder.designation}</p>
                <p className="text-gray-600">{founder.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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



