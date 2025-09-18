import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth, requireAdmin } from '../middleware/auth'

const router = Router()

router.use(requireAuth, requireAdmin)

router.get('/analytics', (req: Request, res: Response) => {
  res.json({ visitors: 15420, activeMembers: 1250, enrollments: 450, downloads: 2100 })
})

router.get('/users', (req: Request, res: Response) => {
  res.json(Array.from(db.users.values()).map(({ passwordHash, ...rest }) => rest))
})

router.get('/courses', (req: Request, res: Response) => {
  res.json(Array.from(db.courses.values()))
})

router.get('/events', (req: Request, res: Response) => {
  res.json(Array.from(db.events.values()))
})

router.get('/users/stats', (req: Request, res: Response) => {
  const total = db.users.size
  const admins = Array.from(db.users.values()).filter((u) => u.role === 'admin').length
  res.json({ total, admins, users: total - admins })
})

router.get('/courses/stats', (req: Request, res: Response) => {
  const total = db.courses.size
  const students = Array.from(db.courses.values()).reduce((s, c) => s + c.students, 0)
  res.json({ total, students })
})

router.get('/events/stats', (req: Request, res: Response) => {
  const upcoming = Array.from(db.events.values()).filter((e) => e.status === 'upcoming').length
  const completed = db.events.size - upcoming
  res.json({ total: db.events.size, upcoming, completed })
})

router.get('/revenue/stats', (req: Request, res: Response) => {
  res.json({ monthly: 500000, annual: 6000000 })
})

router.post('/announcements', (req: Request, res: Response) => {
  res.json({ message: 'Announcement sent' })
})

router.put('/settings', (req: Request, res: Response) => {
  res.json({ message: 'Settings updated' })
})

export default router
