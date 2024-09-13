import TextForm from '../components/TextForm';
import clientPromise from '../lib/mongodb';

export default async function Home() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection('texts');
    const initialData = await collection.find({}).toArray();

    console.log('Initial data from MongoDB:', initialData); // Добавьте это для отладки

    // Преобразуем _id в строку для корректной сериализации
    // const serializedData = initialData.map((item) => ({
    //   ...item,
    //   _id: item._id.toString(),
    // }));

    return (
      <main>
        <h1>Text from MongoDB</h1>
        <TextForm initialData={serializedData} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <main>
        <h1>Error loading data</h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
