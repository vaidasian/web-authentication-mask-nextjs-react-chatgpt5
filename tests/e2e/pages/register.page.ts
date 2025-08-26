import type { Page, Locator } from "@playwright/test";
import { registerSelectors } from "@/tests/e2e/selectors";

export class RegisterPage {
  private email: Locator;
  private username: Locator;
  private password: Locator;
  private confirm: Locator;
  private btnRegister: Locator;
  public message: Locator;

  constructor(private page: Page) {
    this.email = page.getByTestId(registerSelectors.email);
    this.username = page.getByTestId(registerSelectors.username);
    this.password = page.getByTestId(registerSelectors.password);
    this.confirm = page.getByTestId(registerSelectors.confirm);
    this.btnRegister = page.getByTestId(registerSelectors.register);
    this.message = page.getByTestId(registerSelectors.message);
  }

  async goto() {
    await this.page.goto("/auth/register");
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillUsername(username: string) {
    await this.username.fill(username);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async fillConfirm(confirm: string) {
    await this.confirm.fill(confirm);
  }

  async clickRegister() {
    await this.btnRegister.click();
  }

  async register(email: string, username: string, password: string, confirm: string) {
    await this.email.fill(email);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.confirm.fill(confirm);
    await this.btnRegister.click();
  }

  async isMessageVisible() {
    return await this.message.isVisible();
  }

  async getMessageText() {
    return await this.message.textContent();
  }
}
