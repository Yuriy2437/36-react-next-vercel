import TextForm from '../components/TextForm';
import clientPromise from '../lib/mongodb';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db('name_text');
  const collection = db.collection('texts');
  const initialData = await collection.find({}).toArray();

  console.log('Data from MongoDB:', initialData); // Добавьте это для отладки

  // Преобразуем _id в строку для корректной сериализации
  const serializedData = initialData.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <main>
      <h1>Text from MongoDB</h1>
      <TextForm initialData={serializedData} />
    </main>
  );
}
