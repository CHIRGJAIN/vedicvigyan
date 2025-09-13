"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, (req, res) => {
    const list = Array.from(store_1.db.users.values()).map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
    res.json(list);
});
router.get('/:id', auth_1.requireAuth, (req, res) => {
    const u = store_1.db.users.get(req.params.id);
    if (!u)
        return res.status(404).json({ message: 'Not found' });
    res.json({ id: u.id, name: u.name, email: u.email, studentId: u.studentId, role: u.role });
});
router.put('/:id', auth_1.requireAuth, (req, res) => {
    const u = store_1.db.users.get(req.params.id);
    if (!u)
        return res.status(404).json({ message: 'Not found' });
    const { name, email } = req.body || {};
    u.name = name ?? u.name;
    u.email = email ?? u.email;
    store_1.db.users.set(u.id, u);
    res.json({ message: 'Updated' });
});
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    store_1.db.users.delete(req.params.id);
    res.json({ message: 'Deleted' });
});
router.get('/courses', auth_1.requireAuth, (req, res) => {
    // simplistic: return all courses user could see
    res.json(Array.from(store_1.db.courses.values()));
});
router.get('/progress', auth_1.requireAuth, (req, res) => {
    res.json({ progress: [] });
});
router.put('/progress/:courseId', auth_1.requireAuth, (req, res) => {
    res.json({ message: 'Progress updated' });
});
exports.default = router;
