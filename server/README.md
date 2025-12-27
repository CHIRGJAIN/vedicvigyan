# VVES Backend API

Node.js + TypeScript Express API for the Vedic Vigyanam Explorer Society website.

## Features
- JWT auth (admin and user)
- In-memory datastore (can be swapped with DB later)
- Endpoints for auth, users, courses, events, admin analytics, contact, uploads
- CORS, Helmet, logging

## Scripts
- Dev: runs with ts-node-dev
- Build: compiles to `dist/`
- Start: runs built server

## Quick start
1. Copy env file and adjust values:
   - `cp .env.example .env`
2. Install deps:
   - `npm install`
3. Run dev server:
   - `npm run dev`

Default server: http://localhost:5000

## Auth
- Admin seed: username `adminuser`, password `VVESAdmin@2025`
- User seed: student IDs `STU000001`, `STU000002`; password `User@2025`

## Endpoints (prefix /api)
- `POST /auth/register`
- `POST /auth/login` (user)
- `POST /auth/admin/login`
- `GET /auth/me`
- `GET /users` (auth)
- `GET /users/:id` (auth)
- `PUT /users/:id` (auth)
- `DELETE /users/:id` (auth)
- `GET /users/courses` (auth)
- `GET /users/progress` (auth)
- `PUT /users/progress/:courseId` (auth)
- `GET /courses`
- `GET /courses/:id`
- `POST /courses` (admin)
- `PUT /courses/:id` (admin)
- `DELETE /courses/:id` (admin)
- `POST /courses/:id/enroll` (auth)
- `GET /courses/user` (auth)
- `GET /courses/:id/progress` (auth)
- `GET /events`
- `GET /events/:id`
- `POST /events` (admin)
- `PUT /events/:id` (admin)
- `DELETE /events/:id` (admin)
- `POST /events/:id/register` (auth)
- `GET /events/user` (auth)
- `GET /admin/analytics` (admin)
- `GET /admin/users` (admin)
- `GET /admin/courses` (admin)
- `GET /admin/events` (admin)
- `GET /admin/users/stats` (admin)
- `GET /admin/courses/stats` (admin)
- `GET /admin/events/stats` (admin)
- `GET /admin/revenue/stats` (admin)
- `POST /admin/announcements` (admin)
- `PUT /admin/settings` (admin)
- `POST /contact`
- `GET /contact` (admin)
- `GET /contact/:id` (admin)
- `PUT /contact/:id/status` (admin)
- `DELETE /contact/:id` (admin)
- `POST /upload` (admin)
- `DELETE /upload/:fileId` (admin)
- `GET /analytics/dashboard` (auth)
- `GET /analytics/users` (auth)
- `GET /analytics/courses` (auth)
- `GET /analytics/events` (auth)
- `GET /analytics/revenue` (auth)
