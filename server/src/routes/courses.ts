import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'
import { Course, Enrollment } from '../types'

const router = Router()

// GET /api/courses - Get all active courses
router.get('/', (req: Request, res: Response) => {
  const { category, level, search } = req.query
  let courses = Array.from(db.courses.values()).filter(c => c.isActive)

  // Filter by category
  if (category) {
    courses = courses.filter(c => c.category.toLowerCase() === (category as string).toLowerCase())
  }

  // Filter by level
  if (level) {
    courses = courses.filter(c => c.level === level)
  }

  // Search by name or description
  if (search) {
    const searchTerm = (search as string).toLowerCase()
    courses = courses.filter(c => 
      c.name.toLowerCase().includes(searchTerm) || 
      c.description.toLowerCase().includes(searchTerm)
    )
  }

  res.json(courses)
})

// GET /api/courses/:id - Get course by ID
router.get('/:id', (req: Request, res: Response) => {
  const course = db.courses.get(req.params.id)
  if (!course || !course.isActive) {
    return res.status(404).json({ message: 'Course not found' })
  }
  res.json(course)
})

// POST /api/courses - Create new course (admin only)
router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const {
    name, description, detailedDescription, price, duration, maxStudents,
    features, curriculum, instructor, category, level, language, startDate, endDate
  } = req.body

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const id = uuid()
  const now = new Date().toISOString()
  
  const course: Course = {
    id,
    name,
    description,
    detailedDescription: detailedDescription || description,
    price: Number(price),
    duration: duration || 'N/A',
    students: 0,
    maxStudents: maxStudents ? Number(maxStudents) : undefined,
    rating: 0,
    features: features || [],
    curriculum: curriculum || [],
    instructor: instructor || 'TBA',
    category: category || 'General',
    level: level || 'beginner',
    language: language || 'English',
    isActive: true,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    createdAt: now,
    updatedAt: now
  }

  db.courses.set(id, course)
  res.status(201).json(course)
})

// PUT /api/courses/:id - Update course (admin only)
router.put('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const course = db.courses.get(req.params.id)
  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }

  const updatedCourse = {
    ...course,
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  db.courses.set(course.id, updatedCourse)
  res.json(updatedCourse)
})

// DELETE /api/courses/:id - Delete course (admin only)
router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const course = db.courses.get(req.params.id)
  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }

  // Soft delete - mark as inactive
  course.isActive = false
  course.updatedAt = new Date().toISOString()
  db.courses.set(course.id, course)

  res.json({ message: 'Course deleted successfully' })
})

// POST /api/courses/:id/enroll - Enroll in course
router.post('/:id/enroll', requireAuth, (req: Request, res: Response) => {
  const course = db.courses.get(req.params.id)
  if (!course || !course.isActive) {
    return res.status(404).json({ message: 'Course not found' })
  }

  // Check if user is already enrolled
  const existingEnrollment = Array.from(db.enrollments.values())
    .find(e => e.userId === req.user?.id && e.courseId === req.params.id && e.status === 'active')

  if (existingEnrollment) {
    return res.status(409).json({ message: 'Already enrolled in this course' })
  }

  // Check if course has capacity
  if (course.maxStudents && course.students >= course.maxStudents) {
    return res.status(400).json({ message: 'Course is full' })
  }

  const enrollmentId = uuid()
  const now = new Date().toISOString()

  const enrollment: Enrollment = {
    id: enrollmentId,
    userId: req.user!.id,
    courseId: req.params.id,
    enrollmentDate: now,
    amount: course.price,
    paymentMethod: req.body.paymentMethod || 'online',
    paymentStatus: 'pending',
    status: 'active',
    progress: 0,
    createdAt: now,
    updatedAt: now
  }

  db.enrollments.set(enrollmentId, enrollment)

  // Update course student count
  course.students += 1
  course.updatedAt = now
  db.courses.set(course.id, course)

  res.status(201).json({ message: 'Enrolled successfully', enrollment })
})

// GET /api/courses/user - Get user's enrolled courses
router.get('/user', requireAuth, (req: Request, res: Response) => {
  const userEnrollments = Array.from(db.enrollments.values())
    .filter(e => e.userId === req.user?.id && e.status === 'active')

  const userCourses = userEnrollments.map(enrollment => {
    const course = db.courses.get(enrollment.courseId)
    return course ? {
      ...course,
      enrollment,
      progress: enrollment.progress
    } : null
  }).filter(Boolean)

  res.json(userCourses)
})

// GET /api/courses/:id/progress - Get course progress
router.get('/:id/progress', requireAuth, (req: Request, res: Response) => {
  const enrollment = Array.from(db.enrollments.values())
    .find(e => e.userId === req.user?.id && e.courseId === req.params.id)

  if (!enrollment) {
    return res.status(404).json({ message: 'Not enrolled in this course' })
  }

  const course = db.courses.get(req.params.id)
  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }

  // Get user progress for this course
  const progress = Array.from(db.userProgress.values())
    .filter(p => p.userId === req.user?.id && p.courseId === req.params.id)

  res.json({
    courseId: req.params.id,
    courseName: course.name,
    enrollment,
    progress,
    overallProgress: enrollment.progress
  })
})

// PUT /api/courses/:id/progress - Update course progress
router.put('/:id/progress', requireAuth, (req: Request, res: Response) => {
  const { moduleId, moduleName, progress, timeSpent } = req.body

  const enrollment = Array.from(db.enrollments.values())
    .find(e => e.userId === req.user?.id && e.courseId === req.params.id)

  if (!enrollment) {
    return res.status(404).json({ message: 'Not enrolled in this course' })
  }

  const now = new Date().toISOString()

  // Update or create user progress
  const existingProgress = Array.from(db.userProgress.values())
    .find(p => p.userId === req.user?.id && p.courseId === req.params.id && p.moduleId === moduleId)

  if (existingProgress) {
    existingProgress.progress = progress
    existingProgress.timeSpent += timeSpent || 0
    existingProgress.lastAccessed = now
    existingProgress.updatedAt = now
    if (progress >= 100) {
      existingProgress.completedAt = now
    }
    db.userProgress.set(existingProgress.id, existingProgress)
  } else {
    const progressId = uuid()
    const userProgress = {
      id: progressId,
      userId: req.user!.id,
      courseId: req.params.id,
      moduleId,
      moduleName,
      progress,
      timeSpent: timeSpent || 0,
      lastAccessed: now,
      completedAt: progress >= 100 ? now : undefined,
      createdAt: now,
      updatedAt: now
    }
    db.userProgress.set(progressId, userProgress)
  }

  // Update overall course progress
  const allProgress = Array.from(db.userProgress.values())
    .filter(p => p.userId === req.user?.id && p.courseId === req.params.id)
  
  const overallProgress = allProgress.length > 0 
    ? allProgress.reduce((sum, p) => sum + p.progress, 0) / allProgress.length
    : 0

  enrollment.progress = Math.round(overallProgress)
  enrollment.lastAccessed = now
  enrollment.updatedAt = now

  if (overallProgress >= 100) {
    enrollment.status = 'completed'
    enrollment.completionDate = now
  }

  db.enrollments.set(enrollment.id, enrollment)

  res.json({ message: 'Progress updated successfully', progress: enrollment.progress })
})

export default router
