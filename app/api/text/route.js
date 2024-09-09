import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  let entries = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    entries = JSON.parse(fileContent);
  }

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { name, text } = await req.json();
  const filePath = path.join(process.cwd(), 'public', 'text.json');

  let entries = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    entries = JSON.parse(fileContent);
  }

  entries.push({ name, text });

  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
