export type Role = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  studentId?: string
  username?: string
  role: Role
  passwordHash: string
  phone?: string
  profession?: string
  organization?: string
  profileImage?: string
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  name: string
  description: string
  detailedDescription?: string
  price: number
  duration: string
  students: number
  maxStudents?: number
  rating: number
  features: string[]
  curriculum: string[]
  instructor?: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  language: string
  thumbnail?: string
  isActive: boolean
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface EventItem {
  id: string
  name: string
  description: string
  date: string
  time: string
  location: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  attendees: number
  maxAttendees?: number
  price?: number
  category: string
  speaker?: string
  thumbnail?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  assignedTo?: string
  response?: string
  createdAt: string
  updatedAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrollmentDate: string
  amount: number
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  status: 'active' | 'completed' | 'cancelled' | 'suspended'
  progress: number
  lastAccessed?: string
  completionDate?: string
  certificateIssued?: boolean
  createdAt: string
  updatedAt: string
}

export interface EventRegistration {
  id: string
  userId: string
  eventId: string
  registrationDate: string
  amount?: number
  paymentMethod?: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  status: 'registered' | 'attended' | 'cancelled' | 'no_show'
  specialRequirements?: string
  createdAt: string
  updatedAt: string
}

export interface UserProgress {
  id: string
  userId: string
  courseId: string
  moduleId: string
  moduleName: string
  progress: number
  timeSpent: number
  lastAccessed: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: 'general' | 'course' | 'event' | 'system'
  targetAudience: 'all' | 'students' | 'admins'
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface FileUpload {
  id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  path: string
  uploadedBy: string
  category: 'course' | 'event' | 'profile' | 'document' | 'other'
  isPublic: boolean
  createdAt: string
}

export interface Analytics {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  totalEvents: number
  totalEnrollments: number
  totalRevenue: number
  monthlyRevenue: number[]
  userGrowth: number[]
  coursePopularity: Array<{ courseId: string; name: string; enrollments: number }>
  eventAttendance: Array<{ eventId: string; name: string; attendees: number }>
}
