# Job-Seeker (MERN) — Backend + Frontend

Yeh project **Job-Seeker** platform hai jisme:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT (token localStorage me)

---

## Project Structure
- `backend/` → Express server + MongoDB models/routes/controllers
- `frontend/` → React (Vite) UI

---

## Features (High level)
- User signup/login, profile update
- Posts create & fetch (recruiter side)
- Job apply, apply status update
- Save/unsave jobs
- Notifications (list/read/delete/clear)

---

## Prerequisites
- Node.js (LTS)
- MongoDB connection string

---

## Backend Setup
1. `backend/` folder me jao
2. Dependencies install:
   ```bash
   npm install
   ```
3. Environment variables set karo:
   - Backend `backend/src/config/config.js` ke hisaab se yeh variables required hain:
     - `MONGO_URL`
     - `FRONTEND_URL`

   Backend me `.env` file banao (example):
   ```env
   MONGO_URL=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   ```
   
4. Run server:
   ```bash
   npm run dev
   ```

**Default backend port**: `5000`

---

## Frontend Setup
1. `frontend/` folder me jao
2. Dependencies install:
   ```bash
   npm install
   ```
3. Environment variables set karo:
   - Frontend `frontend/src/service/api.js` me `import.meta.env.VITE_BACKEND_URL` use karta hai

   Frontend me `.env` file banao (example):
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Run frontend:
   ```bash
   npm run dev
   ```

**Frontend dev URL**: typically `http://localhost:5173`

---

## API Base URL
Frontend axios client me baseURL:
- `VITE_BACKEND_URL/api`

Backend routes (as per routers):
- `/api/user/login`
- `/api/user/signup`
- `/api/user/update/:id`
- `/api/recruiter/posts`
- `/api/recruiter/myposts/:username`
- `/api/recruiter/applicants/:postId`
- `/api/applied/apply`
- `/api/applied/check/:userId/:postId`
- `/api/applied/:userId`
- `/api/applied/status/:id`
- `/api/saved/save`
- `/api/saved/unsave/:userId/:postId`
- `/api/saved/check/:userId/:postId`
- `/api/saved/:userId`
- `/api/notifications/:userId`
- `/api/notifications/unread/:userId`
- `/api/notifications/read/:id`
- `/api/notifications/readall/:userId`
- `/api/notifications/delete/:id`
- `/api/notifications/clear/:userId`

---

## Running Locally (One-shot)
1. Backend start (5000):
   ```bash
   cd backend
   npm run dev
   ```
2. Frontend start (5173):
   ```bash
   cd frontend
   npm run dev
   ```

---

## Deployment Notes
- Backend ko public domain/URL par deploy karo.
- Frontend ke `.env` me `VITE_BACKEND_URL` update karo.
- Backend `.env` me `FRONTEND_URL` update karo (CORS ke liye).

---

## License
MIT (If you want, you can change it.)

