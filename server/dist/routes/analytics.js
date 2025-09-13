"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/dashboard', auth_1.requireAuth, (req, res) => {
    res.json({ users: 320, courses: 12, events: 5, revenue: 125000 });
});
router.get('/users', auth_1.requireAuth, (req, res) => {
    res.json({ active: 250, new: 15, churn: 2 });
});
router.get('/courses', auth_1.requireAuth, (req, res) => {
    res.json({ top: [{ name: 'Vedic Mathematics', enrollments: 45 }] });
});
router.get('/events', auth_1.requireAuth, (req, res) => {
    res.json({ upcoming: 3, completed: 2 });
});
router.get('/revenue', auth_1.requireAuth, (req, res) => {
    res.json({ monthly: [12000, 15000, 18000, 22000] });
});
exports.default = router;
