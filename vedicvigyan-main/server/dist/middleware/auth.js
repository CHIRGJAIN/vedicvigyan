"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.split(' ')[1];
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = { id: payload.sub, role: payload.role };
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
