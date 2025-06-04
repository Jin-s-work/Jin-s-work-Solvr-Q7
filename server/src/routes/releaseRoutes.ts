import { FastifyInstance } from 'fastify'
import { fetchAndSaveReleaseStats } from '../lib/fetchReleases'
import { fetchAndSaveRawReleases } from '../lib/fetchRawReleases'

export async function releaseRoutes(fastify: FastifyInstance) {
  // 통계 정보 수집
  fastify.get('/fetch', async (request, reply) => {
    try {
      await fetchAndSaveReleaseStats()
      return reply.send({ message: 'Release stats fetched and saved.' })
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Failed to fetch release stats' })
    }
  })

  // 🔥 Raw release 데이터 수집
  fastify.get('/fetch-raw', async (request, reply) => {
    try {
      await fetchAndSaveRawReleases()
      return reply.send({ message: 'Raw release data fetched and saved.' })
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Failed to fetch raw release data' })
    }
  })
}
