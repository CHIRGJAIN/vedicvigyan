# VVES Backend Setup Guide

## Overview
This is a comprehensive backend API for the Vedic Vigyanam Explorer Society (VVES) website, built with Node.js, Express, and TypeScript.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Session management

### 📚 Course Management
- Full CRUD operations for courses
- Course enrollment system
- Progress tracking
- Course categories and levels
- Instructor assignments

### 🎪 Event Management
- Event creation and management
- Event registration system
- Attendee tracking
- Event categories and status management

### 👥 User Management
- User registration and profiles
- Student ID system
- User progress tracking
- Profile management

### 📊 Analytics & Reporting
- Comprehensive dashboard analytics
- Revenue tracking
- User growth metrics
- Course popularity analysis
- Event attendance statistics

### 📢 Communication
- Notification system
- Announcement management
- Contact form handling
- Email notifications (ready for integration)

### 📁 File Management
- File upload system
- Image handling
- Document management
- Secure file storage

## Quick Start

### 1. Environment Setup
Create a `.env` file in the server directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# File Upload Configuration
UPLOAD_DIR=uploads
```

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (auth required)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/courses` - Get user's courses
- `GET /api/users/progress` - Get user progress
- `PUT /api/users/progress/:courseId` - Update progress

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/user` - Get user's courses
- `GET /api/courses/:id/progress` - Get course progress
- `PUT /api/courses/:id/progress` - Update progress

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `POST /api/events/:id/register` - Register for event
- `GET /api/events/user` - Get user's events
- `PUT /api/events/:id/status` - Update event status (admin)
- `GET /api/events/:id/attendees` - Get event attendees (admin)

### Admin
- `GET /api/admin/analytics` - Get comprehensive analytics
- `GET /api/admin/users` - Get all users with filters
- `GET /api/admin/courses` - Get all courses with filters
- `GET /api/admin/events` - Get all events with filters
- `GET /api/admin/enrollments` - Get all enrollments
- `GET /api/admin/event-registrations` - Get all event registrations
- `GET /api/admin/users/stats` - Get user statistics
- `GET /api/admin/courses/stats` - Get course statistics
- `GET /api/admin/events/stats` - Get event statistics
- `GET /api/admin/revenue/stats` - Get revenue statistics

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/:id` - Get specific notification
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications` - Create notification (admin)
- `POST /api/notifications/broadcast` - Broadcast notification (admin)

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get specific announcement
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)
- `PUT /api/announcements/:id/toggle` - Toggle status (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

### Upload
- `POST /api/upload` - Upload file (admin)
- `DELETE /api/upload/:fileId` - Delete file (admin)

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats
- `GET /api/analytics/users` - Get user analytics
- `GET /api/analytics/courses` - Get course analytics
- `GET /api/analytics/events` - Get event analytics
- `GET /api/analytics/revenue` - Get revenue analytics

## Default Credentials

### Admin User
- Username: `adminuser`
- Password: `VVESAdmin@2025`

### Test Users
- Student ID: `STU000001`, Password: `User@2025`
- Student ID: `STU000002`, Password: `User@2025`

## Data Storage

Currently using in-memory storage with JSON file persistence. The data is automatically saved every 5 seconds and loaded on server startup.

### Data Structure
- Users with roles and profiles
- Courses with detailed information
- Events with registration tracking
- Enrollments and progress tracking
- Event registrations
- Contact messages
- Notifications and announcements
- File uploads

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- Input validation
- Role-based access control
- Secure file upload handling

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Redis for session management
- Email notification system
- Payment gateway integration
- Real-time notifications (WebSocket)
- Advanced analytics and reporting
- API rate limiting
- Comprehensive logging
- Docker containerization

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - TypeScript type checking

### Project Structure
```
server/
├── src/
│   ├── config.ts          # Configuration
│   ├── index.ts           # Main server file
│   ├── store.ts           # Data storage
│   ├── types.ts           # TypeScript types
│   ├── middleware/
│   │   └── auth.ts        # Authentication middleware
│   ├── routes/
│   │   ├── index.ts       # Route index
│   │   ├── auth.ts        # Authentication routes
│   │   ├── users.ts       # User routes
│   │   ├── courses.ts     # Course routes
│   │   ├── events.ts      # Event routes
│   │   ├── admin.ts       # Admin routes
│   │   ├── contact.ts     # Contact routes
│   │   ├── upload.ts      # Upload routes
│   │   ├── analytics.ts   # Analytics routes
│   │   ├── notifications.ts # Notification routes
│   │   └── announcements.ts # Announcement routes
│   └── utils/
│       └── jwt.ts         # JWT utilities
├── dist/                  # Compiled JavaScript
├── data/                  # JSON data storage
├── uploads/               # File uploads
└── package.json
```

## Integration with Frontend

The backend is designed to work seamlessly with the Next.js frontend. The frontend API utility (`utils/api.ts`) is already configured to communicate with these endpoints.

### Environment Variables for Frontend
Make sure your frontend has the correct API URL:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
