import { User, Course, EventItem, ContactMessage, Enrollment } from './types'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const now = () => new Date().toISOString()

const dataDir = path.resolve(process.cwd(), 'server', 'data')
const storeFile = path.join(dataDir, 'store.json')
fs.mkdirSync(dataDir, { recursive: true })

// In-memory Maps (same shape as before) — we'll persist these to disk periodically
export const db = {
  users: new Map<string, User>(),
  courses: new Map<string, Course>(),
  events: new Map<string, EventItem>(),
  contacts: new Map<string, ContactMessage>(),
  enrollments: new Map<string, Enrollment>(),
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
      email: 'admin@vves.org',
      username: 'adminuser',
      role: 'admin',
      passwordHash: adminPassword,
      createdAt: now(),
    })

    const user1Id = uuid()
    db.users.set(user1Id, {
      id: user1Id,
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      studentId: 'STU000001',
      role: 'user',
      passwordHash: userPassword,
      createdAt: now(),
    })

    const user2Id = uuid()
    db.users.set(user2Id, {
      id: user2Id,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      studentId: 'STU000002',
      role: 'user',
      passwordHash: userPassword,
      createdAt: now(),
    })
  }

  // Seed courses if none exist
  if (db.courses.size === 0) {
    ;[
      { name: 'Vedic Science Fundamentals', price: 12000, duration: '3 months', students: 45 },
      { name: 'Sanskrit Basics', price: 8000, duration: '2 months', students: 32 },
      { name: 'Vedic Mathematics', price: 15000, duration: '4 months', students: 28 },
    ].forEach((c) => {
      const id = uuid()
      db.courses.set(id, {
        id,
        name: c.name,
        description: `${c.name} course description`,
        price: c.price,
        duration: c.duration,
        students: c.students,
      })
    })
  }

  // Seed events if none exist
  if (db.events.size === 0) {
    ;([
      { name: 'Vedic Conference 2024', date: '2024-03-15', status: 'upcoming' as const, attendees: 120 },
      { name: 'Sanskrit Workshop', date: '2024-02-20', status: 'upcoming' as const, attendees: 45 },
      { name: 'Vedic Mathematics Seminar', date: '2024-01-10', status: 'completed' as const, attendees: 80 },
    ] as const).forEach((e) => {
      const id = uuid()
      db.events.set(id, { id, ...e })
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
