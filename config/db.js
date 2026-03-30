import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Test connection on startup and log clearly
pool.connect()
  .then(client => {
    console.log(`✅ PostgreSQL connected — ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`)
    client.release()
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection failed:')
    console.error(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`)
    console.error(`   DB:   ${process.env.DB_NAME}`)
    console.error(`   User: ${process.env.DB_USER}`)
    console.error(`   Error: ${err.message}`)
  })

export default pool
