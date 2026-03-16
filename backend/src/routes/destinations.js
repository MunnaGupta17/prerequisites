import { Router } from 'express'
import {
  getAllDestinations,
  getDestinationBySlug,
  getTipsByDestination,
} from '../controllers/destinations.js'

const router = Router()

router.get('/',        getAllDestinations)       // GET /api/destinations
router.get('/:slug',   getDestinationBySlug)    // GET /api/destinations/thailand
router.get('/:slug/tips', getTipsByDestination) // GET /api/destinations/thailand/tips?category=SCAM

export default router
