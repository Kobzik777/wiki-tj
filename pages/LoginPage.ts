import { Page } from '@playwright/test';

export class LoginPage {
  private readonly url = '/w/index.php?title=Special:UserLogin';

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.page.locator('#wpName1').fill(username);
    await this.page.locator('#wpPassword1').fill(password);
    await Promise.all([
      this.page.waitForURL((url) => !url.toString().includes('UserLogin'), {
        timeout: 15_000,
      }),
      this.page.locator('#wpLoginAttempt').click(),
    ]);
  }
}
