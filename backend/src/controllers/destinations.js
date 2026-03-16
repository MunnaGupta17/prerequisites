import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET /api/destinations
export async function getAllDestinations(req, res, next) {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { tips: true } } }
    })
    res.json(destinations)
  } catch (err) { next(err) }
}

// GET /api/destinations/:slug
export async function getDestinationBySlug(req, res, next) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug: req.params.slug },
      include: { _count: { select: { tips: true } } }
    })
    if (!destination) return res.status(404).json({ error: 'Destination not found' })
    res.json(destination)
  } catch (err) { next(err) }
}

// GET /api/destinations/:slug/tips?category=SCAM&travellerType=SOLO&sort=top
export async function getTipsByDestination(req, res, next) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug: req.params.slug }
    })
    if (!destination) return res.status(404).json({ error: 'Destination not found' })

    const { category, travellerType, sort = 'top' } = req.query

    const where = {
      destinationId: destination.id,
      ...(category      && { category }),
      ...(travellerType && { travellerType }),
    }

    const orderBy = sort === 'new'
      ? { createdAt: 'desc' }
      : { voteCount: 'desc' }

    const tips = await prisma.tip.findMany({ where, orderBy })
    res.json(tips)
  } catch (err) { next(err) }
}
