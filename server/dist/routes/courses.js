"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// GET /api/courses - Get all active courses
router.get('/', (req, res) => {
    const { category, level, search } = req.query;
    let courses = Array.from(store_1.db.courses.values()).filter(c => c.isActive);
    // Filter by category
    if (category) {
        courses = courses.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    // Filter by level
    if (level) {
        courses = courses.filter(c => c.level === level);
    }
    // Search by name or description
    if (search) {
        const searchTerm = search.toLowerCase();
        courses = courses.filter(c => c.name.toLowerCase().includes(searchTerm) ||
            c.description.toLowerCase().includes(searchTerm));
    }
    res.json(courses);
});
// GET /api/courses/:id - Get course by ID
router.get('/:id', (req, res) => {
    const course = store_1.db.courses.get(req.params.id);
    if (!course || !course.isActive) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
});
// POST /api/courses - Create new course (admin only)
router.post('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const { name, description, detailedDescription, price, duration, maxStudents, features, curriculum, instructor, category, level, language, startDate, endDate } = req.body;
    if (!name || !description || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const id = (0, uuid_1.v4)();
    const now = new Date().toISOString();
    const course = {
        id,
        name,
        description,
        detailedDescription: detailedDescription || description,
        price: Number(price),
        duration: duration || 'N/A',
        students: 0,
        maxStudents: maxStudents ? Number(maxStudents) : undefined,
        rating: 0,
        features: features || [],
        curriculum: curriculum || [],
        instructor: instructor || 'TBA',
        category: category || 'General',
        level: level || 'beginner',
        language: language || 'English',
        isActive: true,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        createdAt: now,
        updatedAt: now
    };
    store_1.db.courses.set(id, course);
    res.status(201).json(course);
});
// PUT /api/courses/:id - Update course (admin only)
router.put('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const course = store_1.db.courses.get(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    const updatedCourse = {
        ...course,
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    store_1.db.courses.set(course.id, updatedCourse);
    res.json(updatedCourse);
});
// DELETE /api/courses/:id - Delete course (admin only)
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const course = store_1.db.courses.get(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    // Soft delete - mark as inactive
    course.isActive = false;
    course.updatedAt = new Date().toISOString();
    store_1.db.courses.set(course.id, course);
    res.json({ message: 'Course deleted successfully' });
});
// POST /api/courses/:id/enroll - Enroll in course
router.post('/:id/enroll', auth_1.requireAuth, (req, res) => {
    const course = store_1.db.courses.get(req.params.id);
    if (!course || !course.isActive) {
        return res.status(404).json({ message: 'Course not found' });
    }
    // Check if user is already enrolled
    const existingEnrollment = Array.from(store_1.db.enrollments.values())
        .find(e => e.userId === req.user?.id && e.courseId === req.params.id && e.status === 'active');
    if (existingEnrollment) {
        return res.status(409).json({ message: 'Already enrolled in this course' });
    }
    // Check if course has capacity
    if (course.maxStudents && course.students >= course.maxStudents) {
        return res.status(400).json({ message: 'Course is full' });
    }
    const enrollmentId = (0, uuid_1.v4)();
    const now = new Date().toISOString();
    const enrollment = {
        id: enrollmentId,
        userId: req.user.id,
        courseId: req.params.id,
        enrollmentDate: now,
        amount: course.price,
        paymentMethod: req.body.paymentMethod || 'online',
        paymentStatus: 'pending',
        status: 'active',
        progress: 0,
        createdAt: now,
        updatedAt: now
    };
    store_1.db.enrollments.set(enrollmentId, enrollment);
    // Update course student count
    course.students += 1;
    course.updatedAt = now;
    store_1.db.courses.set(course.id, course);
    res.status(201).json({ message: 'Enrolled successfully', enrollment });
});
// GET /api/courses/user - Get user's enrolled courses
router.get('/user', auth_1.requireAuth, (req, res) => {
    const userEnrollments = Array.from(store_1.db.enrollments.values())
        .filter(e => e.userId === req.user?.id && e.status === 'active');
    const userCourses = userEnrollments.map(enrollment => {
        const course = store_1.db.courses.get(enrollment.courseId);
        return course ? {
            ...course,
            enrollment,
            progress: enrollment.progress
        } : null;
    }).filter(Boolean);
    res.json(userCourses);
});
// GET /api/courses/:id/progress - Get course progress
router.get('/:id/progress', auth_1.requireAuth, (req, res) => {
    const enrollment = Array.from(store_1.db.enrollments.values())
        .find(e => e.userId === req.user?.id && e.courseId === req.params.id);
    if (!enrollment) {
        return res.status(404).json({ message: 'Not enrolled in this course' });
    }
    const course = store_1.db.courses.get(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    // Get user progress for this course
    const progress = Array.from(store_1.db.userProgress.values())
        .filter(p => p.userId === req.user?.id && p.courseId === req.params.id);
    res.json({
        courseId: req.params.id,
        courseName: course.name,
        enrollment,
        progress,
        overallProgress: enrollment.progress
    });
});
// PUT /api/courses/:id/progress - Update course progress
router.put('/:id/progress', auth_1.requireAuth, (req, res) => {
    const { moduleId, moduleName, progress, timeSpent } = req.body;
    const enrollment = Array.from(store_1.db.enrollments.values())
        .find(e => e.userId === req.user?.id && e.courseId === req.params.id);
    if (!enrollment) {
        return res.status(404).json({ message: 'Not enrolled in this course' });
    }
    const now = new Date().toISOString();
    // Update or create user progress
    const existingProgress = Array.from(store_1.db.userProgress.values())
        .find(p => p.userId === req.user?.id && p.courseId === req.params.id && p.moduleId === moduleId);
    if (existingProgress) {
        existingProgress.progress = progress;
        existingProgress.timeSpent += timeSpent || 0;
        existingProgress.lastAccessed = now;
        existingProgress.updatedAt = now;
        if (progress >= 100) {
            existingProgress.completedAt = now;
        }
        store_1.db.userProgress.set(existingProgress.id, existingProgress);
    }
    else {
        const progressId = (0, uuid_1.v4)();
        const userProgress = {
            id: progressId,
            userId: req.user.id,
            courseId: req.params.id,
            moduleId,
            moduleName,
            progress,
            timeSpent: timeSpent || 0,
            lastAccessed: now,
            completedAt: progress >= 100 ? now : undefined,
            createdAt: now,
            updatedAt: now
        };
        store_1.db.userProgress.set(progressId, userProgress);
    }
    // Update overall course progress
    const allProgress = Array.from(store_1.db.userProgress.values())
        .filter(p => p.userId === req.user?.id && p.courseId === req.params.id);
    const overallProgress = allProgress.length > 0
        ? allProgress.reduce((sum, p) => sum + p.progress, 0) / allProgress.length
        : 0;
    enrollment.progress = Math.round(overallProgress);
    enrollment.lastAccessed = now;
    enrollment.updatedAt = now;
    if (overallProgress >= 100) {
        enrollment.status = 'completed';
        enrollment.completionDate = now;
    }
    store_1.db.enrollments.set(enrollment.id, enrollment);
    res.json({ message: 'Progress updated successfully', progress: enrollment.progress });
});
exports.default = router;
