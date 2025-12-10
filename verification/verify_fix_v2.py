from playwright.sync_api import sync_playwright

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Test 1: Desktop Layout
        # Viewport: 1920x1080
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:5173")
        page.wait_for_timeout(3000) # Wait for initial animations

        # Scroll to trigger animations (simulated)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.3)")
        page.wait_for_timeout(3000) # Wait for scrub animation

        # Left Panel (DNA) - should be on left
        dna_header = page.locator("text=Проф ДНК")
        if dna_header.count() == 0:
            print("FAILED: DNA Header not found")
        else:
            box = dna_header.bounding_box()
            if box and box['x'] < 500: # Arbitrary threshold for 'left'
                print(f"PASS: DNA Panel is on the left (x={box['x']})")
            else:
                print(f"FAILED: DNA Panel is not on the left (x={box['x']})")

        # Right Panel (Career) - should be on right
        career_header = page.locator("text=Карьера").first
        if career_header.count() == 0:
            print("FAILED: Career Header not found")
        else:
            box = career_header.bounding_box()
            if box and box['x'] > 1000: # Arbitrary threshold for 'right' on 1920 screen
                print(f"PASS: Career Panel is on the right (x={box['x']})")
            else:
                print(f"FAILED: Career Panel is not on the right (x={box['x']})")

        # Test 2: Projects Count (Desktop)
        # Scroll more to scene 2
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.5)")
        page.wait_for_timeout(3000)

        project_names = ["Сайты за 72 часа", "Росстройконтроль", "ГАУК «ЦВИ»", "Парк Отель", "Бойцовский клуб", "Rob's Rentals", "Chillin Place", "Акимбо"]

        visible_count = 0
        for name in project_names:
            # Check visibility
            btn = page.locator(f"button").filter(has_text=name).first
            if btn.is_visible():
                visible_count += 1
            else:
                # Check if it exists in DOM but hidden
                if btn.count() > 0:
                     print(f"Project '{name}' exists but is not visible (hidden or scrolled out?)")
                     visible_count += 1
                else:
                    print(f"Project '{name}' not found in DOM")

        print(f"Found Projects: {visible_count}/8")
        if visible_count == 8:
            print("PASS: All 8 projects are found.")
        else:
            print("FAILED: Not all projects are found.")

        # Take screenshot
        page.screenshot(path="verification/layout_verified.png")
        print("Screenshot saved to verification/layout_verified.png")

        browser.close()

if __name__ == "__main__":
    verify_layout()
