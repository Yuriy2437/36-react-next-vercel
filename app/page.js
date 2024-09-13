import TextForm from '../components/TextForm';
import clientPromise from '../lib/mongodb';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  const initialData = await collection.find({}).toArray();

  return (
    <main>
      <h1>Text from MongoDB</h1>
      <TextForm initialData={initialData} />
    </main>
  );
}
