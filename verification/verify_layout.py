from playwright.sync_api import Page, expect, sync_playwright

def verify_layout(page: Page):
    # 1. Load the page
    page.goto("http://localhost:3000")

    # 2. Wait for content to load (e.g., waiting for the hero name or main panels)
    # The panels might be animated, but the structure should be there.
    # We wait for the 'Проекты & Компании' section to be sure the projects list is rendered.
    page.wait_for_selector("text=Проекты & Компании", timeout=10000)

    # 3. Check for the presence of 8 project buttons
    # We can query all buttons inside the grid.
    # The grid has class "grid grid-cols-2 gap-1 opacity-80 pr-1"

    # Note: the grid is inside the leftPanel which might be off-screen initially due to GSAP?
    # Actually, GSAP animates them in.
    # We might need to scroll or wait for animation.
    # However, for existence in DOM, they should be there.
    # We can try to force animation or just check DOM presence.

    # Let's count the buttons in the projects section.
    # Finding the container first
    projects_container = page.locator("div.grid.grid-cols-2.gap-1.opacity-80.pr-1")
    expect(projects_container).to_be_visible()

    buttons = projects_container.locator("button")
    count = buttons.count()
    print(f"Found {count} project buttons")

    if count != 8:
        raise Exception(f"Expected 8 project buttons, found {count}")

    # 4. Verify Layout Positions (via classes/styles check roughly)
    # Check Right Panel (Career) has right-0
    career_panel = page.locator("text=Карьера").locator("xpath=../../..") # Going up to the container
    # The container has 'absolute top-0 left-0 ... md:right-0'
    # Since we are running in headless chrome (likely desktop size by default), we check classes.
    # But Playwright sees computed styles.

    # We can also just check that the element is bounding box is on the right side.
    box = career_panel.bounding_box()
    viewport_width = page.viewport_size['width']

    # If on desktop (default 1280x720 usually), right panel width is 1/3 ~ 426px.
    # x should be around 1280 - 426 = 854.
    # But wait, GSAP might animate it from x: 120%.
    # We need to wait for animation or scrub scroll.

    # Let's scroll to trigger animations?
    # The ScrollTrigger scrubs with scroll.
    # We can scroll down.
    page.mouse.wheel(0, 1000)
    page.wait_for_timeout(2000) # Wait for animation

    # 5. Take Screenshot
    page.screenshot(path="/app/verification/layout_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set viewport to desktop size
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            verify_layout(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/app/verification/failure.png")
            raise
        finally:
            browser.close()
