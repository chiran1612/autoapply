import asyncio
from app.services.scrapers.linkedin import linkedin_scraper

async def test_scraper():
    print("Testing LinkedIn Scraper...")
    jobs = await linkedin_scraper.scrape_jobs("React Developer", "Remote", limit=3)
    print(f"Found {len(jobs)} jobs:")
    for job in jobs:
        print(f"- {job['title']} at {job['company']} ({job['url']})")

if __name__ == "__main__":
    asyncio.run(test_scraper())
