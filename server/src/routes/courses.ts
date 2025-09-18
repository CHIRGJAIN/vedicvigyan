import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json(Array.from(db.courses.values()))
})

router.get('/:id', (req: Request, res: Response) => {
  const c = db.courses.get(req.params.id)
  if (!c) return res.status(404).json({ message: 'Not found' })
  res.json(c)
})

router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const id = uuid()
  const { name, description, price, duration } = req.body || {}
  const course = { id, name, description, price: Number(price) || 0, duration: duration || 'N/A', students: 0 }
  db.courses.set(id, course)
  res.status(201).json(course)
})

router.put('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const c = db.courses.get(req.params.id)
  if (!c) return res.status(404).json({ message: 'Not found' })
  Object.assign(c, req.body)
  db.courses.set(c.id, c)
  res.json(c)
})

router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  db.courses.delete(req.params.id)
  res.json({ message: 'Deleted' })
})

router.post('/:id/enroll', requireAuth, (req: Request, res: Response) => {
  // keep it simple: no-op success
  res.json({ message: 'Enrolled' })
})

router.get('/user', requireAuth, (req: Request, res: Response) => {
  res.json(Array.from(db.courses.values()).slice(0, 2))
})

router.get('/:id/progress', requireAuth, (req: Request, res: Response) => {
  res.json({ courseId: req.params.id, progress: 75 })
})

export default router
