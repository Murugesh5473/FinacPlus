import { expect, type Page } from "@playwright/test";
import CommonApiWaits from "../apiWaits/CommonApiWaits";

export default class Login {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  /* === QUERY ON ELEMENT === */

  getUserName = () => this.page.locator("#userName");

  getPassword = () => this.page.locator("#password");

  getLoginBtn = () => this.page.locator("#login");

  getUserNameValue = () => this.page.locator("#userName-value");

  getLogOutBtn = () => this.page.locator('[class^="text-right col"] #submit');

  getCards = () => this.page.locator(".card-body");

  /* === ACTIONS ON ELEMENT === */

  visitPage = async (url: string) => {
    await this.page.goto(url);
    await CommonApiWaits.waitForConfigApi(this.page);
  };
  fillUserName = async (userName: string) =>
    await this.getUserName().fill(userName);

  fillPassword = async (password: string) =>
    await this.getPassword().fill(password);

  clickLoginBtn = async () => await this.getLoginBtn().click();

  clickLogOutBtn = async () => await this.getLogOutBtn().click();

  loginUser = async (userName: string, password: string) => {
    await this.clickLoginBtn();
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginBtn();
    await CommonApiWaits.waitForLoginApi(this.page);
    await this.assertUserNameValue(userName);
    await this.assertLogOutBtn();
  };

  logOutUser = async () => {
    await this.clickLogOutBtn();
    expect(this.page.url()).toContain("/login");
  };

  clickOnRequiredCard = async (cardName: string) => {
    const card = this.getCards().filter({ hasText: cardName });
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await CommonApiWaits.waitForBooksApi(this.page);
  };

  /* === ASSERTION ON ELEMENT === */

  assertUserNameValue = async (userName: string) =>
    expect(await this.getUserNameValue().textContent()).toBe(userName);

  assertLogOutBtn = async () => await expect(this.getLogOutBtn()).toBeVisible();
}
