# Job Board - Full-Stack Web App

A **full-stack job board application** that fetches job listings from **LinkedIn & Naukri**, provides **real-time job search**, and features a **FastAPI backend** with a **React frontend**.

---

## Project Overview
**Job Board** allows users to:  
✅ **Search for jobs** (by title, location, experience level)  
✅ **Get job listings from LinkedIn & Naukri**  
✅ **FastAPI Backend deployed on Render**  
✅ **React Frontend deployed on Vercel**  
✅ **Caching enabled using Upstash Redis for faster responses**  <br />
⚠️ **Note: As my backend is hosted on free tier on Render, it may take some time to get results.**

---

## Demo Video
🎬 **Watch the full demo video here:**  
[![Job Board Demo](https://img.youtube.com/vi/1xsK9gTQXCxQD9WfjdNHdqSKCuWkkhRAj/maxresdefault.jpg)](https://drive.google.com/file/d/1xsK9gTQXCxQD9WfjdNHdqSKCuWkkhRAj/view?usp=sharing)

---

## Live Demo
🔹 **Frontend (React - Vercel):** [https://product-space-ppwm-pj05fbn45-vishnus-projects-07b297e2.vercel.app](https://product-space-ppwm-pj05fbn45-vishnus-projects-07b297e2.vercel.app)  
🔹 **Backend (FastAPI - Render):** [https://productspace.onrender.com](https://productspace.onrender.com)  

---

## Table of Contents
- [Features](#features)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features

- Job listings from multiple sources (LinkedIn, Naukri)
- Advanced search filters (job title, location, experience)
- Redis caching for improved performance
- Responsive UI for mobile and desktop

## Backend Setup (FastAPI + Upstash Redis)

### 1. Clone the Repository
```sh
git clone https://github.com/vish9431/ProductSpace.git
cd backend
```

### 2. Set Up a Virtual Environment
```sh
python3 -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the Backend
```sh
uvicorn app.main:app --reload
```
Backend will be live at `http://localhost:8000`

## Frontend Setup (React)

### 1. Go to the Frontend Directory
```sh
cd frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Frontend
```sh
npm start
```
Frontend will be live at `http://localhost:3000`

## API Endpoints

### Get Job Listings
```
GET /api/jobs?query=software%20developer&location=remote&experience=3&source=all
```

#### Example Response
```json
[
  {
    "id": "12345",
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "Remote",
    "application_link": "https://linkedin.com/job123",
    "source": "LinkedIn",
    "experience": "3+ years"
  }
]
```

### Get Job Details
```
GET /api/job/{job_id}
```

#### Example Response
```json
{
  "id": "12345",
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "Remote",
  "description": "Detailed job description here...",
  "requirements": ["Python", "FastAPI", "React"],
  "application_link": "https://linkedin.com/job123"
}
```

## Deployment

- Backend (FastAPI) deployed on Render
- Frontend (React) deployed on Vercel
- Job scraping from LinkedIn & Naukri
- Caching with Upstash Redis


