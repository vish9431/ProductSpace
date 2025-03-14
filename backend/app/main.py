from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
import asyncio

from app.config import CORS_ORIGINS
from app.scrapers.linkedin_scraper import scrape_linkedin_jobs
from app.scrapers.naukri_scraper import scrape_naukri_jobs
from app.services.redis_service import get_cached_jobs, cache_jobs

app = FastAPI(title="Job Board API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Board API"}

@app.get("/api/jobs", response_model=List[Dict[str, Any]])
async def get_jobs(
    query: str = Query(..., description="Job search query"),
    location: Optional[str] = Query("", description="Job location"),
    experience: Optional[str] = Query("", description="Experience level"),
    source: Optional[str] = Query("all", description="Job source (linkedin, naukri, all)")
):
    cached_jobs = get_cached_jobs(query, location, experience)
    if cached_jobs:
        if source != "all":
            return [job for job in cached_jobs if job["source"].lower() == source.lower()]
        return cached_jobs
    
    jobs = []
    
    if source.lower() in ["all", "linkedin"]:
        linkedin_jobs = scrape_linkedin_jobs(query, location, experience)
        jobs.extend(linkedin_jobs)
    
    if source.lower() in ["all", "naukri"]:
        naukri_jobs = scrape_naukri_jobs(query, location, experience)
        jobs.extend(naukri_jobs)
    
    if jobs:
        cache_jobs(query, location, experience, jobs)
    
    return jobs

@app.get("/api/job/{job_id}")
async def get_job_details(job_id: str):
    return {
        "id": job_id,
        "title": "Software Engineer",
        "company": "Tech Company",
        "location": "Remote",
        "description": "This is a detailed job description for the position.",
        "requirements": [
            "3+ years of experience in Python",
            "Experience with web frameworks like FastAPI or Flask",
            "Knowledge of front-end technologies"
        ],
        "application_link": "https://example.com/apply"
    }