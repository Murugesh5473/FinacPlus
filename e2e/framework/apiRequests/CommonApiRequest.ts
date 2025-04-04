import { Page, expect } from "@playwright/test";

const API_URL = "https://reqres.in/api";

export default class CommonApiRequest {
  static createUser = async (page: Page, email: string, password: string) => {
    let apiResponseData: any;
    await expect
      .poll(
        async () => {
          const apiResponse = await page.request.post(`${API_URL}/register`, {
            headers: {
              "content-type": "application/json",
            },
            data: { email: email, password: password },
          });
          apiResponseData = await apiResponse.json();
          return apiResponse.status();
        },
        { timeout: 45000 }
      )
      .toBe(200);
    return apiResponseData.id;
  };

  static getUser = async (page: Page, userId: number) => {
    let apiResponseData: any;
    await expect
      .poll(
        async () => {
          const apiResponse = await page.request.get(
            `${API_URL}/users/${userId}`,
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          apiResponseData = await apiResponse.json();
          return apiResponse.status();
        },
        { timeout: 45000 }
      )
      .toBe(200);
    return { id: apiResponseData.data.id, email: apiResponseData.data.email };
  };

  static updateUser = async (
    page: Page,
    userId: number,
    name: string,
    job: string
  ) => {
    let apiResponseData: any;
    await expect
      .poll(
        async () => {
          const apiResponse = await page.request.put(
            `${API_URL}/users/${userId}`,
            {
              headers: {
                "content-type": "application/json",
              },
              data: {
                name: name,
                job: job,
              },
            }
          );
          apiResponseData = await apiResponse.json();
          return apiResponse.status();
        },
        { timeout: 45000 }
      )
      .toBe(200);
    return { name: apiResponseData.name, job: apiResponseData.job };
  };
}
