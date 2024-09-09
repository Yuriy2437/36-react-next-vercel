'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TextForm({ initialData }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submittedData, setSubmittedData] = useState(initialData);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/update-text');
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/update-text', { name, text });
      setSubmittedData(response.data);
      setName('');
      setText('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      {submittedData.map((item, index) => (
        <p key={index}>
          Name: {item.name}, Text: {item.text}
        </p>
      ))}
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
