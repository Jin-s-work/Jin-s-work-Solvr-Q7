// server/src/releaseRoutes.ts
import { FastifyInstance } from 'fastify'
import { fetchAndSaveReleaseStats } from '../lib/fetchReleases';


export async function releaseRoutes(fastify: FastifyInstance) {
  fastify.get('/fetch', async (request, reply) => {
    try {
      await fetchAndSaveReleaseStats()
      return reply.send({ message: 'Release stats fetched and saved.' })
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Failed to fetch release stats' })
    }
  })
}
