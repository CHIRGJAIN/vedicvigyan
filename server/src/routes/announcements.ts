import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'
import { Announcement } from '../types'

const router = Router()

// GET /api/announcements - Get all active announcements
router.get('/', (req: Request, res: Response) => {
  const { type, targetAudience } = req.query
  let announcements = Array.from(db.announcements.values()).filter(a => a.isActive)

  // Filter by type
  if (type) {
    announcements = announcements.filter(a => a.type === type)
  }

  // Filter by target audience
  if (targetAudience) {
    announcements = announcements.filter(a => 
      a.targetAudience === targetAudience || a.targetAudience === 'all'
    )
  }

  // Sort by creation date (newest first)
  announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  res.json(announcements)
})

// GET /api/announcements/:id - Get specific announcement
router.get('/:id', (req: Request, res: Response) => {
  const announcement = db.announcements.get(req.params.id)
  
  if (!announcement || !announcement.isActive) {
    return res.status(404).json({ message: 'Announcement not found' })
  }

  res.json(announcement)
})

// POST /api/announcements - Create announcement (admin only)
router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { title, message, type, targetAudience } = req.body

  if (!title || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const id = uuid()
  const now = new Date().toISOString()

  const announcement: Announcement = {
    id,
    title,
    message,
    type: type || 'general',
    targetAudience: targetAudience || 'all',
    isActive: true,
    createdBy: req.user!.id,
    createdAt: now,
    updatedAt: now
  }

  db.announcements.set(id, announcement)
  res.status(201).json(announcement)
})

// PUT /api/announcements/:id - Update announcement (admin only)
router.put('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const announcement = db.announcements.get(req.params.id)
  if (!announcement) {
    return res.status(404).json({ message: 'Announcement not found' })
  }

  const updatedAnnouncement = {
    ...announcement,
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  db.announcements.set(announcement.id, updatedAnnouncement)
  res.json(updatedAnnouncement)
})

// DELETE /api/announcements/:id - Delete announcement (admin only)
router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const announcement = db.announcements.get(req.params.id)
  if (!announcement) {
    return res.status(404).json({ message: 'Announcement not found' })
  }

  // Soft delete - mark as inactive
  announcement.isActive = false
  announcement.updatedAt = new Date().toISOString()
  db.announcements.set(announcement.id, announcement)

  res.json({ message: 'Announcement deleted successfully' })
})

// PUT /api/announcements/:id/toggle - Toggle announcement status (admin only)
router.put('/:id/toggle', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const announcement = db.announcements.get(req.params.id)
  if (!announcement) {
    return res.status(404).json({ message: 'Announcement not found' })
  }

  announcement.isActive = !announcement.isActive
  announcement.updatedAt = new Date().toISOString()
  db.announcements.set(announcement.id, announcement)

  res.json({ 
    message: `Announcement ${announcement.isActive ? 'activated' : 'deactivated'}`,
    announcement 
  })
})

export default router
