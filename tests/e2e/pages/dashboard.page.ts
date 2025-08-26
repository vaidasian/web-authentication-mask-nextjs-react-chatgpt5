import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { dashboardSelectors } from "@/tests/e2e/selectors";

export class DashboardPage {
  public progressbar: Locator;
  private ball: Locator;
  public message: Locator;

  constructor(private page: Page) {
    this.progressbar = page.getByTestId(dashboardSelectors.progressbar);
    this.ball = page.getByTestId(dashboardSelectors.ball);
    this.message = page.getByTestId(dashboardSelectors.message);
  }

  async isProgressbarVisible(): Promise<boolean> {
    return await this.progressbar.isVisible();
  }

  async isBallVisible(): Promise<boolean> {
    return await this.ball.isVisible();
  }

  async isMessageVisible(): Promise<boolean> {
    return await this.message.isVisible();
  }

  async getMessageText(): Promise<string | null> {
    return await this.message.textContent();
  }

  async verifyElements(): Promise<void> {
    await expect(this.progressbar).toBeVisible();
    await expect(this.ball).toBeVisible();
  }

  async clickBall(count = 1): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.ball.click();
    }
  }
}
