import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { config } from './config'
import api from './routes'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin, credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

// Static files for uploads
app.use('/uploads', express.static(path.resolve(process.cwd(), config.uploadDir)))

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))
app.use('/api', api)

app.use((req, res) => res.status(404).json({ message: 'Not Found' }))

const port = config.port
app.listen(port, () => {
  console.log(`VVES API running on http://localhost:${port}`)
})
