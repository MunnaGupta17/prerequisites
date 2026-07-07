
# 🌍 Prerequisites — Full-Stack Travel Community Platform

> A modern full-stack travel intelligence platform where travelers share real experiences, scam alerts, visa information, local tips, and destination advice to help others travel smarter.

---

## 📖 Overview

**Prerequisites** is a community-driven travel platform built to help travelers make informed decisions before visiting a destination.

Instead of relying only on blogs or sponsored travel content, users can explore authentic experiences shared by fellow travelers. Tips are organized by destination and category, making it easy to find relevant information about visas, transportation, scams, food, culture, money, and packing.

The application is built as a complete full-stack project with a React frontend, Express REST API, PostgreSQL database, and Prisma ORM.

---

## ✨ Features

### 🔍 Search & Discovery
- Search destinations instantly
- Slug-based routing for clean SEO-friendly URLs
- Fast navigation between destination pages

### 📝 Community Tip Feed
- Browse traveler-submitted tips
- Filter by categories:
  - 🚨 Scams
  - 🛂 Visa
  - 💰 Money
  - 🚆 Transport
  - 🍜 Food
  - 🎭 Culture
  - 🎒 Packing
- Sort tips by:
  - 🔥 Top
  - 🆕

### 👍 Voting System
- Upvote and downvote travel tips
- IP-based voting system
- Toggle votes without duplicates
- Live vote count updates without page refresh

### ➕ Submit Travel Tips
- Simple tip submission form
- Backend validation using Zod
- Inline frontend validation errors
- Clean user experience

### 📱 Responsive UI
- Mobile-first responsive design
- Built entirely with Tailwind CSS
- Smooth animations
- Floating cards
- Marquee ticker effects

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- REST API
- Zod Validation

## Database

- PostgreSQL
- Prisma ORM

## Deployment

- Vercel (Frontend)
- Railway (Backend)

---

# 🏗 Architecture

```
React (Vite)
      │
      ▼
 Axios Service Layer
      │
      ▼
 Express REST API
      │
      ▼
 Prisma ORM
      │
      ▼
 PostgreSQL
```

---

# 🚀 Core Functionality

## Destination Search

Users can quickly search destinations from the homepage and navigate to dedicated pages using slug-based routing.

---

## Destination Pages

Each destination includes:

- Traveler tips
- Category filters
- Vote ranking
- Newest sorting
- Responsive layouts

---

## Tip Categories

- Scam Alerts
- Visa
- Money
- Transport
- Food
- Culture
- Packing

---

## Voting System

Implemented an IP-based voting system that supports:

- Upvote
- Downvote
- Vote switching
- Vote removal
- Live UI updates

No authentication is required while still preventing duplicate votes from the same IP.

---

## Tip Submission

Users can submit their own travel experiences.

Features include:

- Backend validation using Zod
- Frontend inline validation
- Clean error handling
- REST API integration

---

# 🔒 Security

The backend includes several production-ready security improvements.

### Rate Limiting

- 100 requests per 15 minutes per IP

### CORS

- Production CORS configuration
- Environment-based allowed origins

### Validation

- Zod schema validation
- Sanitized API inputs

---

# 🗄 Database Design

The application uses PostgreSQL with Prisma ORM.

Main entities:

- Destinations
- Tips
- Votes

Features:

- Normalized relational schema
- Foreign key relationships
- Enum types
- Referential integrity

Designed to easily support future additions like:

- User authentication
- Comments
- Images
- Bookmarks
- Saved destinations

---

# 📡 REST API

## Destinations

```http
GET /destinations
```

Returns all available destinations.

---

## Destination Tips

```http
GET /destinations/:slug/tips
```

Returns all tips for a destination.

---

## Submit Tip

```http
POST /tips
```

Creates a new travel tip.

---

## Vote on Tip

```http
POST /tips/:id/vote
```

Creates or updates a vote for a tip.

---

# 🧩 Frontend Architecture

The frontend was structured around reusable components and custom hooks.

### Pages

- Home
- Destination Detail
- Submit Tip

### Reusable Components

- SearchBar
- DestinationCard
- TipCard
- Category Filters
- Sort Toggle

### Custom Hooks

- useDestination()
- useTips()

### Service Layer

A dedicated `api.js` service layer separates API communication from UI components, making the project easier to maintain and scale.

---

# 🌱 Seed Data

A custom Prisma seed script populates the database with:

- 6 countries
- Multiple traveler tips
- Different categories
- Realistic travel advice

This provides meaningful data immediately after setup.

---

# 💻 Local Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/prerequisites.git
```

```bash
cd prerequisites
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Configure Environment Variables

### Backend

Create a `.env` file.

```env
DATABASE_URL=your_postgresql_database_url
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create a `.env` file.

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## Run Database Migrations

```bash
npx prisma migrate dev
```

---

## Seed Database

```bash
npx prisma db seed
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Frontend

```bash
npm run dev
```

---

# 📁 Project Structure

```
prerequisites/

├── client/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   └── utils/
│
└── README.md
```

---

# 🚀 Deployment

The application is deployed using:

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | PostgreSQL |

Environment-based configuration allows the same codebase to work seamlessly in both development and production.

---

# 🎯 What I Built

This project was built entirely from scratch, including:

- ✅ Designed the PostgreSQL relational database
- ✅ Built the complete Express REST API
- ✅ Implemented Prisma ORM
- ✅ Created reusable React components
- ✅ Built custom React hooks
- ✅ Implemented frontend service architecture
- ✅ Developed live voting functionality
- ✅ Added backend validation using Zod
- ✅ Configured production security with Rate Limiting and CORS
- ✅ Created responsive UI using Tailwind CSS
- ✅ Added custom animations
- ✅ Seeded realistic travel data
- ✅ Deployed frontend and backend to production

---

# 📈 Future Improvements

- User authentication
- User profiles
- Comments
- Image uploads
- Saved destinations
- Search suggestions
- Pagination
- Infinite scrolling
- Traveler type filters
- Admin moderation dashboard

---

# ⭐ Outcome

**Prerequisites** is a production-ready full-stack application demonstrating modern web development practices, including scalable architecture, RESTful API design, relational database modeling, responsive frontend development, reusable component architecture, backend validation, production deployment, and secure API development.

It provides travelers with a collaborative platform for sharing trustworthy destination-specific knowledge while remaining flexible enough to support future features such as authentication, comments, and media uploads.

---

## 👨‍💻 Author

Built with ❤️ using React, Node.js, Express, PostgreSQL, Prisma, and Tailwind CSS.
