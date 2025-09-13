"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
// POST /api/auth/register (basic demo)
router.post('/register', (req, res) => {
    const { name, email, password, studentId } = req.body || {};
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    const exists = Array.from(store_1.db.users.values()).some((u) => u.email === email);
    if (exists)
        return res.status(409).json({ message: 'Email exists' });
    const id = crypto.randomUUID();
    const passwordHash = bcryptjs_1.default.hashSync(password, 10);
    store_1.db.users.set(id, {
        id,
        name,
        email,
        studentId,
        role: 'user',
        passwordHash,
        createdAt: new Date().toISOString(),
    });
    const token = (0, jwt_1.signToken)(id, 'user');
    return res.json({ token, user: { _id: id, name, email, studentId, role: 'user' } });
});
// POST /api/auth/login for users (studentId + password)
router.post('/login', (req, res) => {
    const { studentId, password } = req.body || {};
    if (!studentId || !password)
        return res.status(400).json({ message: 'Missing credentials' });
    const user = Array.from(store_1.db.users.values()).find((u) => u.studentId === studentId && u.role === 'user');
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    if (!bcryptjs_1.default.compareSync(password, user.passwordHash))
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = (0, jwt_1.signToken)(user.id, user.role);
    return res.json({ token, user: { _id: user.id, name: user.name, email: user.email, studentId: user.studentId, role: user.role } });
});
// POST /api/auth/admin/login (username + password)
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password)
        return res.status(400).json({ message: 'Missing credentials' });
    const admin = Array.from(store_1.db.users.values()).find((u) => u.username === username && u.role === 'admin');
    if (!admin)
        return res.status(401).json({ message: 'Invalid credentials' });
    if (!bcryptjs_1.default.compareSync(password, admin.passwordHash))
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = (0, jwt_1.signToken)(admin.id, admin.role);
    return res.json({ token, user: { _id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
});
// GET /api/auth/me
router.get('/me', (req, res) => {
    // Simple token introspection via header
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer '))
        return res.status(200).json(null);
    try {
        const token = auth.split(' ')[1];
        const { sub, role } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = sub ? store_1.db.users.get(sub) : undefined;
        if (!user)
            return res.json(null);
        return res.json({ _id: user.id, name: user.name, email: user.email, studentId: user.studentId, role });
    }
    catch {
        return res.json(null);
    }
});
exports.default = router;
