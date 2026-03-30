-- Run this in your PostgreSQL / Neon SQL Editor to set up the schema

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'buyer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id VARCHAR(100) NOT NULL,
  property_title VARCHAR(200),
  property_price VARCHAR(50),
  property_location VARCHAR(200),
  property_image TEXT,
  property_beds INTEGER,
  property_baths INTEGER,
  property_sqft INTEGER,
  property_tag VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);
