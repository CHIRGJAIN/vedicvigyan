"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetStore = exports.db = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const now = () => new Date().toISOString();
const dataDir = path_1.default.resolve(process.cwd(), 'server', 'data');
const storeFile = path_1.default.join(dataDir, 'store.json');
fs_1.default.mkdirSync(dataDir, { recursive: true });
// In-memory Maps (same shape as before) — we'll persist these to disk periodically
exports.db = {
    users: new Map(),
    courses: new Map(),
    events: new Map(),
    contacts: new Map(),
    enrollments: new Map(),
};
const adminPassword = bcryptjs_1.default.hashSync('VVESAdmin@2025', 10);
const userPassword = bcryptjs_1.default.hashSync('User@2025', 10);
const seed = () => {
    // Seed users if none exist
    if (exports.db.users.size === 0) {
        const adminId = (0, uuid_1.v4)();
        exports.db.users.set(adminId, {
            id: adminId,
            name: 'Admin User',
            email: 'admin@vves.org',
            username: 'adminuser',
            role: 'admin',
            passwordHash: adminPassword,
            createdAt: now(),
        });
        const user1Id = (0, uuid_1.v4)();
        exports.db.users.set(user1Id, {
            id: user1Id,
            name: 'Amit Patel',
            email: 'amit.patel@example.com',
            studentId: 'STU000001',
            role: 'user',
            passwordHash: userPassword,
            createdAt: now(),
        });
        const user2Id = (0, uuid_1.v4)();
        exports.db.users.set(user2Id, {
            id: user2Id,
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            studentId: 'STU000002',
            role: 'user',
            passwordHash: userPassword,
            createdAt: now(),
        });
    }
    // Seed courses if none exist
    if (exports.db.courses.size === 0) {
        ;
        [
            { name: 'Vedic Science Fundamentals', price: 12000, duration: '3 months', students: 45 },
            { name: 'Sanskrit Basics', price: 8000, duration: '2 months', students: 32 },
            { name: 'Vedic Mathematics', price: 15000, duration: '4 months', students: 28 },
        ].forEach((c) => {
            const id = (0, uuid_1.v4)();
            exports.db.courses.set(id, {
                id,
                name: c.name,
                description: `${c.name} course description`,
                price: c.price,
                duration: c.duration,
                students: c.students,
            });
        });
    }
    // Seed events if none exist
    if (exports.db.events.size === 0) {
        ;
        [
            { name: 'Vedic Conference 2024', date: '2024-03-15', status: 'upcoming', attendees: 120 },
            { name: 'Sanskrit Workshop', date: '2024-02-20', status: 'upcoming', attendees: 45 },
            { name: 'Vedic Mathematics Seminar', date: '2024-01-10', status: 'completed', attendees: 80 },
        ].forEach((e) => {
            const id = (0, uuid_1.v4)();
            exports.db.events.set(id, { id, ...e });
        });
    }
};
// Load store from disk if present
const loadStore = () => {
    try {
        if (fs_1.default.existsSync(storeFile)) {
            const raw = fs_1.default.readFileSync(storeFile, 'utf8');
            const parsed = JSON.parse(raw);
            // restore maps
            if (parsed.users)
                parsed.users.forEach((u) => exports.db.users.set(u.id, u));
            if (parsed.courses)
                parsed.courses.forEach((c) => exports.db.courses.set(c.id, c));
            if (parsed.events)
                parsed.events.forEach((e) => exports.db.events.set(e.id, e));
            if (parsed.contacts)
                parsed.contacts.forEach((c) => exports.db.contacts.set(c.id, c));
            if (parsed.enrollments)
                parsed.enrollments.forEach((en) => exports.db.enrollments.set(en.id, en));
        }
    }
    catch (err) {
        console.error('Failed to load store from disk', err);
    }
};
// Save store to disk (atomic write)
const saveStore = () => {
    try {
        const payload = {
            users: Array.from(exports.db.users.values()),
            courses: Array.from(exports.db.courses.values()),
            events: Array.from(exports.db.events.values()),
            contacts: Array.from(exports.db.contacts.values()),
            enrollments: Array.from(exports.db.enrollments.values()),
        };
        const tmp = storeFile + '.tmp';
        fs_1.default.writeFileSync(tmp, JSON.stringify(payload, null, 2), 'utf8');
        fs_1.default.renameSync(tmp, storeFile);
    }
    catch (err) {
        console.error('Failed to save store to disk', err);
    }
};
// Autosave every 5 seconds
let autosaveInterval = null;
const startAutosave = () => {
    if (autosaveInterval)
        return;
    autosaveInterval = setInterval(saveStore, 5000);
};
// Load, seed, and start autosave
loadStore();
seed();
saveStore();
startAutosave();
// Ensure store is saved on exit
process.on('SIGINT', () => {
    saveStore();
    process.exit();
});
process.on('SIGTERM', () => {
    saveStore();
    process.exit();
});
const resetStore = () => {
    exports.db.contacts.clear();
    exports.db.enrollments.clear();
    saveStore();
};
exports.resetStore = resetStore;
