// server/src/routes/statsRoutes.ts
import { FastifyInstance } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface Stat {
  repo: string;
  date: string;
  release_count: number;
}

export async function statsRoutes(fastify: FastifyInstance) {
  const csvPath = path.resolve(__dirname, '../../release_stats.csv');
  let stats: Stat[] = [];

  try {
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const parsed = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    stats = parsed.map((row: any) => ({
      repo: row.repo,
      date: row.date,
      release_count: Number(row.release_count),
    }));
    console.log(`✅ statsRoutes: ${stats.length}건 로드됨`);
  } catch (e) {
    console.error('❌ release_stats.csv 로딩 실패:', e);
  }

  fastify.get('/stats', async (req, reply) => {
    return stats;
  });
}
