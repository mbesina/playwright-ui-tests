import { test, expect } from "@playwright/test"
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("/")
  if (testInfo.project.name == "mobile") {
    await page.locator(".sidebar-toggle").click()
  }

  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
})
test("mobile input fields", async ({ page }) => {
  const emailInputBox = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })

  await emailInputBox.fill("test@test.com")
  await emailInputBox.clear()
  await emailInputBox.pressSequentially("test2@test.com")
  const emailValue = await emailInputBox.inputValue()

  expect(emailValue).toEqual("test2@test.com")

  await expect(emailInputBox).toHaveValue("test2@test.com")
})
