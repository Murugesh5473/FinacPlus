import { Page } from "@playwright/test";

export default class CommonApiWaits {
  static waitForLoginApi = (page: Page) =>
    page.waitForResponse(
      (res) => res.url().endsWith("/Account/v1/Login") && res.status() === 200,
      {
        timeout: 120000,
      }
    );

  static waitForBooksApi = (page: Page) =>
    page.waitForResponse(
      (res) => res.url().endsWith("/Books") && res.status() === 200,
      {
        timeout: 120000,
      }
    );

  static waitForConfigApi = (page: Page) =>
    page.waitForResponse(
      (res) => res.url().includes("/getconfig/") && res.status() === 200,
      {
        timeout: 120000,
      }
    );
}
