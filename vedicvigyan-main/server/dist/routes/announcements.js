"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// GET /api/announcements - Get all active announcements
router.get('/', (req, res) => {
    const { type, targetAudience } = req.query;
    let announcements = Array.from(store_1.db.announcements.values()).filter(a => a.isActive);
    // Filter by type
    if (type) {
        announcements = announcements.filter(a => a.type === type);
    }
    // Filter by target audience
    if (targetAudience) {
        announcements = announcements.filter(a => a.targetAudience === targetAudience || a.targetAudience === 'all');
    }
    // Sort by creation date (newest first)
    announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(announcements);
});
// GET /api/announcements/:id - Get specific announcement
router.get('/:id', (req, res) => {
    const announcement = store_1.db.announcements.get(req.params.id);
    if (!announcement || !announcement.isActive) {
        return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(announcement);
});
// POST /api/announcements - Create announcement (admin only)
router.post('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const { title, message, type, targetAudience } = req.body;
    if (!title || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const id = (0, uuid_1.v4)();
    const now = new Date().toISOString();
    const announcement = {
        id,
        title,
        message,
        type: type || 'general',
        targetAudience: targetAudience || 'all',
        isActive: true,
        createdBy: req.user.id,
        createdAt: now,
        updatedAt: now
    };
    store_1.db.announcements.set(id, announcement);
    res.status(201).json(announcement);
});
// PUT /api/announcements/:id - Update announcement (admin only)
router.put('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const announcement = store_1.db.announcements.get(req.params.id);
    if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
    }
    const updatedAnnouncement = {
        ...announcement,
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    store_1.db.announcements.set(announcement.id, updatedAnnouncement);
    res.json(updatedAnnouncement);
});
// DELETE /api/announcements/:id - Delete announcement (admin only)
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const announcement = store_1.db.announcements.get(req.params.id);
    if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
    }
    // Soft delete - mark as inactive
    announcement.isActive = false;
    announcement.updatedAt = new Date().toISOString();
    store_1.db.announcements.set(announcement.id, announcement);
    res.json({ message: 'Announcement deleted successfully' });
});
// PUT /api/announcements/:id/toggle - Toggle announcement status (admin only)
router.put('/:id/toggle', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const announcement = store_1.db.announcements.get(req.params.id);
    if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
    }
    announcement.isActive = !announcement.isActive;
    announcement.updatedAt = new Date().toISOString();
    store_1.db.announcements.set(announcement.id, announcement);
    res.json({
        message: `Announcement ${announcement.isActive ? 'activated' : 'deactivated'}`,
        announcement
    });
});
exports.default = router;
