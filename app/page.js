import { getText } from '../lib/getText';
import TextForm from '../components/TextForm';

export default async function Home() {
  const initialData = await getText();

  return (
    <main>
      <h1>Text from JSON</h1>
      <p>Name: {initialData[0].name}</p>
      <p>Text: {initialData[0].text}</p>
      <TextForm initialData={initialData} />
    </main>
  );
}
