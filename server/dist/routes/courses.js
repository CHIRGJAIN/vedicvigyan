"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(Array.from(store_1.db.courses.values()));
});
router.get('/:id', (req, res) => {
    const c = store_1.db.courses.get(req.params.id);
    if (!c)
        return res.status(404).json({ message: 'Not found' });
    res.json(c);
});
router.post('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const id = (0, uuid_1.v4)();
    const { name, description, price, duration } = req.body || {};
    const course = { id, name, description, price: Number(price) || 0, duration: duration || 'N/A', students: 0 };
    store_1.db.courses.set(id, course);
    res.status(201).json(course);
});
router.put('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const c = store_1.db.courses.get(req.params.id);
    if (!c)
        return res.status(404).json({ message: 'Not found' });
    Object.assign(c, req.body);
    store_1.db.courses.set(c.id, c);
    res.json(c);
});
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    store_1.db.courses.delete(req.params.id);
    res.json({ message: 'Deleted' });
});
router.post('/:id/enroll', auth_1.requireAuth, (req, res) => {
    // keep it simple: no-op success
    res.json({ message: 'Enrolled' });
});
router.get('/user', auth_1.requireAuth, (req, res) => {
    res.json(Array.from(store_1.db.courses.values()).slice(0, 2));
});
router.get('/:id/progress', auth_1.requireAuth, (req, res) => {
    res.json({ courseId: req.params.id, progress: 75 });
});
exports.default = router;
