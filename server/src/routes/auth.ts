import { Router } from 'express'
import { db } from '../store'
import bcrypt from 'bcryptjs'
import { signToken } from '../utils/jwt'

const router = Router()

// POST /api/auth/register (basic demo)
router.post('/register', (req, res) => {
  const { name, email, password, studentId } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const exists = Array.from(db.users.values()).some((u) => u.email === email)
  if (exists) return res.status(409).json({ message: 'Email exists' })
  const id = crypto.randomUUID()
  const passwordHash = bcrypt.hashSync(password, 10)
  db.users.set(id, {
    id,
    name,
    email,
    studentId,
    role: 'user',
    passwordHash,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  const token = signToken(id, 'user')
  return res.json({ token, user: { _id: id, name, email, studentId, role: 'user' } })
})

// POST /api/auth/login for users (studentId + password)
router.post('/login', (req, res) => {
  const { studentId, password } = req.body || {}
  if (!studentId || !password) return res.status(400).json({ message: 'Missing credentials' })
  const user = Array.from(db.users.values()).find((u) => u.studentId === studentId && u.role === 'user')
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ message: 'Invalid credentials' })
  const token = signToken(user.id, user.role)
  return res.json({ token, user: { _id: user.id, name: user.name, email: user.email, studentId: user.studentId, role: user.role } })
})

// POST /api/auth/admin/login (username + password)
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' })
  const admin = Array.from(db.users.values()).find((u) => u.username === username && u.role === 'admin')
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' })
  if (!bcrypt.compareSync(password, admin.passwordHash)) return res.status(401).json({ message: 'Invalid credentials' })
  const token = signToken(admin.id, admin.role)
  return res.json({ token, user: { _id: admin.id, name: admin.name, email: admin.email, role: admin.role } })
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  // Simple token introspection via header
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return res.status(200).json(null)
  try {
    const token = auth.split(' ')[1]
    const { sub, role } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const user = sub ? db.users.get(sub) : undefined
    if (!user) return res.json(null)
    return res.json({ _id: user.id, name: user.name, email: user.email, studentId: user.studentId, role })
  } catch {
    return res.json(null)
  }
})

export default router
