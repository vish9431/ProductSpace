import requests
from bs4 import BeautifulSoup
import time
import random
from app.config import USER_AGENT, SCRAPE_DELAY

def scrape_naukri_jobs(query, location, experience_level=""):
    jobs = []
    url = f"https://www.naukri.com/jobs-in-{location}?keyword={query}"
    
    if experience_level:
        url += f"&experience={experience_level}"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return jobs
    
    soup = BeautifulSoup(response.text, "html.parser")
    job_cards = soup.find_all("article", class_="jobTuple")
    
    for card in job_cards:
        try:
            title_element = card.find("a", class_="title")
            title = title_element.text.strip() if title_element else "No title"
            
            company_element = card.find("a", class_="subTitle")
            company = company_element.text.strip() if company_element else "No company"
            
            location_element = card.find("li", class_="location")
            loc = location_element.text.strip() if location_element else "No location"
            
            experience_element = card.find("li", class_="experience")
            experience = experience_element.text.strip() if experience_element else "Not specified"
            
            link_element = card.find("a", class_="title")
            link = link_element.get("href") if link_element else "#"
            
            job_id = link.split("-")[-1] if "-" in link else random.randint(10000, 99999)
            
            job = {
                "id": job_id,
                "title": title,
                "company": company,
                "location": loc,
                "application_link": link,
                "source": "Naukri",
                "experience": experience
            }
            jobs.append(job)
        except Exception as e:
            continue
        
        time.sleep(random.uniform(0.1, 0.3))
    
    time.sleep(SCRAPE_DELAY)
    return jobs