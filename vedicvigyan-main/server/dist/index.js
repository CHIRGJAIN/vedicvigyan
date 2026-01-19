"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: config_1.config.corsOrigin, credentials: true }));
app.use(express_1.default.json({ limit: '2mb' }));
app.use((0, morgan_1.default)('dev'));
// Static files for uploads
app.use('/uploads', express_1.default.static(path_1.default.resolve(process.cwd(), config_1.config.uploadDir)));
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/api', routes_1.default);
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
const port = config_1.config.port;
app.listen(port, () => {
    console.log(`VVES API running on http://localhost:${port}`);
});
