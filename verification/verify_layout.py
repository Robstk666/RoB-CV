from playwright.sync_api import sync_playwright, expect
import time

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a smaller height to check for cut-off content
        context = browser.new_context(viewport={'width': 1280, 'height': 600})
        page = context.new_page()

        try:
            page.goto("http://localhost:5173")

            print("Waiting for initial load...")
            time.sleep(2)

            # Scroll to reveal projects
            print("Scrolling to reveal projects...")
            page.evaluate("window.scrollTo(0, window.innerHeight * 3.0)")
            time.sleep(5) # Wait for animation

            page.screenshot(path="verification/layout_small_height.png")
            print("Screenshot saved.")

            project_info = page.evaluate("""() => {
                const h3s = Array.from(document.querySelectorAll('h3'));
                const projectsHeader = h3s.find(h => h.innerText.includes('Проекты & Компании'));
                if (!projectsHeader) return { count: 0, msg: "Header not found" };

                const container = projectsHeader.parentElement;
                // Container is the 'mega clients' div.
                // We want to check if the buttons are visible within the SCROLLABLE container.

                // The scrollable container is the parent of the parent of the header?
                // Header -> div (mega clients) -> div (scrollable container)
                const scrollContainer = container.parentElement;

                const grid = container.querySelector('.grid');
                const buttons = grid.querySelectorAll('button');

                let visibleCount = 0;
                const scrollRect = scrollContainer.getBoundingClientRect();

                buttons.forEach(b => {
                     const rect = b.getBoundingClientRect();
                     // Check if button is within the viewport of the scroll container
                     // And also generally visible
                     const isVisible = (
                        rect.top >= scrollRect.top &&
                        rect.bottom <= scrollRect.bottom &&
                        rect.height > 0
                     );

                     // Also check if it is within window viewport
                     const isInWindow = (
                        rect.top >= 0 &&
                        rect.bottom <= window.innerHeight
                     );

                     if (isVisible) visibleCount++;
                });

                return {
                    totalButtons: buttons.length,
                    visibleCount: visibleCount,
                    scrollContainerHeight: scrollContainer.clientHeight,
                    windowHeight: window.innerHeight,
                    msg: "OK"
                };
            }""")
            print("Project Info:", project_info)

        finally:
            browser.close()

if __name__ == "__main__":
    verify_layout()
