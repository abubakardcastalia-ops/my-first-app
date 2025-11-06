import React, { useState } from 'react';
import ClickUpEditor from './ClickUpEditor';

const App = () => {
  const [title, setTitle] = useState('ClickUp Doc Clone');

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto' }}>
      <input
        type="text"
        placeholder="Enter title..."
        style={{
          width: '100%',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          padding: '10px',
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
        <ClickUpEditor />
      </div>
    </div>
  );
};

export default App;
