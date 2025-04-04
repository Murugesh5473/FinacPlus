import { Page, expect } from "@playwright/test";
import * as fs from "fs/promises";

export default class Login {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /* === QUERY ON ELEMENT === */

  getExistingContainer = () => this.page.locator('[class$="collapse show"]');

  getBoxSearchDetailRow = () => this.page.getByRole("rowgroup");

  getBookStoreBtn = () => this.getExistingContainer().locator('[id*="item"]');

  getSearchBox = () => this.page.locator("#searchBox");

  getBookDetails = (bookName: string) =>
    this.page.locator(`[id="see-book-${bookName}"]`);

  /* === ACTIONS ON ELEMENT === */

  clickBookStoreBtn = async () =>
    await this.getBookStoreBtn()
      .filter({ hasText: /^Book Store$/ })
      .click();

  fillSearchBox = async (inputText: string) =>
    await this.getSearchBox().fill(inputText);

  returnBookDetails = async (bookName: string) => {
    const gridcell = this.getBoxSearchDetailRow()
      .locator("..")
      .locator("..")
      .locator("..")
      .locator("..")
      .locator('[role="gridcell"]');
    const author = await gridcell.nth(2).textContent();
    const name = await this.getBookDetails(bookName).textContent();
    const publisher = await gridcell.nth(3).textContent();
    return {
      bookName: name,
      author: author,
      publisher: publisher,
    };
  };

  writeBookDetails = async (bookName: string) => {
    try {
      const returnValue = await this.returnBookDetails(bookName);
      await fs.writeFile(
        "bookDetails.json",
        JSON.stringify(returnValue, null, 2),
        "utf-8"
      );
      return returnValue;
    } catch (error) {
      console.error("Failed to write book details:", error);
      throw error;
    }
  };

  /* === ASSERTION ON ELEMENT === */

  assertBookName = async (bookName: string) =>
    await expect(this.getBookDetails(bookName)).toBeVisible();
}
