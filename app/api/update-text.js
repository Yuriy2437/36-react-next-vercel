import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return Response.json(data);
}

export async function POST(request) {
  const { name, text } = await request.json();
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  data.push({ name, text });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return Response.json(data);
}
