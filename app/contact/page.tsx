'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Contact() {
  // COMMENTED OUT: FAQ state - to restore, uncomment this state
  // const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  // COMMENTED OUT: Contact form state - to restore, uncomment this state
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   subject: '',
  //   message: ''
  // })

  // COMMENTED OUT: FAQ data - to restore, uncomment this entire section
  // const faqs = [
  //   {
  //     id: 1,
  //     question: "How can I become a member of VVES?",
  //     answer: "You can become a member by filling out our membership form on the website or contacting us directly. We offer different membership categories including student, professional, and institutional memberships."
  //   },
  //   {
  //     id: 2,
  //     question: "What courses are currently available?",
  //     answer: "We offer various courses including Vedic Mathematics, Sanskrit for Vedic Studies, and our flagship course on Maharshi Bharadwaj's Vimaan Shastra. Check our Courses page for current offerings and registration details."
  //   },
  //   {
  //     id: 3,
  //     question: "Can I access the research papers and publications?",
  //     answer: "Yes, most of our research papers are available for download in our Library section. Some papers may require membership for access. Contact us for specific access requirements."
  //   },
  //   {
  //     id: 4,
  //     question: "Do you offer online courses?",
  //     answer: "Yes, we offer both online and in-person courses. Our online courses include live sessions, recorded lectures, and interactive discussions. Check our Events page for upcoming online sessions."
  //   },
  //   {
  //     id: 5,
  //     question: "How can I participate in research projects?",
  //     answer: "We welcome research collaborations from scholars and institutions. Please contact us with your research proposal or area of interest, and we'll discuss potential collaboration opportunities."
  //   },
  //   {
  //     id: 6,
  //     question: "What are the office hours?",
  //     answer: "Our office is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. We are closed on Sundays and public holidays."
  //   }
  // ]

  // COMMENTED OUT: Contact form handlers - to restore, uncomment these functions
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Handle form submission
  //   console.log('Form submitted:', formData)
  //   // Reset form
  //   setFormData({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     subject: '',
  //     message: ''
  //   })
  // }

  // COMMENTED OUT: FAQ toggle function - to restore, uncomment this function
  // const toggleFAQ = (id: number) => {
  //   setActiveFAQ(activeFAQ === id ? null : id)
  // }

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
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for inquiries, collaborations, or to learn more about 
              our work in preserving and promoting Vedic knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* COMMENTED OUT: Contact Form - to restore, uncomment this entire section */}
            {/* <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                    placeholder="Enter your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center w-full"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div> */}

            {/* Coming Soon Message for Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Form</h2>
              <div className="bg-indian-red/5 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-indian-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={32} className="text-indian-red" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Feature Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  We're working on implementing our contact form. In the meantime, 
                  please use the contact information below to reach us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:info@vves.in"
                    className="btn-primary flex items-center justify-center"
                  >
                    <Mail size={16} className="mr-2" />
                    Email Us
                  </a>
                  <a 
                    href="tel:+919876543210"
                    className="btn-secondary flex items-center justify-center"
                  >
                    <Phone size={16} className="mr-2" />
                    Call Us
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indian-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-gray-700 hover:text-indian-red transition-colors duration-300"
                    >
                      +91 98765 43210
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Call us during office hours</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indian-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:info@vves.in" 
                      className="text-gray-700 hover:text-indian-red transition-colors duration-300"
                    >
                      info@vves.in
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indian-maroon rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
                    <address className="text-gray-700 not-italic">
                      {/* VVES Office<br /> */}
                      Vedic Vigyanam Explorer Society <br /> C/o
                      Prof Dr Naresh Vats<br />
                      House No. 254 Sector-3
                      Urban Estate<br /> Kurukshetra
                      Pin-136118, Haryana- India
                    </address>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indian-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
                    <div className="text-gray-700">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-600 mt-1">Closed on Sundays and public holidays</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COMMENTED OUT: Social Media / Follow Us
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Facebook', icon: '📘', href: 'https://facebook.com/vves' },
                    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/vves' },
                    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/vves' },
                    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/vves' },
                    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/vves' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indian-red hover:text-white transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <span className="text-xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
              */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT: Google Map / Find Us section - to restore, uncomment this entire section */}
      {/* <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Visit our office in Mumbai</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="text-indian-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">VVES Office Location</h3>
                <p className="text-gray-600 mb-4">
                  123 Vedic Path, Knowledge District<br />
                  Mumbai, Maharashtra 400001, India
                </p>
                <button className="btn-primary">
                  <ExternalLink size={16} className="mr-2" />
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* COMMENTED OUT: FAQ Section - to restore, uncomment this entire section */}
      {/* <section className="section-padding" id="faq">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about VVES</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {activeFAQ === faq.id ? (
                      <ChevronUp size={24} className="text-indian-red flex-shrink-0" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {activeFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* COMMENTED OUT: Quick Contact / Immediate Assistance section - removed per request
      <section className="section-padding bg-indian-maroon text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl mb-8 opacity-90">
              For urgent inquiries or immediate support, please call us directly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="tel:+919876543210"
                className="btn-accent text-lg px-8 py-4 flex items-center"
              >
                <Phone size={24} className="mr-2" />
                Call Now: +91 98765 43210
              </a>
              
              <a 
                href="mailto:info@vves.in"
                className="btn-secondary text-lg px-8 py-4 flex items-center"
              >
                <Mail size={24} className="mr-2" />
                Email Us
              </a>
            </div>
            
            <p className="text-sm opacity-75 mt-6">
              Office Hours: Mon-Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 2:00 PM
            </p>
          </div>
        </div>
      </section>
      */}

      <Footer />
    </div>
  )
}
