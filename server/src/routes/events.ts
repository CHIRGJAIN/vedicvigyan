import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'
import { EventItem } from '../types'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json(Array.from(db.events.values()))
})

router.get('/:id', (req: Request, res: Response) => {
  const e = db.events.get(req.params.id)
  if (!e) return res.status(404).json({ message: 'Not found' })
  res.json(e)
})

router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const id = uuid()
  const { name, date, status, attendees } = req.body || {}
  const ev: EventItem = { id, name, date, status: (status === 'completed' ? 'completed' : 'upcoming') as EventItem['status'], attendees: Number(attendees) || 0 }
  db.events.set(id, ev)
  res.status(201).json(ev)
})

router.put('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const e = db.events.get(req.params.id)
  if (!e) return res.status(404).json({ message: 'Not found' })
  Object.assign(e, req.body)
  db.events.set(e.id, e)
  res.json(e)
})

router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  db.events.delete(req.params.id)
  res.json({ message: 'Deleted' })
})

router.post('/:id/register', requireAuth, (req: Request, res: Response) => {
  res.json({ message: 'Registered for event' })
})

router.get('/user', requireAuth, (req: Request, res: Response) => {
  res.json(Array.from(db.events.values()).filter((e) => e.status === 'upcoming'))
})

export default router
