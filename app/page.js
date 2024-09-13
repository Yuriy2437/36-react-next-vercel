import TextForm from '../components/TextForm';
import clientPromise from '../lib/mongodb';

export default async function Home() {
  try {
    const client = await clientPromise;
    const db = client.db('name_text');
    const collection = db.collection('texts');

    console.log('Connected to database:', process.env.MONGODB_DB_NAME);
    console.log('Collection name:', collection.collectionName);

    const initialData = await collection.find({}).toArray();
    console.log('Raw data from MongoDB:', initialData);

    const serializedData = initialData.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    console.log('Serialized data:', serializedData);

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
