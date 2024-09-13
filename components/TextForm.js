'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TextForm({ initialData }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log('Initial data in TextForm:', initialData);
    if (initialData && Array.isArray(initialData)) {
      console.log('Setting entries:', initialData);
      setEntries(initialData);
    } else {
      console.log('Invalid initial data:', initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/update-text', { name, text });
      setEntries([...entries, response.data]);
      setName('');
      setText('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/update-text?id=${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Entries:</h2>
        {entries.map((item) => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ marginRight: '10px' }}>Name: {item.name}</span>
            <span style={{ marginRight: '10px' }}>Text: {item.text}</span>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
        />
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
