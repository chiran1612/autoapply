import asyncio
from playwright.async_api import async_playwright
import logging
from app.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LinkedInBot:
    async def apply_to_job(self, job_url: str, profile_data: dict):
        email = settings.LINKEDIN_EMAIL
        password = settings.LINKEDIN_PASSWORD

        if not email or not password:
            return {"status": "error", "message": "LinkedIn credentials not found in .env"}

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False) # Headful for testing
            context = await browser.new_context()
            page = await context.new_page()

            try:
                # 1. Login
                logger.info("Logging into LinkedIn...")
                await page.goto("https://www.linkedin.com/login")
                await page.fill("#username", email)
                await page.fill("#password", password)
                await page.click("button[type='submit']")
                await page.wait_for_url("https://www.linkedin.com/feed/", timeout=30000)

                # 2. Go to Job URL
                logger.info(f"Navigating to job: {job_url}")
                await page.goto(job_url)
                
                # 3. Click Easy Apply
                apply_button = await page.wait_for_selector(".jobs-apply-button", timeout=10000)
                if apply_button:
                    await apply_button.click()
                    logger.info("Clicked Easy Apply button")
                    
                    # 4. Handle Modal (Loop through steps)
                    await self._handle_apply_modal(page, profile_data)
                    return {"status": "success", "message": "Application submitted!"}
                else:
                    return {"status": "error", "message": "Easy Apply button not found"}

            except Exception as e:
                logger.error(f"Application failed: {e}")
                return {"status": "error", "message": str(e)}
            finally:
                await asyncio.sleep(5) # Wait to see result
                await browser.close()

    async def _handle_apply_modal(self, page, profile_data):
        # This is a simplified version of the multi-step modal handler
        # In a real bot, we'd answer screening questions here
        max_steps = 5
        for _ in range(max_steps):
            next_button = await page.query_selector("button[aria-label='Continue to next step'], button[aria-label='Review your application']")
            if next_button:
                await next_button.click()
                await asyncio.sleep(1)
            else:
                submit_button = await page.query_selector("button[aria-label='Submit application']")
                if submit_button:
                    await submit_button.click()
                    logger.info("Submitted application!")
                    break
                else:
                    break

linkedin_bot = LinkedInBot()
