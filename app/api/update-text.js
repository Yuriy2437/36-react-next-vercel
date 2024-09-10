import clientPromise from '../../lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  const data = await collection.find({}).toArray();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { name, text } = await req.json();
  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  await collection.insertOne({ name, text });
  const data = await collection.find({}).toArray();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
