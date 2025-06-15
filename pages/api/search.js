import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

let cachedData = [];

async function loadCSVData() {
  if (cachedData.length > 0) return cachedData;

  const filePath = path.join(process.cwd(), 'data.csv');

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        cachedData = results;
        resolve(results);
      })
      .on('error', reject);
  });
}

export default async function handler(req, res) {
  const { query } = req.query;
  const data = await loadCSVData();
  const filtered = data.filter(row =>
    Object.values(row).some(val =>
      val.toLowerCase().includes(query.toLowerCase())
    )
  );
  res.status(200).json(filtered);
}
