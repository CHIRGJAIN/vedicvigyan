import { Router, Request, Response } from 'express'
import { db } from '../store'
import { requireAuth } from '../middleware/auth'
import { v4 as uuid } from 'uuid'
import { EventItem, EventRegistration } from '../types'

const router = Router()

// GET /api/events - Get all active events
router.get('/', (req: Request, res: Response) => {
  const { status, category, search } = req.query
  let events = Array.from(db.events.values()).filter(e => e.isActive)

  // Filter by status
  if (status) {
    events = events.filter(e => e.status === status)
  }

  // Filter by category
  if (category) {
    events = events.filter(e => e.category.toLowerCase() === (category as string).toLowerCase())
  }

  // Search by name or description
  if (search) {
    const searchTerm = (search as string).toLowerCase()
    events = events.filter(e => 
      e.name.toLowerCase().includes(searchTerm) || 
      e.description.toLowerCase().includes(searchTerm)
    )
  }

  res.json(events)
})

// GET /api/events/:id - Get event by ID
router.get('/:id', (req: Request, res: Response) => {
  const event = db.events.get(req.params.id)
  if (!event || !event.isActive) {
    return res.status(404).json({ message: 'Event not found' })
  }
  res.json(event)
})

// POST /api/events - Create new event (admin only)
router.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const {
    name, description, date, time, location, maxAttendees, price,
    category, speaker, thumbnail
  } = req.body

  if (!name || !description || !date || !time || !location) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const id = uuid()
  const now = new Date().toISOString()
  
  const event: EventItem = {
    id,
    name,
    description,
    date,
    time,
    location,
    status: 'upcoming',
    attendees: 0,
    maxAttendees: maxAttendees ? Number(maxAttendees) : undefined,
    price: price ? Number(price) : undefined,
    category: category || 'General',
    speaker: speaker || 'TBA',
    thumbnail: thumbnail || undefined,
    isActive: true,
    createdAt: now,
    updatedAt: now
  }

  db.events.set(id, event)
  res.status(201).json(event)
})

// PUT /api/events/:id - Update event (admin only)
router.put('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const event = db.events.get(req.params.id)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const updatedEvent = {
    ...event,
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  db.events.set(event.id, updatedEvent)
  res.json(updatedEvent)
})

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const event = db.events.get(req.params.id)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  // Soft delete - mark as inactive
  event.isActive = false
  event.updatedAt = new Date().toISOString()
  db.events.set(event.id, event)

  res.json({ message: 'Event deleted successfully' })
})

// POST /api/events/:id/register - Register for event
router.post('/:id/register', requireAuth, (req: Request, res: Response) => {
  const event = db.events.get(req.params.id)
  if (!event || !event.isActive) {
    return res.status(404).json({ message: 'Event not found' })
  }

  // Check if user is already registered
  const existingRegistration = Array.from(db.eventRegistrations.values())
    .find(er => er.userId === req.user?.id && er.eventId === req.params.id && er.status === 'registered')

  if (existingRegistration) {
    return res.status(409).json({ message: 'Already registered for this event' })
  }

  // Check if event has capacity
  if (event.maxAttendees && event.attendees >= event.maxAttendees) {
    return res.status(400).json({ message: 'Event is full' })
  }

  const registrationId = uuid()
  const now = new Date().toISOString()

  const registration: EventRegistration = {
    id: registrationId,
    userId: req.user!.id,
    eventId: req.params.id,
    registrationDate: now,
    amount: event.price || 0,
    paymentMethod: req.body.paymentMethod || 'online',
    paymentStatus: event.price ? 'pending' : 'completed',
    status: 'registered',
    specialRequirements: req.body.specialRequirements || undefined,
    createdAt: now,
    updatedAt: now
  }

  db.eventRegistrations.set(registrationId, registration)

  // Update event attendee count
  event.attendees += 1
  event.updatedAt = now
  db.events.set(event.id, event)

  res.status(201).json({ message: 'Registered successfully', registration })
})

// GET /api/events/user - Get user's registered events
router.get('/user', requireAuth, (req: Request, res: Response) => {
  const userRegistrations = Array.from(db.eventRegistrations.values())
    .filter(er => er.userId === req.user?.id)

  const userEvents = userRegistrations.map(registration => {
    const event = db.events.get(registration.eventId)
    return event ? {
      ...event,
      registration,
      registrationStatus: registration.status
    } : null
  }).filter(Boolean)

  res.json(userEvents)
})

// PUT /api/events/:id/status - Update event status (admin only)
router.put('/:id/status', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const event = db.events.get(req.params.id)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const { status } = req.body
  if (!['upcoming', 'ongoing', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' })
  }

  event.status = status
  event.updatedAt = new Date().toISOString()
  db.events.set(event.id, event)

  res.json({ message: 'Event status updated successfully', event })
})

// GET /api/events/:id/attendees - Get event attendees (admin only)
router.get('/:id/attendees', requireAuth, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const event = db.events.get(req.params.id)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const registrations = Array.from(db.eventRegistrations.values())
    .filter(er => er.eventId === req.params.id)

  const attendees = registrations.map(registration => {
    const user = db.users.get(registration.userId)
    return user ? {
      ...user,
      registration,
      registrationDate: registration.registrationDate,
      status: registration.status
    } : null
  }).filter(Boolean)

  res.json({
    event: {
      id: event.id,
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location
    },
    attendees,
    totalAttendees: attendees.length
  })
})

export default router
