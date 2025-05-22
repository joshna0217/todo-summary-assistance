require('dotenv').config();
console.log('Supabase URL:', process.env.SUPABASE_DB_URL);
console.log('Cohere Key:', process.env.COHERE_API_KEY ? 'Loaded' : 'Missing');
console.log('Slack Webhook:', process.env.SLACK_WEBHOOK_URL ? 'Loaded' : 'Missing');

console.log('Starting backend server...');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Pool } = require('pg');
const { CohereClient } = require('cohere-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Cohere Client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Connect to Supabase PostgreSQL
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
});

// ========== API Endpoints ==========

// GET /todos – Fetch all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /todos – Add a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (id, text, created_at) VALUES (gen_random_uuid(), $1, NOW()) RETURNING *',
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// DELETE /todos/:id – Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// POST /summarize – Use Cohere to summarize todos and send to Slack
app.post('/summarize', async (req, res) => {
  try {
    const result = await pool.query('SELECT text FROM todos ORDER BY created_at DESC');
    const todoTexts = result.rows.map(row => row.text);

    if (todoTexts.length === 0) {
      return res.status(400).json({ error: 'No todos to summarize.' });
    }

    const prompt = `Summarize this to-do list in a concise and helpful way:\n\n- ${todoTexts.join('\n- ')}`;
    console.log('Prompt to Cohere:', prompt);

    const cohereResponse = await cohere.generate({
      model: 'command',
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.7,
    });

    const summary = cohereResponse.generations[0].text.trim();

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *To-Do Summary:*\n${summary}`,
    });

    res.json({ summary });
  } catch (err) {
    console.error('Error during summarization or Slack send:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to summarize or send to Slack' });
  }
});
// PUT /todos/:id – Update a todo item text
// PUT /todos/:id - Update a todo
// PUT /todos/:id – Update a todo text
// PUT /todos/:id – Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const result = await pool.query(
      'UPDATE todos SET text = $1 WHERE id = $2 RETURNING *',
      [text, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
