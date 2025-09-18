import { Router, Request, Response } from 'express'
import { db } from '../store'
import { v4 as uuid } from 'uuid'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body || {}
  if (!name || !email || !subject || !message) return res.status(400).json({ message: 'Missing fields' })
  const id = uuid()
  const contact = { id, name, email, phone, subject, message, status: 'new' as const, createdAt: new Date().toISOString() }
  db.contacts.set(id, contact)
  res.status(201).json(contact)
})

router.get('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  res.json(Array.from(db.contacts.values()))
})

router.get('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const c = db.contacts.get(req.params.id)
  if (!c) return res.status(404).json({ message: 'Not found' })
  res.json(c)
})

router.put('/:id/status', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const c = db.contacts.get(req.params.id)
  if (!c) return res.status(404).json({ message: 'Not found' })
  const { status } = req.body || {}
  if (!['new', 'in_progress', 'resolved'].includes(status)) return res.status(400).json({ message: 'Invalid status' })
  c.status = status
  db.contacts.set(c.id, c)
  res.json(c)
})

router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  db.contacts.delete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
