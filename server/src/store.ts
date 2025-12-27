import { 
  User, Course, EventItem, ContactMessage, Enrollment, 
  EventRegistration, UserProgress, Notification, Announcement, FileUpload 
} from './types'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const now = () => new Date().toISOString()

const dataDir = path.resolve(process.cwd(), 'server', 'data')
const storeFile = path.join(dataDir, 'store.json')
fs.mkdirSync(dataDir, { recursive: true })

// In-memory Maps — we'll persist these to disk periodically
export const db = {
  users: new Map<string, User>(),
  courses: new Map<string, Course>(),
  events: new Map<string, EventItem>(),
  contacts: new Map<string, ContactMessage>(),
  enrollments: new Map<string, Enrollment>(),
  eventRegistrations: new Map<string, EventRegistration>(),
  userProgress: new Map<string, UserProgress>(),
  notifications: new Map<string, Notification>(),
  announcements: new Map<string, Announcement>(),
  fileUploads: new Map<string, FileUpload>(),
}

const adminPassword = bcrypt.hashSync('VVESAdmin@2025', 10)
const userPassword = bcrypt.hashSync('User@2025', 10)

const seed = () => {
  // Seed users if none exist
  if (db.users.size === 0) {
    const adminId = uuid()
    db.users.set(adminId, {
      id: adminId,
      name: 'Admin User',
      email: 'admin@vves.in',
      username: 'adminuser',
      role: 'admin',
      passwordHash: adminPassword,
      isActive: true,
      createdAt: now(),
      updatedAt: now(),
    })

    const user1Id = uuid()
    db.users.set(user1Id, {
      id: user1Id,
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      studentId: 'STU000001',
      role: 'user',
      passwordHash: userPassword,
      phone: '+91-9876543210',
      profession: 'Software Engineer',
      organization: 'Tech Corp',
      isActive: true,
      createdAt: now(),
      updatedAt: now(),
    })

    const user2Id = uuid()
    db.users.set(user2Id, {
      id: user2Id,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      studentId: 'STU000002',
      role: 'user',
      passwordHash: userPassword,
      phone: '+91-9876543211',
      profession: 'Research Scholar',
      organization: 'University',
      isActive: true,
      createdAt: now(),
      updatedAt: now(),
    })
  }

  // Seed courses if none exist
  if (db.courses.size === 0) {
    const courses = [
      {
        name: 'Vedic Science Fundamentals',
        description: 'A comprehensive introduction to the ancient wisdom of Vedic science, covering basic principles and foundational concepts.',
        detailedDescription: 'This course provides a deep dive into the fundamental principles of Vedic science, exploring the ancient knowledge systems that have influenced modern science and philosophy.',
        price: 12000,
        duration: '3 months',
        students: 45,
        maxStudents: 50,
        rating: 4.8,
        features: [
          'Live interactive sessions',
          'Study materials and resources',
          'Certificate upon completion',
          '24/7 support',
          'Access to VVES community'
        ],
        curriculum: [
          'Introduction to Vedic Science',
          'Ancient Indian Knowledge Systems',
          'Vedic Mathematics Basics',
          'Sanskrit Fundamentals',
          'Practical Applications'
        ],
        instructor: 'Dr. Madhuri Sharon',
        category: 'Vedic Science',
        level: 'beginner' as const,
        language: 'English',
        isActive: true,
        startDate: '2024-03-01',
        endDate: '2024-05-31'
      },
      {
        name: 'Sanskrit Basics',
        description: 'Learn the fundamentals of Sanskrit language, including grammar, vocabulary, and reading classical texts.',
        detailedDescription: 'A comprehensive course covering Sanskrit grammar, vocabulary, and classical literature reading skills.',
        price: 8000,
        duration: '2 months',
        students: 32,
        maxStudents: 40,
        rating: 4.6,
        features: [
          'Grammar fundamentals',
          'Vocabulary building',
          'Classical text reading',
          'Pronunciation guide',
          'Cultural context'
        ],
        curriculum: [
          'Sanskrit Alphabet',
          'Basic Grammar',
          'Common Vocabulary',
          'Simple Sentences',
          'Classical Texts'
        ],
        instructor: 'Prof. Rajesh Verma',
        category: 'Language',
        level: 'beginner' as const,
        language: 'Sanskrit/English',
        isActive: true,
        startDate: '2024-02-15',
        endDate: '2024-04-15'
      },
      {
        name: 'Vedic Mathematics',
        description: 'Master the ancient mathematical techniques from the Vedas, including sutras and their applications.',
        detailedDescription: 'Learn the 16 sutras of Vedic mathematics and their practical applications in modern calculations.',
        price: 15000,
        duration: '4 months',
        students: 28,
        maxStudents: 35,
        rating: 4.9,
        features: [
          '16 Vedic Sutras',
          'Mental calculation techniques',
          'Practical applications',
          'Problem-solving methods',
          'Speed mathematics'
        ],
        curriculum: [
          'Introduction to Vedic Mathematics',
          'Basic Sutras',
          'Multiplication Techniques',
          'Division Methods',
          'Advanced Applications'
        ],
        instructor: 'Dr. Sanjay Kumar Sharma',
        category: 'Mathematics',
        level: 'intermediate' as const,
        language: 'English',
        isActive: true,
        startDate: '2024-03-15',
        endDate: '2024-07-15'
      }
    ]

    courses.forEach((c) => {
      const id = uuid()
      db.courses.set(id, {
        id,
        ...c,
        createdAt: now(),
        updatedAt: now(),
      })
    })
  }

  // Seed events if none exist
  if (db.events.size === 0) {
    const events = [
      {
        name: 'Vedic Conference 2024',
        description: 'Annual conference on Vedic sciences and their modern applications',
        date: '2024-03-15',
        time: '09:00 AM',
        location: 'VVES Auditorium, Mumbai',
        status: 'upcoming' as const,
        attendees: 120,
        maxAttendees: 150,
        price: 2000,
        category: 'Conference',
        speaker: 'Dr. Madhuri Sharon',
        isActive: true
      },
      {
        name: 'Sanskrit Workshop',
        description: 'Interactive workshop on Sanskrit language and literature',
        date: '2024-02-20',
        time: '02:00 PM',
        location: 'Online',
        status: 'upcoming' as const,
        attendees: 45,
        maxAttendees: 60,
        price: 500,
        category: 'Workshop',
        speaker: 'Prof. Rajesh Verma',
        isActive: true
      },
      {
        name: 'Vedic Mathematics Seminar',
        description: 'Seminar on practical applications of Vedic mathematics',
        date: '2024-01-10',
        time: '10:00 AM',
        location: 'VVES Center, Delhi',
        status: 'completed' as const,
        attendees: 80,
        maxAttendees: 100,
        price: 1000,
        category: 'Seminar',
        speaker: 'Dr. Sanjay Kumar Sharma',
        isActive: true
      }
    ]

    events.forEach((e) => {
      const id = uuid()
      db.events.set(id, {
        id,
        ...e,
        createdAt: now(),
        updatedAt: now(),
      })
    })
  }

  // Seed announcements if none exist
  if (db.announcements.size === 0) {
    const announcements = [
      {
        title: 'Welcome to VVES Learning Platform',
        message: 'We are excited to announce the launch of our comprehensive learning platform for Vedic sciences.',
        type: 'general' as const,
        targetAudience: 'all' as const,
        isActive: true,
        createdBy: Array.from(db.users.values()).find(u => u.role === 'admin')?.id || ''
      },
      {
        title: 'New Course: Advanced Sanskrit',
        message: 'Registration is now open for our Advanced Sanskrit course starting next month.',
        type: 'course' as const,
        targetAudience: 'students' as const,
        isActive: true,
        createdBy: Array.from(db.users.values()).find(u => u.role === 'admin')?.id || ''
      }
    ]

    announcements.forEach((a) => {
      const id = uuid()
      db.announcements.set(id, {
        id,
        ...a,
        createdAt: now(),
        updatedAt: now(),
      })
    })
  }
}

