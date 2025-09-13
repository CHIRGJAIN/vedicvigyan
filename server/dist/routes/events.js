"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(Array.from(store_1.db.events.values()));
});
router.get('/:id', (req, res) => {
    const e = store_1.db.events.get(req.params.id);
    if (!e)
        return res.status(404).json({ message: 'Not found' });
    res.json(e);
});
router.post('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const id = (0, uuid_1.v4)();
    const { name, date, status, attendees } = req.body || {};
    const ev = { id, name, date, status: (status === 'completed' ? 'completed' : 'upcoming'), attendees: Number(attendees) || 0 };
    store_1.db.events.set(id, ev);
    res.status(201).json(ev);
});
router.put('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const e = store_1.db.events.get(req.params.id);
    if (!e)
        return res.status(404).json({ message: 'Not found' });
    Object.assign(e, req.body);
    store_1.db.events.set(e.id, e);
    res.json(e);
});
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    store_1.db.events.delete(req.params.id);
    res.json({ message: 'Deleted' });
});
router.post('/:id/register', auth_1.requireAuth, (req, res) => {
    res.json({ message: 'Registered for event' });
});
router.get('/user', auth_1.requireAuth, (req, res) => {
    res.json(Array.from(store_1.db.events.values()).filter((e) => e.status === 'upcoming'));
});
exports.default = router;
