"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth, auth_1.requireAdmin);
router.get('/analytics', (req, res) => {
    res.json({ visitors: 15420, activeMembers: 1250, enrollments: 450, downloads: 2100 });
});
router.get('/users', (req, res) => {
    res.json(Array.from(store_1.db.users.values()).map(({ passwordHash, ...rest }) => rest));
});
router.get('/courses', (req, res) => {
    res.json(Array.from(store_1.db.courses.values()));
});
router.get('/events', (req, res) => {
    res.json(Array.from(store_1.db.events.values()));
});
router.get('/users/stats', (req, res) => {
    const total = store_1.db.users.size;
    const admins = Array.from(store_1.db.users.values()).filter((u) => u.role === 'admin').length;
    res.json({ total, admins, users: total - admins });
});
router.get('/courses/stats', (req, res) => {
    const total = store_1.db.courses.size;
    const students = Array.from(store_1.db.courses.values()).reduce((s, c) => s + c.students, 0);
    res.json({ total, students });
});
router.get('/events/stats', (req, res) => {
    const upcoming = Array.from(store_1.db.events.values()).filter((e) => e.status === 'upcoming').length;
    const completed = store_1.db.events.size - upcoming;
    res.json({ total: store_1.db.events.size, upcoming, completed });
});
router.get('/revenue/stats', (req, res) => {
    res.json({ monthly: 500000, annual: 6000000 });
});
router.post('/announcements', (req, res) => {
    res.json({ message: 'Announcement sent' });
});
router.put('/settings', (req, res) => {
    res.json({ message: 'Settings updated' });
});
exports.default = router;
