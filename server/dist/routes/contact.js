"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const uuid_1 = require("uuid");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !subject || !message)
        return res.status(400).json({ message: 'Missing fields' });
    const id = (0, uuid_1.v4)();
    const contact = { id, name, email, phone, subject, message, status: 'new', createdAt: new Date().toISOString() };
    store_1.db.contacts.set(id, contact);
    res.status(201).json(contact);
});
router.get('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    res.json(Array.from(store_1.db.contacts.values()));
});
router.get('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const c = store_1.db.contacts.get(req.params.id);
    if (!c)
        return res.status(404).json({ message: 'Not found' });
    res.json(c);
});
router.put('/:id/status', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    const c = store_1.db.contacts.get(req.params.id);
    if (!c)
        return res.status(404).json({ message: 'Not found' });
    const { status } = req.body || {};
    if (!['new', 'in_progress', 'resolved'].includes(status))
        return res.status(400).json({ message: 'Invalid status' });
    c.status = status;
    store_1.db.contacts.set(c.id, c);
    res.json(c);
});
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    store_1.db.contacts.delete(req.params.id);
    res.json({ message: 'Deleted' });
});
exports.default = router;
