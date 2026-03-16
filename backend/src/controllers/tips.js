import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

// Validation schema using Zod
const TipSchema = z.object({
  destinationSlug: z.string().min(1),
  text:            z.string().min(20, 'Tip must be at least 20 characters'),
  category:        z.enum(['SCAM','VISA','MONEY','TRANSPORT','FOOD','CULTURE','PACKING','ACCOMMODATION','GENERAL']),
  travellerType:   z.enum(['SOLO','COUPLE','FAMILY','GROUP','BUDGET','LUXURY']).optional(),
  authorName:      z.string().max(50).optional(),
  authorFrom:      z.string().max(50).optional(),
  bestMonths:      z.array(z.string()).optional(),
})

// POST /api/tips
export async function createTip(req, res, next) {
  try {
    const parsed = TipSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() })
    }

    const { destinationSlug, ...tipData } = parsed.data

    const destination = await prisma.destination.findUnique({
      where: { slug: destinationSlug }
    })
    if (!destination) return res.status(404).json({ error: 'Destination not found' })

    const tip = await prisma.tip.create({
      data: { ...tipData, destinationId: destination.id }
    })

    res.status(201).json(tip)
  } catch (err) { next(err) }
}

// POST /api/tips/:id/vote  { direction: 1 or -1 }
export async function voteTip(req, res, next) {
  try {
    const tipId    = parseInt(req.params.id)
    const { direction } = req.body        // +1 upvote, -1 downvote
    const voterIp  = req.ip || 'unknown'

    if (![1, -1].includes(direction)) {
      return res.status(400).json({ error: 'direction must be 1 or -1' })
    }

    // Check if this IP already voted on this tip
    const existing = await prisma.vote.findUnique({
      where: { tipId_voterIp: { tipId, voterIp } }
    })

    if (existing) {
      // Remove vote (toggle off)
      await prisma.vote.delete({ where: { id: existing.id } })
      await prisma.tip.update({
        where: { id: tipId },
        data:  { voteCount: { increment: -direction } }
      })
      return res.json({ action: 'removed' })
    }

    // Add vote
    await prisma.vote.create({ data: { tipId, direction, voterIp } })
    const updated = await prisma.tip.update({
      where: { id: tipId },
      data:  { voteCount: { increment: direction } }
    })

    res.json({ action: 'added', voteCount: updated.voteCount })
  } catch (err) { next(err) }
}
