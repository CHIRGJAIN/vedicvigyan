'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const NEXT_BANNER_DELAY_MS = 2500
const SESSION_COMPLETE_KEY = 'promo_banners_session_complete'
const SUKSHMA_SEEN_KEY = 'promo_banner_sukshma_seen'
const IKS_SEEN_KEY = 'promo_banner_iks_seen'
const IKS_REGISTRATION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf4erNZJFboHZhB5vYgXWL2lO7f9ppxZgALppu-tU0c6yDlfw/viewform?usp=header'

const PromoBannerModal = () => {
  const [activePopup, setActivePopup] = useState<'sukshma' | 'iks' | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const readSessionFlag = (key: string) => {
    try {
      return window.sessionStorage.getItem(key) === 'true'
    } catch {
      return false
    }
  }

  const writeSessionFlag = (key: string) => {
    try {
      window.sessionStorage.setItem(key, 'true')
    } catch {
      // ignore storage errors
    }
  }

  const clearScheduled = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    if (readSessionFlag(SESSION_COMPLETE_KEY)) return

    if (!readSessionFlag(SUKSHMA_SEEN_KEY)) {
      setActivePopup('sukshma')
      return
    }

    if (!readSessionFlag(IKS_SEEN_KEY)) {
      setActivePopup('iks')
      return
    }

    writeSessionFlag(SESSION_COMPLETE_KEY)
  }, [])

  useEffect(() => {
    if (!activePopup) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activePopup])

  useEffect(() => {
    return () => {
      clearScheduled()
    }
  }, [])

  if (!activePopup) return null

  const openIksAfterDelay = () => {
    clearScheduled()
    timeoutRef.current = window.setTimeout(() => {
      setActivePopup('iks')
    }, NEXT_BANNER_DELAY_MS)
  }

  const handleCloseSukshma = () => {
    writeSessionFlag(SUKSHMA_SEEN_KEY)
    setActivePopup(null)

    if (!readSessionFlag(IKS_SEEN_KEY)) {
      openIksAfterDelay()
    } else {
      writeSessionFlag(SESSION_COMPLETE_KEY)
    }
  }

  const handleCloseIks = () => {
    writeSessionFlag(IKS_SEEN_KEY)
    setActivePopup(null)
    writeSessionFlag(SESSION_COMPLETE_KEY)
  }

  const isSukshma = activePopup === 'sukshma'
  const isIks = activePopup === 'iks'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={isSukshma ? handleCloseSukshma : handleCloseIks}
        aria-hidden="true"
      />
      <div className="relative w-fit max-w-[92vw]">
        {isSukshma && (
          <div
            className="relative w-fit max-w-[92vw] rounded-3xl border border-gray-100 bg-white p-3 shadow-2xl sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Sukshma Jivanu Announcement"
          >
            <button
              onClick={handleCloseSukshma}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow-sm transition-colors hover:bg-white"
              aria-label="Close announcement"
            >
              <X size={20} />
            </button>
            <div className="rounded-2xl border border-gray-200 bg-white p-2">
              <img
                src="/images/sukshma-jivanu-banner.jpg"
                alt="Sukshma Jivanu in Veda course banner"
                className="block h-auto max-h-[70vh] w-auto max-w-[88vw] object-contain"
                loading="eager"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-indian-red px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-indian-deepRed"
                onClick={() => {
                  handleCloseSukshma();
                  window.open(IKS_REGISTRATION_URL, '_blank', 'noopener,noreferrer')
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        )}
        {isIks && (
          <div
            className="relative w-fit max-w-[92vw] rounded-3xl border border-gray-100 bg-white p-3 shadow-2xl sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Indian Knowledge System Announcement"
          >
            <button
              onClick={handleCloseIks}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow-sm transition-colors hover:bg-white"
              aria-label="Close announcement"
            >
              <X size={20} />
            </button>
            <div className="rounded-2xl border border-gray-200 bg-white p-2">
              <img
                src="/images/iks-course-banner.jpg"
                alt="Indian Knowledge System course banner"
                className="block h-auto max-h-[70vh] w-auto max-w-[88vw] object-contain"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromoBannerModal
