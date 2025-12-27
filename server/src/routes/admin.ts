import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth, requireAdmin } from '../middleware/auth'
import { Analytics } from '../types'

const router = Router()

router.use(requireAuth, requireAdmin)

// GET /api/admin/analytics - Get comprehensive analytics
router.get('/analytics', (req: Request, res: Response) => {
  const users = Array.from(db.users.values())
  const courses = Array.from(db.courses.values())
  const events = Array.from(db.events.values())
  const enrollments = Array.from(db.enrollments.values())
  const eventRegistrations = Array.from(db.eventRegistrations.values())
  const contacts = Array.from(db.contacts.values())

  // Calculate metrics
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.isActive).length
  const totalCourses = courses.filter(c => c.isActive).length
  const totalEvents = events.filter(e => e.isActive).length
  const totalEnrollments = enrollments.length
  const totalRevenue = enrollments.reduce((sum, e) => sum + e.amount, 0)

  // Monthly revenue (last 12 months)
  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const month = date.toISOString().slice(0, 7)
    
    return enrollments
      .filter(e => e.enrollmentDate.startsWith(month))
      .reduce((sum, e) => sum + e.amount, 0)
  }).reverse()

  // User growth (last 12 months)
  const userGrowth = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const month = date.toISOString().slice(0, 7)
    
    return users.filter(u => u.createdAt.startsWith(month)).length
  }).reverse()

  // Course popularity
  const coursePopularity = courses
    .map(course => ({
      courseId: course.id,
      name: course.name,
      enrollments: enrollments.filter(e => e.courseId === course.id).length
    }))
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 10)

  // Event attendance
  const eventAttendance = events
    .map(event => ({
      eventId: event.id,
      name: event.name,
      attendees: eventRegistrations.filter(er => er.eventId === event.id).length
    }))
    .sort((a, b) => b.attendees - a.attendees)
    .slice(0, 10)

  const analytics: Analytics = {
    totalUsers,
    activeUsers,
    totalCourses,
    totalEvents,
    totalEnrollments,
    totalRevenue,
    monthlyRevenue,
    userGrowth,
    coursePopularity,
    eventAttendance
  }

  res.json(analytics)
})

// GET /api/admin/users - Get all users
router.get('/users', (req: Request, res: Response) => {
  const { role, active, search } = req.query
  let users = Array.from(db.users.values())

  // Filter by role
  if (role) {
    users = users.filter(u => u.role === role)
  }

  // Filter by active status
  if (active !== undefined) {
    const isActive = active === 'true'
    users = users.filter(u => u.isActive === isActive)
  }

  // Search by name or email
  if (search) {
    const searchTerm = (search as string).toLowerCase()
    users = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm) || 
      u.email.toLowerCase().includes(searchTerm)
    )
  }

  // Remove password hashes
  const safeUsers = users.map(({ passwordHash, ...rest }) => rest)
  res.json(safeUsers)
})

// GET /api/admin/courses - Get all courses
router.get('/courses', (req: Request, res: Response) => {
  const { active, category, level } = req.query
  let courses = Array.from(db.courses.values())

  // Filter by active status
  if (active !== undefined) {
    const isActive = active === 'true'
    courses = courses.filter(c => c.isActive === isActive)
  }

  // Filter by category
  if (category) {
    courses = courses.filter(c => c.category.toLowerCase() === (category as string).toLowerCase())
  }

  // Filter by level
  if (level) {
    courses = courses.filter(c => c.level === level)
  }

  res.json(courses)
})

// GET /api/admin/events - Get all events
router.get('/events', (req: Request, res: Response) => {
  const { status, active, category } = req.query
  let events = Array.from(db.events.values())

  // Filter by status
  if (status) {
    events = events.filter(e => e.status === status)
  }

  // Filter by active status
  if (active !== undefined) {
    const isActive = active === 'true'
    events = events.filter(e => e.isActive === isActive)
  }

  // Filter by category
  if (category) {
    events = events.filter(e => e.category.toLowerCase() === (category as string).toLowerCase())
  }

  res.json(events)
})

// GET /api/admin/enrollments - Get all enrollments
router.get('/enrollments', (req: Request, res: Response) => {
  const { status, courseId, userId } = req.query
  let enrollments = Array.from(db.enrollments.values())

  // Filter by status
  if (status) {
    enrollments = enrollments.filter(e => e.status === status)
  }

  // Filter by course
  if (courseId) {
    enrollments = enrollments.filter(e => e.courseId === courseId)
  }

  // Filter by user
  if (userId) {
    enrollments = enrollments.filter(e => e.userId === userId)
  }

  // Add user and course details
  const enrichedEnrollments = enrollments.map(enrollment => {
    const user = db.users.get(enrollment.userId)
    const course = db.courses.get(enrollment.courseId)
    
    return {
      ...enrollment,
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
      course: course ? { id: course.id, name: course.name } : null
    }
  })

  res.json(enrichedEnrollments)
})

