from app.services.scrapers.linkedin import linkedin_scraper
import asyncio

class JobSearchEngine:
    async def search_jobs(self, profile: dict):
        keywords = " ".join(profile.get('target_titles', ['Software Engineer']))
        location = profile.get('location', 'Remote')
        
        # Call the real scraper
        logger.info(f"Starting real job search for: {keywords} in {location}")
        jobs = await linkedin_scraper.scrape_jobs(keywords, location)
        
        # Add a mock reason for each job (we'll make this real with Gemini later)
        for job in jobs:
            job["id"] = f"ln_{hash(job['url']) % 10000}"
            job["reason"] = f"Matches your profile keywords: {keywords}"
            
        # Sort by score (currently fixed at 85)
        jobs.sort(key=lambda x: x.get('score', 0), reverse=True)
        
        return jobs

import logging
logger = logging.getLogger(__name__)
job_search_engine = JobSearchEngine()
