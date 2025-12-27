import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'
import { Notification } from '../types'

const router = Router()

// GET /api/notifications - Get user's notifications
router.get('/', requireAuth, (req: Request, res: Response) => {
  const { unread } = req.query
  let notifications = Array.from(db.notifications.values())
    .filter(n => n.userId === req.user?.id)

  // Filter by read status
  if (unread === 'true') {
    notifications = notifications.filter(n => !n.isRead)
  }

  // Sort by creation date (newest first)
  notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  res.json(notifications)
})

// GET /api/notifications/:id - Get specific notification
router.get('/:id', requireAuth, (req: Request, res: Response) => {
  const notification = db.notifications.get(req.params.id)
  
  if (!notification || notification.userId !== req.user?.id) {
    return res.status(404).json({ message: 'Notification not found' })
  }

  res.json(notification)
})

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', requireAuth, (req: Request, res: Response) => {
  const notification = db.notifications.get(req.params.id)
  
  if (!notification || notification.userId !== req.user?.id) {
    return res.status(404).json({ message: 'Notification not found' })
  }

  notification.isRead = true
  db.notifications.set(notification.id, notification)

  res.json({ message: 'Notification marked as read', notification })
})

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', requireAuth, (req: Request, res: Response) => {
  const userNotifications = Array.from(db.notifications.values())
    .filter(n => n.userId === req.user?.id && !n.isRead)

  userNotifications.forEach(notification => {
    notification.isRead = true
    db.notifications.set(notification.id, notification)
  })

  res.json({ message: `Marked ${userNotifications.length} notifications as read` })
})

// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  const notification = db.notifications.get(req.params.id)
  
  if (!notification || notification.userId !== req.user?.id) {
    return res.status(404).json({ message: 'Notification not found' })
  }

  db.notifications.delete(notification.id)
  res.json({ message: 'Notification deleted successfully' })
})

// POST /api/notifications - Create notification (admin only)
router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { userId, title, message, type, actionUrl } = req.body

  if (!userId || !title || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const id = uuid()
  const now = new Date().toISOString()

  const notification: Notification = {
    id,
    userId,
    title,
    message,
    type: type || 'info',
    isRead: false,
    actionUrl: actionUrl || undefined,
    createdAt: now
  }

  db.notifications.set(id, notification)
  res.status(201).json(notification)
})

// POST /api/notifications/broadcast - Send notification to all users (admin only)
router.post('/broadcast', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { title, message, type, actionUrl } = req.body

  if (!title || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const users = Array.from(db.users.values()).filter(u => u.role === 'user')
  const now = new Date().toISOString()
  const notifications: Notification[] = []

  users.forEach(user => {
    const id = uuid()
    const notification: Notification = {
      id,
      userId: user.id,
      title,
      message,
      type: type || 'info',
      isRead: false,
      actionUrl: actionUrl || undefined,
      createdAt: now
    }
    db.notifications.set(id, notification)
    notifications.push(notification)
  })

  res.status(201).json({ 
    message: `Notification sent to ${notifications.length} users`,
    notifications 
  })
})

export default router
