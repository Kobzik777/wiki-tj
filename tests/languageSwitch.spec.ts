import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PreferencesPage } from '../pages/PreferencesPage';

const TARGET_LANGUAGE_CODE = 'uk';
const EXPECTED_UI_TEXT_UK = 'Налаштування';

test.describe('Wikipedia — interface language switch', () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.WIKI_USERNAME;
    const password = process.env.WIKI_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Missing credentials. Set WIKI_USERNAME and WIKI_PASSWORD in your .env file.',
      );
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('TC-001 — authenticated user can switch the UI language to Ukrainian', async ({
    page,
  }) => {
    const preferencesPage = new PreferencesPage(page);

    await preferencesPage.goto();
    await preferencesPage.selectLanguage(TARGET_LANGUAGE_CODE);
    await preferencesPage.savePreferences();

    const preferencesLink = page.locator('#pt-preferences a, a[href*="Special:Preferences"]').first();
    await expect(preferencesLink).toContainText(EXPECTED_UI_TEXT_UK, {
      timeout: 10_000,
    });
  });

  test.afterEach(async ({ page }) => {
    const preferencesPage = new PreferencesPage(page);
    await preferencesPage.goto();
    await preferencesPage.selectLanguage('en');
    await preferencesPage.savePreferences();
  });
});
