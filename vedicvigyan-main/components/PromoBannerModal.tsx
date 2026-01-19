'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

const BANNERS = [
  {
    src: '/images/iks-course-banner.jpg',
    alt: 'Indian Knowledge System course announcement',
  },
  {
    src: '/images/sukshma-jivanu-banner.jpg',
    alt: 'Sukshma Jivanu in Veda course announcement',
  },
]

const PromoBannerModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Announcements"
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-indian-red font-semibold">Announcements</p>
            <h2 className="text-2xl font-bold text-gray-900">Latest Course Updates</h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
            aria-label="Close announcements"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {BANNERS.map((banner) => (
              <div key={banner.src} className="rounded-xl border border-gray-200 bg-gray-50 p-3 shadow-sm">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="h-full w-full rounded-lg object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-indian-red px-4 py-2 text-white font-semibold transition-colors hover:bg-indian-deepRed"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBannerModal
