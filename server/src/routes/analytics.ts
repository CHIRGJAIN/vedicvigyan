import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/dashboard', requireAuth, (req: Request, res: Response) => {
  res.json({ users: 320, courses: 12, events: 5, revenue: 125000 })
})

router.get('/users', requireAuth, (req: Request, res: Response) => {
  res.json({ active: 250, new: 15, churn: 2 })
})

router.get('/courses', requireAuth, (req: Request, res: Response) => {
  res.json({ top: [{ name: 'Vedic Mathematics', enrollments: 45 }] })
})

router.get('/events', requireAuth, (req: Request, res: Response) => {
  res.json({ upcoming: 3, completed: 2 })
})

router.get('/revenue', requireAuth, (req: Request, res: Response) => {
  res.json({ monthly: [12000, 15000, 18000, 22000] })
})

export default router
