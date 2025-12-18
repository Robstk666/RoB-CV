from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the app (assuming Vite runs on 5173 by default)
            page.goto("http://localhost:5173")

            # Wait for content to load
            page.wait_for_selector("h1")

            # 1. Verify Name Change
            h1_text = page.locator("h1").inner_text()
            print(f"H1 Text: {h1_text}")
            assert "ДЕННИС" in h1_text
            assert "РОДМАН" in h1_text

            # 2. Verify Layout Classes (Right Panel)
            # We check if the element has the classes we added
            right_panel = page.locator("div.md\\:left-auto.md\\:right-0")
            count = right_panel.count()
            print(f"Right panel elements with md:left-auto md:right-0 found: {count}")
            assert count >= 1

            # 3. Take Screenshot
            page.screenshot(path="verification/final_verified.png")
            print("Screenshot saved to verification/final_verified.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
