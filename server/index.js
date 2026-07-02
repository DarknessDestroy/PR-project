import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

const app = express()
const PORT = Number(process.env.API_PORT || 3001)

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`API server: http://localhost:${PORT}`)
})
