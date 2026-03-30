import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.js'
import favouritesRoutes from './routes/favourites.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin:[ 'http://localhost:5173',
      "https://estate-hub-frontend.onrender.com",
],
credentials: true }))
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
