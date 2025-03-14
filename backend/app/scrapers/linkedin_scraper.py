import requests
from bs4 import BeautifulSoup
import time
import random
from app.config import USER_AGENT, SCRAPE_DELAY

def scrape_linkedin_jobs(query, location, experience_level=""):
    jobs = []
    url = f"https://www.linkedin.com/jobs/search/?keywords={query}&location={location}"
    
    if experience_level:
        url += f"&f_E={experience_level}"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return jobs
    
    soup = BeautifulSoup(response.text, "html.parser")
    job_cards = soup.find_all("div", class_="base-card")
    
    for card in job_cards:
        try:
            title_element = card.find("h3", class_="base-search-card__title")
            title = title_element.text.strip() if title_element else "No title"
            
            company_element = card.find("h4", class_="base-search-card__subtitle")
            company = company_element.text.strip() if company_element else "No company"
            
            location_element = card.find("span", class_="job-search-card__location")
            loc = location_element.text.strip() if location_element else "No location"
            
            link_element = card.find("a", class_="base-card__full-link")
            link = link_element.get("href") if link_element else "#"
            
            job_id = card.get("data-entity-urn", "").split(":")[-1]
            
            job = {
                "id": job_id,
                "title": title,
                "company": company,
                "location": loc,
                "application_link": link,
                "source": "LinkedIn",
                "experience": "Not specified"  
            }
            jobs.append(job)
        except Exception as e:
            continue
        
        time.sleep(random.uniform(0.1, 0.3))
    
    time.sleep(SCRAPE_DELAY)
    return jobs