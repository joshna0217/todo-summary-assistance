import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 6,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TodoForm;
