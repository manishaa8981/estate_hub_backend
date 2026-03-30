import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

pool.connect()
  .then(client => {
    console.log('PostgreSQL connected via DATABASE_URL')
    client.release()
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection failed:', err.message)
  })

export default pool
