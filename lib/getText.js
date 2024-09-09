import fs from 'fs/promises';
import path from 'path';

export async function getText() {
  const filePath = path.join(process.cwd(), 'public', 'text.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}
