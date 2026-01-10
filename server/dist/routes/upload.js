"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const auth_1 = require("../middleware/auth");
const uploadDir = path_1.default.resolve(process.cwd(), config_1.config.uploadDir);
fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/', auth_1.requireAuth, auth_1.requireAdmin, upload.single('file'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ message: 'No file uploaded' });
    res.status(201).json({ id: path_1.default.basename(req.file.filename), path: `/uploads/${path_1.default.basename(req.file.filename)}` });
});
router.delete('/:fileId', auth_1.requireAuth, auth_1.requireAdmin, (req, res) => {
    const filePath = path_1.default.join(uploadDir, req.params.fileId);
    if (!fs_1.default.existsSync(filePath))
        return res.status(404).json({ message: 'File not found' });
    fs_1.default.unlinkSync(filePath);
    res.json({ message: 'Deleted' });
});
exports.default = router;
