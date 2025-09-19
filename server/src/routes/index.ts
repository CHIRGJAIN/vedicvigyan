import { Router } from 'express'
import auth from './auth'
import users from './users'
import courses from './courses'
import events from './events'
import admin from './admin'
import contact from './contact'
import upload from './upload'
import analytics from './analytics'
import notifications from './notifications'
import announcements from './announcements'

const api = Router()

api.use('/auth', auth)
api.use('/users', users)
api.use('/courses', courses)
api.use('/events', events)
api.use('/admin', admin)
api.use('/contact', contact)
api.use('/upload', upload)
api.use('/analytics', analytics)
api.use('/notifications', notifications)
api.use('/announcements', announcements)

export default api
