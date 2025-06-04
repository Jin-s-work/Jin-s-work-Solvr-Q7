// client/src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Stat {
  repo: string;
  date: string;
  release_count: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Stat[]>([]);

  useEffect(() => {
    fetch('/release_stats.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const [header, ...rows] = lines;
        const headers = header.split(',');

        const parsed = rows.map(row => {
          const values = row.split(',');
          const obj: any = {};
          headers.forEach((h, i) => {
            obj[h] = values[i];
          });
          return {
            repo: obj.repo,
            date: obj.date,
            release_count: Number(obj.release_count),
          };
        });

        setData(parsed);
      });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Release Stats Dashboard</h2>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="release_count" name="Release Count" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
