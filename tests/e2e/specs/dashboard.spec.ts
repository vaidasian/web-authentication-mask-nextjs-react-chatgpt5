import { test, expect } from "@playwright/test";
import { DashboardPage } from "@/tests/e2e/pages";

const count: number = 11;

test.describe("Dashboard verification", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyElements();
  });

  test(`user clicks ball ${count} times`, async ({ page }) => {
    await dashboardPage.clickBall(count);
    await expect(dashboardPage.message).toHaveText(/congratulations/i);
  });
});