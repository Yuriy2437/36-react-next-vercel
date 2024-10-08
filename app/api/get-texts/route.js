import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export const revalidate = 0; // Отключаем кэширование

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('name_text');
    const collection = db.collection('texts');

    const data = await collection.find({}).toArray();

    console.log('Data fetched from MongoDB:', data); // Добавьте для отладки

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