// Load store from disk if present
const loadStore = () => {
  try {
    if (fs.existsSync(storeFile)) {
      const raw = fs.readFileSync(storeFile, 'utf8')
      const parsed = JSON.parse(raw)
      // restore maps
      if (parsed.users) parsed.users.forEach((u: User) => db.users.set(u.id, u))
      if (parsed.courses) parsed.courses.forEach((c: Course) => db.courses.set(c.id, c))
      if (parsed.events) parsed.events.forEach((e: EventItem) => db.events.set(e.id, e))
      if (parsed.contacts) parsed.contacts.forEach((c: ContactMessage) => db.contacts.set(c.id, c))
      if (parsed.enrollments) parsed.enrollments.forEach((en: Enrollment) => db.enrollments.set(en.id, en))
      if (parsed.eventRegistrations) parsed.eventRegistrations.forEach((er: EventRegistration) => db.eventRegistrations.set(er.id, er))
      if (parsed.userProgress) parsed.userProgress.forEach((up: UserProgress) => db.userProgress.set(up.id, up))
      if (parsed.notifications) parsed.notifications.forEach((n: Notification) => db.notifications.set(n.id, n))
      if (parsed.announcements) parsed.announcements.forEach((a: Announcement) => db.announcements.set(a.id, a))
      if (parsed.fileUploads) parsed.fileUploads.forEach((f: FileUpload) => db.fileUploads.set(f.id, f))
    }
  } catch (err) {
    console.error('Failed to load store from disk', err)
  }
}

// Save store to disk (atomic write)
const saveStore = () => {
  try {
    const payload = {
      users: Array.from(db.users.values()),
      courses: Array.from(db.courses.values()),
      events: Array.from(db.events.values()),
      contacts: Array.from(db.contacts.values()),
      enrollments: Array.from(db.enrollments.values()),
      eventRegistrations: Array.from(db.eventRegistrations.values()),
      userProgress: Array.from(db.userProgress.values()),
      notifications: Array.from(db.notifications.values()),
      announcements: Array.from(db.announcements.values()),
      fileUploads: Array.from(db.fileUploads.values()),
    }
    const tmp = storeFile + '.tmp'
    fs.writeFileSync(tmp, JSON.stringify(payload, null, 2), 'utf8')
    fs.renameSync(tmp, storeFile)
  } catch (err) {
    console.error('Failed to save store to disk', err)
  }
}

// Autosave every 5 seconds
let autosaveInterval: NodeJS.Timeout | null = null
const startAutosave = () => {
  if (autosaveInterval) return
  autosaveInterval = setInterval(saveStore, 5000)
}

// Load, seed, and start autosave
loadStore()
seed()
saveStore()
startAutosave()

// Ensure store is saved on exit
process.on('SIGINT', () => {
  saveStore()
  process.exit()
})
process.on('SIGTERM', () => {
  saveStore()
  process.exit()
})

export const resetStore = () => {
  db.contacts.clear()
  db.enrollments.clear()
  saveStore()
}
