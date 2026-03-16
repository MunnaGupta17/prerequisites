# Prerequisites 🌍

> Real travel wisdom from people who've already been there.

## Project Structure

```
prerequisites/
├── frontend/   → React + Vite + Tailwind
├── backend/    → Node.js + Express + Prisma + PostgreSQL
```

## Getting Started

### Backend
```bash
cd backend
npm install
# create a .env file (see .env.example)
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **Deployment**: Vercel (frontend) + Railway (backend)
