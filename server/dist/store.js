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
// In-memory Maps — we'll persist these to disk periodically
exports.db = {
    users: new Map(),
    courses: new Map(),
    events: new Map(),
    contacts: new Map(),
    enrollments: new Map(),
    eventRegistrations: new Map(),
    userProgress: new Map(),
    notifications: new Map(),
    announcements: new Map(),
    fileUploads: new Map(),
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
            email: 'admin@vves.in',
            username: 'adminuser',
            role: 'admin',
            passwordHash: adminPassword,
            isActive: true,
            createdAt: now(),
            updatedAt: now(),
        });
        const user1Id = (0, uuid_1.v4)();
        exports.db.users.set(user1Id, {
            id: user1Id,
            name: 'Amit Patel',
            email: 'amit.patel@example.com',
            studentId: 'STU000001',
            role: 'user',
            passwordHash: userPassword,
            phone: '+91-9876543210',
            profession: 'Software Engineer',
            organization: 'Tech Corp',
            isActive: true,
            createdAt: now(),
            updatedAt: now(),
        });
        const user2Id = (0, uuid_1.v4)();
        exports.db.users.set(user2Id, {
            id: user2Id,
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            studentId: 'STU000002',
            role: 'user',
            passwordHash: userPassword,
            phone: '+91-9876543211',
            profession: 'Research Scholar',
            organization: 'University',
            isActive: true,
            createdAt: now(),
            updatedAt: now(),
        });
    }
    // Seed courses if none exist
    if (exports.db.courses.size === 0) {
        const courses = [
            {
                name: 'Vedic Science Fundamentals',
                description: 'A comprehensive introduction to the ancient wisdom of Vedic science, covering basic principles and foundational concepts.',
                detailedDescription: 'This course provides a deep dive into the fundamental principles of Vedic science, exploring the ancient knowledge systems that have influenced modern science and philosophy.',
                price: 12000,
                duration: '3 months',
                students: 45,
                maxStudents: 50,
                rating: 4.8,
                features: [
                    'Live interactive sessions',
                    'Study materials and resources',
                    'Certificate upon completion',
                    '24/7 support',
                    'Access to VVES community'
                ],
                curriculum: [
                    'Introduction to Vedic Science',
                    'Ancient Indian Knowledge Systems',
                    'Vedic Mathematics Basics',
                    'Sanskrit Fundamentals',
                    'Practical Applications'
                ],
                instructor: 'Dr. Madhuri Sharon',
                category: 'Vedic Science',
                level: 'beginner',
                language: 'English',
                isActive: true,
                startDate: '2024-03-01',
                endDate: '2024-05-31'
            },
            {
                name: 'Sanskrit Basics',
                description: 'Learn the fundamentals of Sanskrit language, including grammar, vocabulary, and reading classical texts.',
                detailedDescription: 'A comprehensive course covering Sanskrit grammar, vocabulary, and classical literature reading skills.',
                price: 8000,
                duration: '2 months',
                students: 32,
                maxStudents: 40,
                rating: 4.6,
                features: [
                    'Grammar fundamentals',
                    'Vocabulary building',
                    'Classical text reading',
                    'Pronunciation guide',
                    'Cultural context'
                ],
                curriculum: [
                    'Sanskrit Alphabet',
                    'Basic Grammar',
                    'Common Vocabulary',
                    'Simple Sentences',
                    'Classical Texts'
                ],
                instructor: 'Prof. Rajesh Verma',
                category: 'Language',
                level: 'beginner',
                language: 'Sanskrit/English',
                isActive: true,
                startDate: '2024-02-15',
                endDate: '2024-04-15'
            },
            {
                name: 'Vedic Mathematics',
                description: 'Master the ancient mathematical techniques from the Vedas, including sutras and their applications.',
                detailedDescription: 'Learn the 16 sutras of Vedic mathematics and their practical applications in modern calculations.',
                price: 15000,
                duration: '4 months',
                students: 28,
                maxStudents: 35,
                rating: 4.9,
                features: [
                    '16 Vedic Sutras',
                    'Mental calculation techniques',
                    'Practical applications',
                    'Problem-solving methods',
                    'Speed mathematics'
                ],
                curriculum: [
                    'Introduction to Vedic Mathematics',
                    'Basic Sutras',
                    'Multiplication Techniques',
                    'Division Methods',
                    'Advanced Applications'
                ],
                instructor: 'Dr. Sanjay Kumar Sharma',
                category: 'Mathematics',
                level: 'intermediate',
                language: 'English',
                isActive: true,
                startDate: '2024-03-15',
                endDate: '2024-07-15'
            }
        ];
        courses.forEach((c) => {
            const id = (0, uuid_1.v4)();
            exports.db.courses.set(id, {
                id,
                ...c,
                createdAt: now(),
                updatedAt: now(),
            });
        });
    }
    // Seed events if none exist
    if (exports.db.events.size === 0) {
        const events = [
            {
                name: 'Vedic Conference 2024',
                description: 'Annual conference on Vedic sciences and their modern applications',
                date: '2024-03-15',
                time: '09:00 AM',
                location: 'VVES Auditorium, Mumbai',
                status: 'upcoming',
                attendees: 120,
                maxAttendees: 150,
                price: 2000,
                category: 'Conference',
                speaker: 'Dr. Madhuri Sharon',
                isActive: true
            },
            {
                name: 'Sanskrit Workshop',
                description: 'Interactive workshop on Sanskrit language and literature',
                date: '2024-02-20',
                time: '02:00 PM',
                location: 'Online',
                status: 'upcoming',
                attendees: 45,
                maxAttendees: 60,
                price: 500,
                category: 'Workshop',
                speaker: 'Prof. Rajesh Verma',
                isActive: true
            },
            {
                name: 'Vedic Mathematics Seminar',
                description: 'Seminar on practical applications of Vedic mathematics',
                date: '2024-01-10',
                time: '10:00 AM',
                location: 'VVES Center, Delhi',
                status: 'completed',
                attendees: 80,
                maxAttendees: 100,
                price: 1000,
                category: 'Seminar',
                speaker: 'Dr. Sanjay Kumar Sharma',
                isActive: true
            }
        ];
        events.forEach((e) => {
            const id = (0, uuid_1.v4)();
            exports.db.events.set(id, {
                id,
                ...e,
                createdAt: now(),
                updatedAt: now(),
            });
        });
    }
    // Seed announcements if none exist
    if (exports.db.announcements.size === 0) {
        const announcements = [
            {
                title: 'Welcome to VVES Learning Platform',
                message: 'We are excited to announce the launch of our comprehensive learning platform for Vedic sciences.',
                type: 'general',
                targetAudience: 'all',
                isActive: true,
                createdBy: Array.from(exports.db.users.values()).find(u => u.role === 'admin')?.id || ''
            },
            {
                title: 'New Course: Advanced Sanskrit',
                message: 'Registration is now open for our Advanced Sanskrit course starting next month.',
                type: 'course',
                targetAudience: 'students',
                isActive: true,
                createdBy: Array.from(exports.db.users.values()).find(u => u.role === 'admin')?.id || ''
            }
        ];
        announcements.forEach((a) => {
            const id = (0, uuid_1.v4)();
            exports.db.announcements.set(id, {
                id,
                ...a,
                createdAt: now(),
                updatedAt: now(),
            });
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
            if (parsed.eventRegistrations)
                parsed.eventRegistrations.forEach((er) => exports.db.eventRegistrations.set(er.id, er));
            if (parsed.userProgress)
                parsed.userProgress.forEach((up) => exports.db.userProgress.set(up.id, up));
            if (parsed.notifications)
                parsed.notifications.forEach((n) => exports.db.notifications.set(n.id, n));
            if (parsed.announcements)
                parsed.announcements.forEach((a) => exports.db.announcements.set(a.id, a));
            if (parsed.fileUploads)
                parsed.fileUploads.forEach((f) => exports.db.fileUploads.set(f.id, f));
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
            eventRegistrations: Array.from(exports.db.eventRegistrations.values()),
            userProgress: Array.from(exports.db.userProgress.values()),
            notifications: Array.from(exports.db.notifications.values()),
            announcements: Array.from(exports.db.announcements.values()),
            fileUploads: Array.from(exports.db.fileUploads.values()),
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
