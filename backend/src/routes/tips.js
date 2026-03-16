import { Router } from 'express'
import { createTip, voteTip } from '../controllers/tips.js'

const router = Router()

router.post('/',            createTip)  // POST /api/tips
router.post('/:id/vote',    voteTip)    // POST /api/tips/42/vote

export default router
