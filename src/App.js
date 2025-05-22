import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API_URL = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const res = await axios.post(`${API_URL}/todos`, { text });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${id}`, { text: newText });
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const summarizeTodos = async () => {
    try {
      const res = await axios.post(`${API_URL}/summarize`);
      setMessage(`✅ Summary sent to Slack: ${res.data.summary}`);
    } catch (err) {
      setMessage('❌ Failed to send summary.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo Summary Assistant</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <button onClick={summarizeTodos} style={styles.summarizeButton}>
        📤 Summarize & Send to Slack
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  summarizeButton: {
    marginTop: 20,
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 15,
    textAlign: 'center',
    color: '#555',
  },
};

export default App;
