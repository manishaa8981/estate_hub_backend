import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.js'
import favouritesRoutes from './routes/favourites.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'https://estate-hub-frontend.onrender.com',
  'https://estatehub-frontend.onrender.com',
]

const corsOptions = {
  origin: (origin, callback) => {
    // allow no-origin requests (curl, Postman, mobile) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`CORS blocked origin: ${origin}`)
      callback(new Error(`CORS not allowed for origin: ${origin}`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Apply CORS to all routes
app.use(cors(corsOptions))

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions))

app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'EstateHub API is running' }))

app.use('/api/auth', authRoutes)
app.use('/api/favourites', favouritesRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
