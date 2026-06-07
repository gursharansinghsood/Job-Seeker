# 🧳 Job-Seeker

A full-stack job portal platform connecting **job seekers** with **recruiters** — built with the MERN stack.

🔗 **Live Demo**: [job-seeker-prince.vercel.app](https://job-seeker-prince.vercel.app/)

---

## ✨ Features

- 🔐 **Authentication** — Secure JWT-based signup, login & profile management
- 📋 **Job Posts** — Recruiters can create and manage job listings
- 📨 **Applications** — Job seekers can apply and track application status
- 🔖 **Saved Jobs** — Bookmark jobs to revisit later
- 🔔 **Notifications** — Real-time notification system with read/clear support

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Vite                       |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB (Mongoose)                |
| Auth      | JWT (stored in localStorage)      |
| Hosting   | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
job-seeker/
├── backend/      # Express server — models, routes, controllers
└── frontend/     # React (Vite) — UI & client-side logic
```

---

## ⚙️ Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- MongoDB connection string (e.g. MongoDB Atlas)

---

### 1️⃣ Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

> Backend runs on **port 5000** by default.

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

> Frontend runs at **http://localhost:5173** by default.

---

## 🚀 Running Locally

Open two terminal windows:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

---

## 🌐 API Reference

Base URL: `VITE_BACKEND_URL/api`

### 👤 User
| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| POST   | `/api/user/login`      | Login               |
| POST   | `/api/user/signup`     | Register            |
| PUT    | `/api/user/update/:id` | Update profile      |

### 🏢 Recruiter
| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| GET/POST | `/api/recruiter/posts`          | All posts / create post  |
| GET    | `/api/recruiter/myposts/:username`| Recruiter's own posts    |
| GET    | `/api/recruiter/applicants/:postId` | Applicants for a post  |

### 📨 Applications
| Method | Endpoint                         | Description             |
|--------|----------------------------------|-------------------------|
| POST   | `/api/applied/apply`             | Apply to a job          |
| GET    | `/api/applied/check/:userId/:postId` | Check if applied    |
| GET    | `/api/applied/:userId`           | All applications        |
| PUT    | `/api/applied/status/:id`        | Update status           |

### 🔖 Saved Jobs
| Method | Endpoint                          | Description         |
|--------|-----------------------------------|---------------------|
| POST   | `/api/saved/save`                 | Save a job          |
| DELETE | `/api/saved/unsave/:userId/:postId` | Unsave a job      |
| GET    | `/api/saved/check/:userId/:postId` | Check if saved     |
| GET    | `/api/saved/:userId`              | All saved jobs      |

### 🔔 Notifications
| Method | Endpoint                             | Description              |
|--------|--------------------------------------|--------------------------|
| GET    | `/api/notifications/:userId`         | All notifications        |
| GET    | `/api/notifications/unread/:userId`  | Unread notifications     |
| PUT    | `/api/notifications/read/:id`        | Mark one as read         |
| PUT    | `/api/notifications/readall/:userId` | Mark all as read         |
| DELETE | `/api/notifications/delete/:id`      | Delete one               |
| DELETE | `/api/notifications/clear/:userId`   | Clear all                |

---

## ☁️ Deployment

This project is deployed using:

- **Frontend** → [Vercel](https://vercel.com/)
- **Backend** → [Render](https://render.com/)

### Environment Variables for Production

**Backend `.env`:**
```env
MONGO_URL=your_production_mongodb_url
FRONTEND_URL=https://job-seeker-prince.vercel.app
```

**Frontend `.env`:**
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

> ⚠️ Make sure `FRONTEND_URL` in the backend matches your Vercel domain exactly — this is used for CORS configuration.

---

