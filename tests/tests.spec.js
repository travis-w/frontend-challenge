// @ts-check
const { test, expect } = require("@playwright/test");

test("start at sign up page", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  const pageTitle = await page.innerText("h1");

  expect(pageTitle).toBe("Sign Up");
});

test("should not allow navigation to /more-info before sign up complete", async ({
  page,
}) => {
  await page.goto("/more-info");

  // Wait for redirect to start
  await page.getByText("Sign Up").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
});

test("should not allow navigation to /confirmation before needed", async ({
  page,
}) => {
  await page.goto("/confirmation");

  // Wait for redirect to start
  await page.getByText("Sign Up").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
});

test("should not allow navigation to /success before needed", async ({
  page,
}) => {
  await page.goto("/success");

  // Wait for redirect to start
  await page.getByText("Sign Up").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
});

test("should not allow navigation to /error before needed", async ({
  page,
}) => {
  await page.goto("/error");

  // Wait for redirect to start
  await page.getByText("Sign Up").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
});

test("should show errors on sign-up page", async ({ page }) => {
  await page.goto("/");

  await page.click('button:has-text("Next")');

  const numErrors = await page.locator("[aria-invalid=true]").count();

  expect(numErrors).toBe(3);
});

test("should show errors on additional info page", async ({ page }) => {
  // Mock API
  await page.route("**/api/colors", async (route) => {
    await route.fulfill({ json: ["red", "blue", "black"] });
  });

  await page.goto("/");

  await page.type("#name", "Name");
  await page.type("#email", "test@test.com");
  await page.type("#password", "password");

  await page.click('button:has-text("Next")');

  // Wait for page change
  await page.getByText("Additional Info").waitFor();

  await page.click('button:has-text("Next")');

  // Has Color Error
  await page.locator("text=Favorite color is required").isVisible();

  // Has terms error
  await page
    .locator("text=You must agree to the terms and conditions")
    .isVisible();
});

test("should allow going through form successfully", async ({ page }) => {
  // Mock API
  await page.route("**/api/colors", async (route) => {
    await route.fulfill({ json: ["red", "blue", "black"] });
  });

  await page.route("**/api/submit", async (route) => {
    await route.fulfill({ status: 200 });
  });

  await page.goto("/");

  await page.type("#name", "Name");
  await page.type("#email", "test@test.com");
  await page.type("#password", "password");

  await page.click('button:has-text("Next")');

  // Wait for page change
  await page.getByText("Additional Info").waitFor();

  await page.click("text=I agree to the terms and conditions");
  await page.click("#mui-component-select-color");
  await page.click("[data-value=red]");

  await page.click('button:has-text("Next")');

  // Wait for page change to confirmation
  await page.getByText("Confirmation").waitFor();

  await page.click('button:has-text("Submit")');

  // Should go to success page
  await page.getByText("Success").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/success");
});

test("should go to error page if call fails", async ({ page }) => {
  // Mock API
  await page.route("**/api/colors", async (route) => {
    await route.fulfill({ json: ["red", "blue", "black"] });
  });

  await page.route("**/api/submit", async (route) => {
    await route.fulfill({ status: 400 });
  });

  await page.goto("/");

  await page.type("#name", "Name");
  await page.type("#email", "test@test.com");
  await page.type("#password", "password");

  await page.click('button:has-text("Next")');

  // Wait for page change
  await page.getByText("Additional Info").waitFor();

  await page.click("text=I agree to the terms and conditions");
  await page.click("#mui-component-select-color");
  await page.click("[data-value=red]");

  await page.click('button:has-text("Next")');

  // Wait for page change to confirmation
  await page.getByText("Confirmation").waitFor();

  await page.click('button:has-text("Submit")');

  // Should go to error page
  await page.getByText("Error").waitFor();
  const url = new URL(page.url());
  expect(url.pathname).toBe("/error");
});
