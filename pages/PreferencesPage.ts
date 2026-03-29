import { Page } from '@playwright/test';

export class PreferencesPage {
  private readonly url = '/wiki/Special:Preferences';

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(this.url);
  }

  async selectLanguage(languageCode: string) {
    const languageSelect = this.page.locator('#mw-input-wplanguage select');
    await languageSelect.waitFor({ state: 'attached' });
    await languageSelect.selectOption({ value: languageCode }, { force: true });
  }

  async savePreferences() {
    await this.page.locator('#prefcontrol').click();
    await this.page.waitForLoadState('networkidle', { timeout: 15_000 });
  }
}
