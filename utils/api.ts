/**
 * API Utility
 * Centralized API calls for the frontend
 */

import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  registerUser: (userData: any) => api.post('/auth/register', userData),
  loginUser: (studentId: string, password: string) => api.post('/auth/login', { studentId, password }),
  loginAdmin: (username: string, password: string) => api.post('/auth/admin/login', { username, password }),
  getMe: () => api.get('/auth/me'),
}

// User API
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  getUserCourses: () => api.get('/users/courses'),
  getUserProgress: () => api.get('/users/progress'),
  updateUserProgress: (courseId: string, progressData: any) => api.put(`/users/progress/${courseId}`, progressData),
}

// Course API
export const courseAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id: string) => api.get(`/courses/${id}`),
  createCourse: (courseData: any) => api.post('/courses', courseData),
  updateCourse: (id: string, courseData: any) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id: string) => api.delete(`/courses/${id}`),
  enrollInCourse: (courseId: string) => api.post(`/courses/${courseId}/enroll`),
  getUserCourses: () => api.get('/courses/user'),
  getCourseProgress: (courseId: string) => api.get(`/courses/${courseId}/progress`),
}

// Event API
export const eventAPI = {
  getAllEvents: () => api.get('/events'),
  getEventById: (id: string) => api.get(`/events/${id}`),
  createEvent: (eventData: any) => api.post('/events', eventData),
  updateEvent: (id: string, eventData: any) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id: string) => api.delete(`/events/${id}`),
  registerForEvent: (eventId: string, registrationData: any) => api.post(`/events/${eventId}/register`, registrationData),
  getUserEvents: () => api.get('/events/user'),
}

// Admin API
export const adminAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
  getAllUsers: () => api.get('/admin/users'),
  getAllCourses: () => api.get('/admin/courses'),
  getAllEvents: () => api.get('/admin/events'),
  getUserStats: () => api.get('/admin/users/stats'),
  getCourseStats: () => api.get('/admin/courses/stats'),
  getEventStats: () => api.get('/admin/events/stats'),
  getRevenueStats: () => api.get('/admin/revenue/stats'),
  sendAnnouncement: (announcementData: any) => api.post('/admin/announcements', announcementData),
  updateSystemSettings: (settings: any) => api.put('/admin/settings', settings),
}

// Contact API
export const contactAPI = {
  submitContact: (contactData: any) => api.post('/contact', contactData),
  getAllContacts: () => api.get('/contact'),
  getContactById: (id: string) => api.get(`/contact/${id}`),
  updateContactStatus: (id: string, status: string) => api.put(`/contact/${id}/status`, { status }),
  deleteContact: (id: string) => api.delete(`/contact/${id}`),
}

// Upload API
export const uploadAPI = {
  uploadFile: (file: File, type: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  deleteFile: (fileId: string) => api.delete(`/upload/${fileId}`),
}

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getUserAnalytics: () => api.get('/analytics/users'),
  getCourseAnalytics: () => api.get('/analytics/courses'),
  getEventAnalytics: () => api.get('/analytics/events'),
  getRevenueAnalytics: () => api.get('/analytics/revenue'),
}

export default api




