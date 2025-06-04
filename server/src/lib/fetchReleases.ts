// server/src/lib/fetchReleases.ts
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { format, parseISO, getWeek, getYear } from 'date-fns';
import { createObjectCsvWriter } from 'csv-writer';

const repos = [
  { name: 'stackflow', url: 'https://api.github.com/repos/daangn/stackflow/releases' },
  { name: 'seed-design', url: 'https://api.github.com/repos/daangn/seed-design/releases' },
];

interface ReleaseStat {
  repo: string;
  date: string;
  year: number;
  month: number;
  week: number;
  day_of_week: string;
  release_count: number;
}

export async function fetchAndSaveReleaseStats(): Promise<void> {
  const stats: ReleaseStat[] = [];

  for (const repo of repos) {
    const res = await axios.get(repo.url, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });

    const releases = res.data;
    const counter: Record<string, number> = {};

    releases.forEach((release: any) => {
      const created = parseISO(release.created_at);
      const key = format(created, 'yyyy-MM-dd');
      counter[key] = (counter[key] || 0) + 1;
    });

    Object.entries(counter).forEach(([date, count]) => {
      const d = parseISO(date);
      stats.push({
        repo: repo.name,
        date,
        year: getYear(d),
        month: d.getMonth() + 1,
        week: getWeek(d),
        day_of_week: format(d, 'EEEE'),
        release_count: count,
      });
    });
  }

  // ✅ CSV 파일 저장 경로 설정 (루트 기준 절대경로)
  const outputPath = path.resolve(__dirname, '../../release_stats.csv');

  // 디렉토리 보장
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('📁 CSV 파일 저장 위치:', outputPath);
  console.log('📊 통계 개수:', stats.length);

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'repo', title: 'repo' },
      { id: 'date', title: 'date' },
      { id: 'year', title: 'year' },
      { id: 'month', title: 'month' },
      { id: 'week', title: 'week' },
      { id: 'day_of_week', title: 'day_of_week' },
      { id: 'release_count', title: 'release_count' },
    ],
  });

  await csvWriter.writeRecords(stats);
  console.log('✅ CSV 파일 생성 완료!');
}
