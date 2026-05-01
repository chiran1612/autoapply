from playwright.async_api import async_playwright
import asyncio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LinkedInScraper:
    def __init__(self):
        self.base_url = "https://www.linkedin.com/jobs/search"

    async def scrape_jobs(self, keywords: str, location: str, limit: int = 10):
        jobs = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_context(
                viewport={"width": 1280, "height": 800},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
            ).new_page()
            
            search_url = f"{self.base_url}?keywords={keywords}&location={location}&f_TPR=r604800" # TPR=r604800 is last week
            logger.info(f"Scraping LinkedIn: {search_url}")
            
            try:
                await page.goto(search_url, wait_until="networkidle", timeout=60000)
                
                # Wait for job cards to load
                await page.wait_for_selector(".base-card", timeout=10000)
                
                job_cards = await page.query_selector_all(".base-card")
                logger.info(f"Found {len(job_cards)} job cards")

                for card in job_cards[:limit]:
                    try:
                        title_elem = await card.query_selector(".base-search-card__title")
                        company_elem = await card.query_selector(".base-search-card__subtitle")
                        location_elem = await card.query_selector(".job-search-card__location")
                        link_elem = await card.query_selector("a.base-card__full-link")
                        
                        if title_elem and company_elem and link_elem:
                            title = (await title_elem.inner_text()).strip()
                            company = (await company_elem.inner_text()).strip()
                            loc = (await location_elem.inner_text()).strip() if location_elem else location
                            url = await link_elem.get_attribute("href")
                            
                            # Clean URL (remove tracking params)
                            url = url.split('?')[0] if '?' in url else url
                            
                            jobs.append({
                                "title": title,
                                "company": company,
                                "location": loc,
                                "platform": "LinkedIn",
                                "url": url,
                                "score": 85 # Default score for now
                            })
                    except Exception as e:
                        logger.error(f"Error parsing job card: {e}")
                        continue
                        
            except Exception as e:
                logger.error(f"LinkedIn scraping failed: {e}")
            finally:
                await browser.close()
                
        return jobs

linkedin_scraper = LinkedInScraper()
