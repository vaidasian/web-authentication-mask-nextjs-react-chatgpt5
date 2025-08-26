import type { Page, Locator } from "@playwright/test";
import { loginSelectors } from "@/tests/e2e/selectors";

export class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private btnLogin: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.getByTestId(loginSelectors.username);
    this.passwordInput = page.getByTestId(loginSelectors.password);
    this.btnLogin = page.getByTestId(loginSelectors.login);
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.btnLogin.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
