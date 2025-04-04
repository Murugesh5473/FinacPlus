import { Browser, Page, chromium, test, expect } from "@playwright/test";
import CommonApiRequest from "../../framework/apiRequests/CommonApiRequest";

let page: Page;
let browser: Browser;
const userEmailId = "eve.holt@reqres.in";
const updatedName = "Murugesh";
const job = "Leader";

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe(() => {
  test("=> Validating Create, Get and Update Users.", async () => {
    const createdUserId = await CommonApiRequest.createUser(
      page,
      userEmailId,
      "pistol"
    );
    expect(typeof createdUserId).toBe("number");

    const getUserData = await CommonApiRequest.getUser(page, createdUserId);
    expect(getUserData.email).toBe(userEmailId);
    expect(getUserData.id).toBe(createdUserId);

    const updatedUserData = await CommonApiRequest.updateUser(
      page,
      createdUserId,
      updatedName,
      job
    );
    expect(updatedUserData.name).toBe(updatedName);
    expect(updatedUserData.job).toBe(job);
  });
});
