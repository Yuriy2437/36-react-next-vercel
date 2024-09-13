import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  const data = await collection.find({}).toArray();
  return NextResponse.json(data);
}

export async function POST(request) {
  const { name, text } = await request.json();

  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  const result = await collection.insertOne({ name, text, ip: '' });
  return NextResponse.json({ _id: result.insertedId, name, text });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('your_database_name');
    const collection = db.collection('texts');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: 'Entry deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Entry not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
