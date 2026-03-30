import { Router } from 'express'
import { addFavourite, getFavourites, removeFavourite } from '../controllers/favouritesController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

// All routes require auth
router.use(authMiddleware)

router.get('/', getFavourites)
router.post('/', addFavourite)
router.delete('/:propertyId', removeFavourite)

export default router
