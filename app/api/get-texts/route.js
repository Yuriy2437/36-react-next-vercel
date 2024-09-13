import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection('texts');
    const data = await collection.find({}).toArray();

    const serializedData = data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
