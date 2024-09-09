'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/text', { name, text });
      setEntries([...entries, { name, text }]);
      setName('');
      setText('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div>
        {entries.map((entry, index) => (
          <div key={index}>
            <strong>{entry.name}:</strong> {entry.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          required
        />
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Text'
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
