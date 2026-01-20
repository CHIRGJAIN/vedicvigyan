"use client"

import { useEffect, useRef } from 'react'
import { X, Clock, CheckCircle, Monitor, Users, DollarSign, Calendar } from 'lucide-react'

type Props = {
  course: any
  onClose: () => void
  onRegister?: (courseId: string) => void
}

const DEFAULT_REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScloqq-UA5iKEN2IduxOzE6sSA645C1fdWT09RFPqyIyO8rIg/viewform?usp=header'

const SYLLABUS_PLACEHOLDER_TEXT =
  'We will give the syllabus only to enrolled students at the beginning of each course.'

const normalizeSyllabusPlaceholder = (value: string) => value.replace(/^\d+\.?\s*/, '').trim()

const isSyllabusPlaceholder = (value: string) => normalizeSyllabusPlaceholder(value) === SYLLABUS_PLACEHOLDER_TEXT

const CourseModal = ({ course, onClose, onRegister }: Props) => {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    closeBtnRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose()
    }
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
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="course-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b p-6">
          <div>
            <h2 id="course-modal-title" className="text-2xl font-bold text-gray-900">
              {course.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-indian-red">
              Instructor: {course.instructor || 'To be announced'}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {course.duration} • {course.students} students
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close course details"
            className="ml-4 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indian-red"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-700">{course.detailedDescription || course.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Fee & Details</h4>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-700">Course Fee</span>
                <span className="font-bold text-indian-red">₹{course.price?.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                Payment status and installments can be finalised during registration.
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-green-600" />
                  <span>{course.students} active learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-amber-600" />
                  <span>{course.category || 'General'} programme</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Course Profile</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Monitor size={14} />
                  <span className="font-medium">
                    {course?.online ? 'Online course' : 'In-person / hybrid delivery'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span className="font-medium">9th February(7pm-8pm)</span>
                  
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </li>
                {course.language ? (
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Language:</span>
                    <span>{course.language}</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-900">What you'll learn</h4>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {Array.isArray(course.features)
                ? course.features.map((feature: string, index: number) => (
                    <li key={`${feature}-${index}`} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-900">Curriculum / Syllabus</h4>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              {curriculumItems.map((entry: string, index: number) => {
                const placeholder = isSyllabusPlaceholder(entry)
                const display = placeholder ? SYLLABUS_PLACEHOLDER_TEXT : entry
                return (
                  <li key={`${display}-${index}`} className={placeholder ? 'list-none' : undefined}>
                    {placeholder ? <span className="italic">{display}</span> : display}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indian-red"
            >
              Close
            </button>
            <button
              onClick={() => {
                const registrationUrl = course.formLink || DEFAULT_REGISTRATION_FORM_URL
                if (onRegister) {
                  onRegister(course.id)
                } else {
                  window.open(registrationUrl, '_blank', 'noopener,noreferrer')
                }
                onClose()
              }}
              className="rounded-md bg-indian-red px-4 py-2 text-white transition-colors hover:bg-indian-deepRed focus:outline-none focus:ring-2 focus:ring-indian-red"
            >
              Register for this course
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseModal
