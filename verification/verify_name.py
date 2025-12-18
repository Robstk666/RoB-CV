from playwright.sync_api import sync_playwright

def verify_name_change():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:5173")
        page.wait_for_timeout(3000)

        # Check for the new name
        # The name is "ДЕННИС РОДМАН" but split with <br />
        # It's in an H1

        # We can check text content
        h1 = page.locator("h1")
        text = h1.inner_text()
        print(f"H1 Text: {text}")

        if "ДЕННИС" in text and "РОДМАН" in text:
            print("PASS: Name updated successfully.")
        else:
            print("FAILED: Name not updated.")

        page.screenshot(path="verification/name_change.png")
        browser.close()

if __name__ == "__main__":
    verify_name_change()
