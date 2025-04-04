import { test, Browser, Page, chromium } from "@playwright/test";
import Login from "../../framework/utilities/Login";
import Books from "../../framework/utilities/Books";
const demoQa = require("../../framework/configs/demoQa.json");
let page: Page;
let browser: Browser;
let books: Books;
const bookName = "Learning JavaScript Design Patterns";
let login: Login;

test.beforeAll("=>Loging in to the website.", async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  login = new Login(page);
  books = new Books(page);
  await login.visitPage(demoQa.baseUrl);
  await login.clickOnRequiredCard("Book Store Application");
  await login.loginUser(
    demoQa.loginCreds[1].username,
    demoQa.loginCreds[1].password
  );
});

test.describe("=> Validating the Books details.", () => {
  test("=> Verify and Loging the Book Details", async () => {
    await books.clickBookStoreBtn();
    await books.fillSearchBox(bookName);
    await books.assertBookName(bookName);
    await books.writeBookDetails(bookName);
  });
});

test.afterAll(async () => {
  await login.logOutUser();
});
