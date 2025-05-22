# 📝 Todo Summary Assistant

A full-stack application that helps you manage todos, summarize them using an LLM (Cohere), and send the summary to a Slack channel.

## 🚀 Live Demo

https://todo-summary-assistance.netlify.app/  
> _(Update this with your actual deployed Netlify URL)_

---

## 🧩 Features

- Create, update, and delete todos
- Summarize all current todos using Cohere LLM
- Automatically send the summary to a configured Slack channel
- Clean and responsive UI built with React
- Supabase as the backend database

---

## 🏗 Tech Stack

todo-summary-assistant/
├── backend/                # Express.js backend
│   ├── index.js            # API routes and server logic
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables (not committed)
├── src/ --Frontend                   # React frontend source code
├── public/                 # Static frontend assets
├── package.json            # Frontend dependencies
├── .gitignore
├── README.md               # This file
└── .env.example            # Example environment variables

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone 
cd todo-summary-assistant

Create .env files from .env.example in both frontend/ and backend/
PORT=5000
SUPABASE_DB_URL= YOUR-id
COHERE_API_KEY=YOUR-API_KEY
SLACK_WEBHOOK_URL=YOUR_URL
REACT_APP_API_URL=http://localhost:5000

cd backend
npm install
cd ../frontend
npm install
cd backend
npm start
node index.js
cd ../frontend
npm start

Netlify: Great for fast, hassle-free deployment of React frontends.

 Deliverables Summary
✅ Source code (Frontend(src) + backend)

✅ .env.example for both environments

✅ Slack & LLM integration

✅ UI with todo editing, deleting, adding

✅ Live frontend deployment (Netlify)
