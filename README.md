# 🚀 AI Doubt Solver

An intelligent full-stack **AI-powered tutoring platform** that helps students solve doubts instantly using **text, image, and voice inputs**.

---

## 🌟 Problem

Students often face doubts during self-study:
- No teacher available
- Google gives irrelevant results
- Friends may not know the answer
- Doubts remain unresolved → knowledge gaps

> Having a doubt ≠ Getting it solved

---

## 💡 Solution

AI Doubt Solver bridges this gap by allowing students to:
- Ask doubts anytime (24/7)
- Use **text, image, or voice**
- Get **step-by-step explanations instantly**
- Save and revisit past doubts

---

## 🚀 Features

- 🔐 **Authentication**
  - Secure login & register using JWT
- 💬 **Chat-Based UI**
  - Conversations stored per user
- 🧠 **AI Explanations**
  - Step-by-step solutions using LLMs
- 🖼️ **Image Input**
  - Upload textbook questions
- 🎤 **Voice Input**
  - Speak doubts (speech-to-text)
- 📚 **Chat History**
  - Stored in MongoDB
- 🎯 **Subject Detection**
  - Auto-detects Math, Physics, etc.
- 📝 **Markdown Answers**
  - Structured responses with formatting

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### AI & APIs
- Groq (LLaMA Models)
- AssemblyAI (Speech-to-Text)

---

## ⚙️ Setup

```bash
# Clone
git clone https://github.com/your-username/ai-doubt-solver.git

# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
