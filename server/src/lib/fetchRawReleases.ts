// server/src/lib/fetchRawReleases.ts
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { parseISO, format } from 'date-fns';
import { createObjectCsvWriter } from 'csv-writer';

const repos = [
  { name: 'stackflow', url: 'https://api.github.com/repos/daangn/stackflow/releases' },
  { name: 'seed-design', url: 'https://api.github.com/repos/daangn/seed-design/releases' },
];

interface RawRelease {
  repo: string;
  tag_name: string;
  created_at: string;
  published_at: string;
  author: string;
  prerelease: boolean;
  draft: boolean;
  created_date: string;
  created_time: string;
  published_date: string;
  published_time: string;
}

export async function fetchAndSaveRawReleases(): Promise<void> {
  const records: RawRelease[] = [];

  for (const repo of repos) {
    const res = await axios.get(repo.url, {
      headers: { 'Accept': 'application/vnd.github+json' },
    });

    const releases = res.data;

    releases.forEach((release: any) => {
      const created = parseISO(release.created_at);
      const published = parseISO(release.published_at);

      records.push({
        repo: repo.name,
        tag_name: release.tag_name,
        created_at: release.created_at,
        published_at: release.published_at,
        author: release.author?.login || 'unknown',
        prerelease: release.prerelease,
        draft: release.draft,
        created_date: format(created, 'yyyy-MM-dd'),
        created_time: format(created, 'HH:mm:ss'),
        published_date: format(published, 'yyyy-MM-dd'),
        published_time: format(published, 'HH:mm:ss'),
      });
    });
  }

  const outputPath = path.resolve(__dirname, '../../raw_releases.csv');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'repo', title: 'repo' },
      { id: 'tag_name', title: 'tag_name' },
      { id: 'created_at', title: 'created_at' },
      { id: 'published_at', title: 'published_at' },
      { id: 'author', title: 'author' },
      { id: 'prerelease', title: 'prerelease' },
      { id: 'draft', title: 'draft' },
      { id: 'created_date', title: 'created_date' },
      { id: 'created_time', title: 'created_time' },
      { id: 'published_date', title: 'published_date' },
      { id: 'published_time', title: 'published_time' },
    ],
  });

  await csvWriter.writeRecords(records);
  console.log('✅ Raw release CSV 생성 완료!');
}
