"use client"

import { useEffect, useRef } from 'react'
import { X, Clock, CheckCircle, Monitor } from 'lucide-react'

type Props = {
  course: any
  onClose: () => void
}

const REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSctZ4UY-YsU6DBuXKAN3SYk7jOY-pT4gieRPr_LCxxllE8-Qg/viewform?usp=header'

const SYLLABUS_PLACEHOLDER_TEXT =
  'We will give the syllabus only to enrolled students at the beginning of each course.'

const normalizeSyllabusPlaceholder = (value: string) =>
  value.replace(/^\d+\.?\s*/, '').trim()

const isSyllabusPlaceholder = (value: string) =>
  normalizeSyllabusPlaceholder(value) === SYLLABUS_PLACEHOLDER_TEXT

export default function CourseModal({ course, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // focus close button when modal opens
    closeBtnRef.current?.focus()
    // prevent background scroll
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!course) return null

  const curriculumItems: string[] = Array.isArray(course.curriculum)
    ? course.curriculum
    : course.curriculum
      ? [String(course.curriculum)]
      : []

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="course-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h2 id="course-modal-title" className="text-2xl font-bold text-gray-900">{course.name}</h2>
            <p className="text-sm text-indian-red font-semibold mt-1">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-600 mt-1">{course.duration} • {course.students} students</p>
          </div>
          <div className="ml-4 flex items-start">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close course details"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indian-red"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Full Description</h3>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Fee & Details</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Course Fee</span>
                <span className="font-bold text-indian-red">₹{course.price?.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Payment status and installments can be handled during registration.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Course Metadata</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center space-x-2"><span className="font-medium">Instructor:</span> <span className="text-indian-red">{course.instructor}</span></li>
                <li className="flex items-center space-x-2">
                  <Monitor size={14} />
                  <span className={`font-medium ${course?.online ? 'text-green-600' : 'text-indigo-600'}`}>
                    {course?.online ? 'Online Course' : 'Offline Course'}
                  </span>
                </li>
                <li className="flex items-center space-x-2"><Clock size={14} /> <span>{course.duration}</span></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">What you'll learn</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Array.isArray(course.features) ? course.features.map((f: string, i: number) => (
                <li key={i} className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle className="text-green-500 mt-1" size={16} />
                  <span>{f}</span>
                </li>
              )) : null}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Curriculum / Syllabus</h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {curriculumItems.map((entry: string, idx: number) => {
                const isPlaceholder = isSyllabusPlaceholder(entry)
                const displayText = isPlaceholder ? SYLLABUS_PLACEHOLDER_TEXT : entry
                return (
                  <li key={idx}>
                    {isPlaceholder ? <strong>{displayText}</strong> : displayText}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indian-red"
            >
              Close
            </button>

            <button
              onClick={() => {
                window.open(REGISTRATION_FORM_URL, '_blank', 'noopener,noreferrer')
                onClose()
              }}
              className="py-2 px-4 bg-indian-red text-white rounded-md hover:bg-indian-deepRed focus:outline-none focus:ring-2 focus:ring-indian-red"
            >
              Register for this course
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
