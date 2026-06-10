# 🧳 Job-Seeker

> A full-stack job portal platform connecting **job seekers** with recruiters — built with the MERN stack.

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Full%20Stack-00C896?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Vite-61DBFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Backend-3C873A?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## 🔗 Live Demo

👉 [job-seeker-prince.vercel.app](https://job-seeker-prince.vercel.app/)

---

## ✨ Features

- 🔐 JWT Authentication (Login / Signup / Profile)
- 📋 Recruiter job post management
- 📨 Job applications with tracking system
- 🔖 Save / Unsave jobs
- 🔔 Real-time notifications system
- 👥 Role-based access (Recruiter / Job Seeker)
- ⚡ REST API integration

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React, Vite |
| Backend  | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth     | JWT (localStorage) |
| Hosting  | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
job-seeker/
├── backend/   → Express API (Routes, Models, Controllers)
└── frontend/  → React UI (Vite)
```

---

## ⚙️ Local Setup

### 📌 Prerequisites

- Node.js (LTS)
- MongoDB Atlas / Local MongoDB

---

### 🧩 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Run server:

```bash
npm run dev
```

👉 Runs on `http://localhost:5000`

---

### 🎨 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run app:

```bash
npm run dev
```

👉 Runs on `http://localhost:5173`

---

## 🚀 Run Full Project

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## 🌐 API Overview

Base URL: `VITE_BACKEND_URL/api`

### 👤 User APIs
- Login / Signup
- Profile Update

### 🏢 Recruiter APIs
- Create / Manage Jobs
- View Applicants
- Manage Posts

### 📨 Application APIs
- Apply to Jobs
- Track Status
- View Applications

### 🔖 Saved Jobs APIs
- Save / Unsave Jobs
- Fetch Saved Jobs

### 🔔 Notification APIs
- Read / Unread Notifications
- Mark as Read / Clear All

---

## ☁️ Deployment

- 🌐 Frontend: Vercel  
- ⚙️ Backend: Render  
- 🗄️ Database: MongoDB Atlas  

---

## 🔐 Production Config

### Backend `.env`

```env
MONGO_URL=your_production_db
FRONTEND_URL=https://job-seeker-prince.vercel.app
```

### Frontend `.env`

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```
