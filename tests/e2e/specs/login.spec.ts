import { test, expect } from "@playwright/test";
import { LoginPage, DashboardPage } from "@/tests/e2e/pages";
import { TEST_USER } from "@/tests/e2e/utils/constants";

test.describe("Login flow", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
  });

  test("user performs valid login", async ({ page }) => {
    await loginPage.clickLogin();
    await loginPage.login(TEST_USER.username, TEST_USER.password);

    await dashboardPage.progressbar.waitFor({ state: "visible" });
    expect(await dashboardPage.isProgressbarVisible()).toBeTruthy();
  });
});
