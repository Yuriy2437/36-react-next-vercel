'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TextForm({ initialData }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [entries, setEntries] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchLatestData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/get-texts');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching latest data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
  }, []);

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
    if (!isAdmin) return;
    try {
      await axios.delete(`/api/update-text?id=${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleAdminLogin = () => {
    if (adminLogin === 'Yuriy1967' && adminPassword === 'TREMOR') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setShowAdminLogin(false);
    setAdminLogin('');
    setAdminPassword('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Entries: {entries.length}</h2>
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
            {isAdmin && (
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            )}
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
      <button onClick={() => setShowAdminLogin(true)}>Admin</button>
      {showAdminLogin && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <input
            type='text'
            value={adminLogin}
            onChange={(e) => setAdminLogin(e.target.value)}
            placeholder='Login'
          />
          <input
            type='password'
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder='Password'
          />
          <button onClick={handleAdminLogin}>Authorize</button>
        </div>
      )}
    </div>
  );
}
