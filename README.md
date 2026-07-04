# 🎬 CineTrack – Movie Watchlist & Review App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

A sleek, full-stack MERN-style application designed for movie enthusiasts. **CineTrack** allows users to discover, log, track, rate, and review their personal movie collections through a modern, responsive user interface.

🔗 **Live Frontend:** https://cinetrack-client.vercel.app 
📡 **Production API:** https://cinetrack-server.onrender.com

---

## 📌 Features

### 🎯 Core Functionality
*   **Dynamic Collection:** Add new movies with detailed metadata (title, genre, poster, release year).
*   **Watchlist Management:** Instantly toggle movies between `Watched` and `Unwatched` states.
*   **Interactive Rating System:** Add and update personal star ratings and written reviews.
*   **Real-time Operations:** Live client-side search filtering by title and quick state filters (*All*, *Watched*, *Unwatched*).
*   **CRUD Operations:** Seamless creation, retrieval, updates, and deletion integrated with MongoDB.

### 🎨 UI/UX Design
*   **Glassmorphism Theme:** Elegant premium dark-mode interface built with Tailwind CSS.
*   **Fluid Animations:** Scroll animations powered by AOS (Animate On Scroll) and smooth interactive micro-transitions.
*   **State Feedback:** Skeleton loaders and customized spinners for asymmetric data fetching.
*   **Action Notifications:** Toast notifications via React Toastify ensuring immediate user feedback.
*   **Responsive Grid:** Fully optimized layout adapting seamlessly across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

### Frontend
*   **Core:** React (Vite.js), React Router DOM (v6)
*   **Styling:** Tailwind CSS
*   **State & Forms:** React Hook Form
*   **HTTP Client:** Axios
*   **Feedback & Animation:** React Toastify, AOS Animation

### Backend
*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database ORM:** Mongoose / MongoDB Atlas
*   **Utilities:** CORS, Dotenv, Express Validator (Backend validation)

---

## 🔗 API Documentation
The complete API documentation for this project is available via Postman:
👉 [View API Documentation on Postman](আপনার_পোস্টম্যান_পাবলিক_লিংক_এখানে)

## 📁 Project Structure

```text
cine-track/
├── client/              # Frontend Web Application (React + Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI Components (Cards, Spinners, Navbar)
│   │   ├── pages/       # Page views (Dashboard, AddMovie, MovieDetails)
│   │   ├── hooks/       # Custom React hooks
│   │   └── App.jsx      # Main application routing
│   └── package.json
│
├── server/              # REST API Backend (Express)
│   ├── models/          # Mongoose Database Schemas
│   ├── routes/          # Express API Endpoints
│   ├── controllers/     # Request handling & Business logic
│   └── server.js        # Entry point
│
└── README.md
