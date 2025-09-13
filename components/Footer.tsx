 'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/vves', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/vves', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/vves', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/vves', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/vves', color: 'hover:text-red-600' },
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Courses', href: '/course' },
    { name: 'Research', href: '/research' },
    { name: 'Library', href: '/library' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ]

  const resources = [
    { name: 'Research Papers', href: '/research' },
    { name: 'Publications', href: '/library' },
    { name: 'Newsletter', href: '/library#newsletter' },
    { name: 'Blog', href: '/library#blog' },
    { name: 'FAQ', href: '/contact#faq' },
    { name: 'Privacy Policy', href: '/privacy' },
  ]

  return (
    <footer className="bg-indian-maroon text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-20 h-12 flex items-center justify-center">
                <Image src="/vves-logo.png" alt="VVES logo" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Vedic Vigyanam Explorer Society</h3>
                <p className="text-sm text-gray-300">Preserving Vedic Wisdom</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading authority in the preservation and interpretation of Vedic Science, 
              integrating it into modern academic and cultural frameworks.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-white/10 rounded-full transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-indian-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-indian-gold">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-indian-gold">Contact Info</h4>
            <div className="space-y-4">
              {/* OLD ADDRESS (commented out)
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-indian-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    VVES Office<br />
                    123 Vedic Path, Knowledge District<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              */}

              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-indian-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Vedic Vigyanam Explorer Society C/o<br />
                    Prof Dr Naresh Vats<br />
                    House No. 254 Sector-3<br />
                    Urban Estate Kurukshetra<br />
                    Pin-136118, Haryana- India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-indian-gold flex-shrink-0" />
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-indian-gold flex-shrink-0" />
                <a 
                  href="mailto:info@vves.org" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  info@vves.org
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-indian-gold flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-custom px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                © {currentYear} Vedic Vigyanam Explorer Society. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hindi Text */}
      <div className="bg-black/20 py-3">
        <div className="container-custom text-center">
          <p className="hindi-text text-gray-300">
            वेदिक विज्ञान अन्वेषण समाज - वेदिक ज्ञान का संरक्षण और प्रसार
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer



