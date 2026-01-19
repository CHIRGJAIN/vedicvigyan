import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
}
