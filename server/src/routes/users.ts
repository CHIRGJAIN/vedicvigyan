import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', requireAuth, (req: Request, res: Response) => {
  const list = Array.from(db.users.values()).map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }))
  res.json(list)
})

router.get('/:id', requireAuth, (req: Request, res: Response) => {
  const u = db.users.get(req.params.id)
  if (!u) return res.status(404).json({ message: 'Not found' })
  res.json({ id: u.id, name: u.name, email: u.email, studentId: u.studentId, role: u.role })
})

router.put('/:id', requireAuth, (req: Request, res: Response) => {
  const u = db.users.get(req.params.id)
  if (!u) return res.status(404).json({ message: 'Not found' })
  const { name, email } = req.body || {}
  u.name = name ?? u.name
  u.email = email ?? u.email
  db.users.set(u.id, u)
  res.json({ message: 'Updated' })
})

router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  db.users.delete(req.params.id)
  res.json({ message: 'Deleted' })
})

router.get('/courses', requireAuth, (req: Request, res: Response) => {
  // simplistic: return all courses user could see
  res.json(Array.from(db.courses.values()))
})

router.get('/progress', requireAuth, (req: Request, res: Response) => {
  res.json({ progress: [] })
})

router.put('/progress/:courseId', requireAuth, (req: Request, res: Response) => {
  res.json({ message: 'Progress updated' })
})

export default router
