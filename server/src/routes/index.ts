import { FastifyInstance } from 'fastify'
import { AppContext } from '../types/context'
import { createUserRoutes } from './userRoutes'
import healthRoutes from './healthRoutes'
import { releaseRoutes } from './releaseRoutes'  // ✅ 오타 수정됨
import { statsRoutes } from './statsRoutes';

export const createRoutes = (context: AppContext) => async (fastify: FastifyInstance) => {
  // 헬스 체크 라우트
  fastify.register(healthRoutes, { prefix: '/api/health' })

  // 사용자 관련 라우트
  fastify.register(createUserRoutes(context), { prefix: '/api/users' })

  // 릴리스 관련 라우트
  fastify.register(releaseRoutes, { prefix: '/api/releases' })  // ✅ 올바른 등록 방식

  fastify.register(statsRoutes, { prefix: '/api' });

}

