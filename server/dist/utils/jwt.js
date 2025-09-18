"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const signToken = (userId, role) => {
    const payload = { sub: userId, role };
    const secret = config_1.config.jwtSecret;
    const opts = { ...(config_1.config.jwtExpiresIn ? { expiresIn: config_1.config.jwtExpiresIn } : {}) };
    return jsonwebtoken_1.default.sign(payload, secret, opts);
};
exports.signToken = signToken;
const verifyToken = (token) => {
    const secret = config_1.config.jwtSecret;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
