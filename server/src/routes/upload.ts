import { Router, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { config } from '../config'
import { requireAuth, requireAdmin } from '../middleware/auth'

const uploadDir = path.resolve(process.cwd(), config.uploadDir)
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + '-' + file.originalname)
  },
})

const upload = multer({ storage })

const router = Router()

router.post('/', requireAuth, requireAdmin, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.status(201).json({ id: path.basename(req.file.filename), path: `/uploads/${path.basename(req.file.filename)}` })
})

router.delete('/:fileId', requireAuth, requireAdmin, (req: Request, res: Response) => {
  const filePath = path.join(uploadDir, req.params.fileId)
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found' })
  fs.unlinkSync(filePath)
  res.json({ message: 'Deleted' })
})

export default router
