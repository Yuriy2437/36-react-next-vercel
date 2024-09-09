import { getText } from '../lib/getText';
import TextForm from '../components/TextForm';

export default async function Home() {
  const text = await getText();

  return (
    <main>
      <h1>Text from JSON</h1>
      <p>Name: {text.name}</p>
      <p>Text: {text.text}</p>
      <TextForm />
    </main>
  );
}
