import { test, expect } from "@playwright/test";
import { RegisterPage } from "@/tests/e2e/pages";
import { TEST_USER } from "@/tests/e2e/utils/constants";

test.describe("Registration flow", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test("user performs invalid registration", async ({ page }) => {
    await registerPage.register(
      "test@@test.com",
      TEST_USER.username,
      TEST_USER.password,
      TEST_USER.password
    );

    await registerPage.message.waitFor({ state: "visible" });
    expect(await registerPage.isMessageVisible()).toBeTruthy();

    const messageText = await registerPage.getMessageText();
    expect(messageText).toMatch(/error|already exists/i);
  });
});
