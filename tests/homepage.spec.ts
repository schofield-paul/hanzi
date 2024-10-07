import { test, expect } from "@playwright/test";

test("Homepage should load with correct title and clickable Get Started button", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  const mainTitle = page.locator("h1");
  await mainTitle.waitFor({ state: "visible" });

  await expect(mainTitle).toHaveText(
    "Learn Chinese. See progress.Achieve fluency."
  );

  const getStartedButton = page.locator("text=Get Started");
  await getStartedButton.waitFor({ state: "visible" });

  console.log("Get Started Button is visible");

  await getStartedButton.click();

  await page.evaluate(() => {
    window.location.href = "/input";
  });

  console.log("Current URL:", page.url());
});
