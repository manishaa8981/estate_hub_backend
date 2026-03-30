import pool from '../config/db.js'

export async function getFavourites(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM favourites WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('[getFavourites]', err)
    res.status(500).json({ errors: { general: 'Could not load favourites.' } })
  }
}

export async function addFavourite(req, res) {
  const {
    property_id, property_title, property_price,
    property_location, property_image, property_beds,
    property_baths, property_sqft, property_tag
  } = req.body

  if (!property_id || typeof property_id !== 'string' || !property_id.trim())
    return res.status(400).json({ errors: { general: 'property_id is required' } })

  try {
    const result = await pool.query(
      `INSERT INTO favourites
        (user_id, property_id, property_title, property_price, property_location, property_image, property_beds, property_baths, property_sqft, property_tag)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (user_id, property_id) DO NOTHING
       RETURNING *`,
      [req.user.id, property_id.trim(), property_title, property_price, property_location, property_image, property_beds, property_baths, property_sqft, property_tag]
    )
    if (result.rows.length === 0)
      return res.status(409).json({ errors: { general: 'Already in favourites' } })

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('[addFavourite]', err)
    res.status(500).json({ errors: { general: 'Could not save favourite.' } })
  }
}

export async function removeFavourite(req, res) {
  const { propertyId } = req.params

  if (!propertyId)
    return res.status(400).json({ errors: { general: 'propertyId is required' } })

  try {
    const result = await pool.query(
      'DELETE FROM favourites WHERE user_id = $1 AND property_id = $2 RETURNING id',
      [req.user.id, propertyId]
    )
    if (result.rows.length === 0)
      return res.status(404).json({ errors: { general: 'Favourite not found' } })

    res.json({ message: 'Removed from favourites' })
  } catch (err) {
    console.error('[removeFavourite]', err)
    res.status(500).json({ errors: { general: 'Could not remove favourite.' } })
  }
}
