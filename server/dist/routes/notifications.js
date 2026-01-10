"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// GET /api/notifications - Get user's notifications
router.get('/', auth_1.requireAuth, (req, res) => {
    const { unread } = req.query;
    let notifications = Array.from(store_1.db.notifications.values())
        .filter(n => n.userId === req.user?.id);
    // Filter by read status
    if (unread === 'true') {
        notifications = notifications.filter(n => !n.isRead);
    }
    // Sort by creation date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(notifications);
});
// GET /api/notifications/:id - Get specific notification
router.get('/:id', auth_1.requireAuth, (req, res) => {
    const notification = store_1.db.notifications.get(req.params.id);
    if (!notification || notification.userId !== req.user?.id) {
        return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
});
// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', auth_1.requireAuth, (req, res) => {
    const notification = store_1.db.notifications.get(req.params.id);
    if (!notification || notification.userId !== req.user?.id) {
        return res.status(404).json({ message: 'Notification not found' });
    }
    notification.isRead = true;
    store_1.db.notifications.set(notification.id, notification);
    res.json({ message: 'Notification marked as read', notification });
});
// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', auth_1.requireAuth, (req, res) => {
    const userNotifications = Array.from(store_1.db.notifications.values())
        .filter(n => n.userId === req.user?.id && !n.isRead);
    userNotifications.forEach(notification => {
        notification.isRead = true;
        store_1.db.notifications.set(notification.id, notification);
    });
    res.json({ message: `Marked ${userNotifications.length} notifications as read` });
});
// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', auth_1.requireAuth, (req, res) => {
    const notification = store_1.db.notifications.get(req.params.id);
    if (!notification || notification.userId !== req.user?.id) {
        return res.status(404).json({ message: 'Notification not found' });
    }
    store_1.db.notifications.delete(notification.id);
    res.json({ message: 'Notification deleted successfully' });
});
// POST /api/notifications - Create notification (admin only)
router.post('/', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const { userId, title, message, type, actionUrl } = req.body;
    if (!userId || !title || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const id = (0, uuid_1.v4)();
    const now = new Date().toISOString();
    const notification = {
        id,
        userId,
        title,
        message,
        type: type || 'info',
        isRead: false,
        actionUrl: actionUrl || undefined,
        createdAt: now
    };
    store_1.db.notifications.set(id, notification);
    res.status(201).json(notification);
});
// POST /api/notifications/broadcast - Send notification to all users (admin only)
router.post('/broadcast', auth_1.requireAuth, (req, res) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const { title, message, type, actionUrl } = req.body;
    if (!title || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const users = Array.from(store_1.db.users.values()).filter(u => u.role === 'user');
    const now = new Date().toISOString();
    const notifications = [];
    users.forEach(user => {
        const id = (0, uuid_1.v4)();
        const notification = {
            id,
            userId: user.id,
            title,
            message,
            type: type || 'info',
            isRead: false,
            actionUrl: actionUrl || undefined,
            createdAt: now
        };
        store_1.db.notifications.set(id, notification);
        notifications.push(notification);
    });
    res.status(201).json({
        message: `Notification sent to ${notifications.length} users`,
        notifications
    });
});
exports.default = router;
