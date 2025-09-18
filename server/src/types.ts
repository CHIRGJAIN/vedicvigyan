export type Role = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  studentId?: string
  username?: string
  role: Role
  passwordHash: string
  createdAt: string
}

export interface Course {
  id: string
  name: string
  description: string
  price: number
  duration: string
  students: number
}

export interface EventItem {
  id: string
  name: string
  date: string
  status: 'upcoming' | 'completed'
  attendees: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved'
  createdAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrollmentDate: string
  amount: number
  paymentMethod: string
  status: 'active' | 'cancelled'
}
