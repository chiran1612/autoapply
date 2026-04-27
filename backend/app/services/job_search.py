from app.config import settings
import asyncio
import random

class JobSearchEngine:
    async def search_jobs(self, profile: dict):
        # MOCK IMPLEMENTATION FOR DEMO
        # In a real app, this would use Playwright to scrape LinkedIn, Naukri, etc.
        
        target_titles = profile.get('target_titles', ['Software Engineer'])
        location = profile.get('location', 'Remote')
        
        companies = ["Google", "Amazon", "Microsoft", "Netflix", "Atlassian", "Stripe", "Uber", "Airbnb"]
        platforms = ["LinkedIn", "Naukri", "Indeed", "Twitter (X)"]
        
        jobs = []
        for _ in range(12): # Generate 12 random mock jobs
            title = random.choice(target_titles)
            company = random.choice(companies)
            platform = random.choice(platforms)
            score = random.randint(70, 99)
            
            job = {
                "id": f"job_{random.randint(1000, 9999)}",
                "title": title,
                "company": company,
                "location": random.choice([location, "Remote", "Hybrid"]),
                "platform": platform,
                "score": score,
                "url": f"https://example.com/job/{random.randint(1000,9999)}",
                "reason": f"Strong match for {title} based on your Java and MongoDB experience."
            }
            jobs.append(job)
            
        # Sort by score descending
        jobs.sort(key=lambda x: x['score'], reverse=True)
        
        # Simulate network delay for scraping
        await asyncio.sleep(2)
        
        return jobs

job_search_engine = JobSearchEngine()
