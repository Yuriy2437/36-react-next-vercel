import fs from 'fs/promises';
import path from 'path';

export async function GET(req) {
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { name, text } = await req.json();
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  data.push({ name, text });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
