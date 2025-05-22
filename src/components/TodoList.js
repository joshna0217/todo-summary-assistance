import React, { useState } from 'react';

function TodoList({ todos, deleteTodo, updateTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    updateTodo(editingId, editText);
    setEditingId(null);
    setEditText('');
  };

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {todos.map(todo => (
        <li key={todo.id} style={styles.todoItem}>
          {editingId === todo.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={styles.editInput}
              />
              <button onClick={saveEdit} style={styles.saveBtn}>💾</button>
              <button onClick={cancelEditing} style={styles.cancelBtn}>✖</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <div>
                <button onClick={() => startEditing(todo)} style={styles.editBtn}>✏️</button>
                <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>🗑</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottom: '1px solid #eee',
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  editInput: {
    flexGrow: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  editBtn: {
    marginRight: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    color: 'red',
  },
  saveBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: 6,
    cursor: 'pointer',
    marginRight: 5,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    padding: '5px 10px',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default TodoList;