// GET /api/admin/event-registrations - Get all event registrations
router.get('/event-registrations', (req: Request, res: Response) => {
  const { status, eventId, userId } = req.query
  let registrations = Array.from(db.eventRegistrations.values())

  // Filter by status
  if (status) {
    registrations = registrations.filter(r => r.status === status)
  }

  // Filter by event
  if (eventId) {
    registrations = registrations.filter(r => r.eventId === eventId)
  }

  // Filter by user
  if (userId) {
    registrations = registrations.filter(r => r.userId === userId)
  }

  // Add user and event details
  const enrichedRegistrations = registrations.map(registration => {
    const user = db.users.get(registration.userId)
    const event = db.events.get(registration.eventId)
    
    return {
      ...registration,
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
      event: event ? { id: event.id, name: event.name, date: event.date } : null
    }
  })

  res.json(enrichedRegistrations)
})

// GET /api/admin/users/stats - Get user statistics
router.get('/users/stats', (req: Request, res: Response) => {
  const users = Array.from(db.users.values())
  const total = users.length
  const admins = users.filter(u => u.role === 'admin').length
  const regularUsers = users.filter(u => u.role === 'user').length
  const activeUsers = users.filter(u => u.isActive).length
  const inactiveUsers = total - activeUsers

  // New users this month
  const thisMonth = new Date().toISOString().slice(0, 7)
  const newThisMonth = users.filter(u => u.createdAt.startsWith(thisMonth)).length

  res.json({ 
    total, 
    admins, 
    users: regularUsers, 
    activeUsers, 
    inactiveUsers,
    newThisMonth
  })
})

// GET /api/admin/courses/stats - Get course statistics
router.get('/courses/stats', (req: Request, res: Response) => {
  const courses = Array.from(db.courses.values())
  const enrollments = Array.from(db.enrollments.values())
  
  const total = courses.length
  const active = courses.filter(c => c.isActive).length
  const inactive = total - active
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
  const totalEnrollments = enrollments.length
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length

  // Average rating
  const coursesWithRating = courses.filter(c => c.rating > 0)
  const averageRating = coursesWithRating.length > 0 
    ? coursesWithRating.reduce((sum, c) => sum + c.rating, 0) / coursesWithRating.length
    : 0

  res.json({ 
    total, 
    active, 
    inactive, 
    totalStudents, 
    totalEnrollments, 
    completedEnrollments,
    averageRating: Math.round(averageRating * 10) / 10
  })
})

// GET /api/admin/events/stats - Get event statistics
router.get('/events/stats', (req: Request, res: Response) => {
  const events = Array.from(db.events.values())
  const registrations = Array.from(db.eventRegistrations.values())
  
  const total = events.length
  const active = events.filter(e => e.isActive).length
  const upcoming = events.filter(e => e.status === 'upcoming').length
  const ongoing = events.filter(e => e.status === 'ongoing').length
  const completed = events.filter(e => e.status === 'completed').length
  const cancelled = events.filter(e => e.status === 'cancelled').length
  const totalRegistrations = registrations.length
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0)

  res.json({ 
    total, 
    active, 
    upcoming, 
    ongoing, 
    completed, 
    cancelled,
    totalRegistrations,
    totalAttendees
  })
})

// GET /api/admin/revenue/stats - Get revenue statistics
router.get('/revenue/stats', (req: Request, res: Response) => {
  const enrollments = Array.from(db.enrollments.values())
  const eventRegistrations = Array.from(db.eventRegistrations.values())
  
  const totalCourseRevenue = enrollments.reduce((sum, e) => sum + e.amount, 0)
  const totalEventRevenue = eventRegistrations.reduce((sum, r) => sum + (r.amount || 0), 0)
  const totalRevenue = totalCourseRevenue + totalEventRevenue

  // Monthly revenue breakdown
  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const month = date.toISOString().slice(0, 7)
    
    const courseRevenue = enrollments
      .filter(e => e.enrollmentDate.startsWith(month))
      .reduce((sum, e) => sum + e.amount, 0)
    
    const eventRevenue = eventRegistrations
      .filter(r => r.registrationDate.startsWith(month))
      .reduce((sum, r) => sum + (r.amount || 0), 0)
    
    return courseRevenue + eventRevenue
  }).reverse()

  // Payment method breakdown
  const paymentMethods = {
    online: enrollments.filter(e => e.paymentMethod === 'online').length,
    offline: enrollments.filter(e => e.paymentMethod === 'offline').length,
    cash: enrollments.filter(e => e.paymentMethod === 'cash').length
  }

  res.json({ 
    totalRevenue,
    totalCourseRevenue,
    totalEventRevenue,
    monthlyRevenue,
    paymentMethods
  })
})

// POST /api/admin/announcements - Send announcement (legacy endpoint)
router.post('/announcements', (req: Request, res: Response) => {
  res.json({ message: 'Use /api/announcements endpoint for creating announcements' })
})

// PUT /api/admin/settings - Update system settings
router.put('/settings', (req: Request, res: Response) => {
  // This would typically update system-wide settings
  // For now, just return success
  res.json({ message: 'Settings updated successfully' })
})

export default router
