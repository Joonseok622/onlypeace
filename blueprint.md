# Application Blueprint

This project is now a "Lunch Menu Recommender" for Korean office workers.

## Current Features
*   **Header:** Title "오늘 뭐 먹지?" (What to eat today?)
*   **Action:** Button to recommend a lunch menu.
*   **Theme:** Dark mode support.
*   **Partnership:** Formspree contact form.
*   **Community:** Disqus comments.
*   **Content:** 20 representative Korean lunch menus with placeholder images.

## Recent Changes
*   Added `blueprint.md` to track project state.
*   Added a Formspree partnership inquiry form.
*   Added Disqus comments section.
*   Refactored into a Menu Recommender.
*   **UI Update:** Moving theme toggle to top-right.
*   **Feature:** Adding English/Korean language toggle.
*   **Feature:** Added "Animal Face Check" (Teachable Machine) integration with image upload.
*   **Analytics:** Added Google Analytics (gtag.js).

## Plan: UI/UX Improvements & Localization
*   **Top Controls:**
    *   Move "Theme Toggle" to the top-right corner of the screen.
    *   Add "Language Toggle" (KO/EN) next to it.
    *   **Add "Animal Face Check" button.**
*   **Teachable Machine Integration:**
    *   Implement image upload capability (replacing webcam).
    *   Display prediction results (Animal Face).
    *   Use `./my_model/` as the model source.
*   **Localization (i18n):**
    *   Update `index.html` with `data-i18n` attributes for text elements.
    *   Update `main.js` to manage language state ('ko'/'en').
    *   Implement dynamic text switching for UI elements, placeholders, and the recommended menu card.
*   **Deployment:** Deploy updates to GitHub.