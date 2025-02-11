import { expect, test } from "@playwright/test"

test.describe("second test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
  })

  test("forms test", async ({ page }) => {
    page.locator(':text:("Using the Grid")')
    await page.locator("#inputEmail1").click()
  })

  test("first test", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).first().click()
    await page.getByLabel("Email").first().click()
    await page.getByPlaceholder("Jane Doe").click()
    await page.getByTestId("SignIn").click()
  })

  test("locating parent elements", async ({ page }) => {
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })
      .click()

    await page
      .locator("nb-card", { has: page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "Email" })
      .click()
  })

  test("get text of an element", async ({ page }) => {
    const basicForm = page.locator("nb-card", { hasText: "Basic Form" })
    const buttonText = await basicForm.locator("button").textContent()

    expect(buttonText).toEqual("Submit")
  })

  test("get all text of radio buttons", async ({ page }) => {
    const radioTexts = await page.locator("nb-radio").allTextContents()
    expect(radioTexts).toContain("Option 1")
  })

  test("get input value", async ({ page }) => {
    const basicForm = page.locator("nb-card", { hasText: "Basic Form" })
    const emailInput = basicForm.locator('input[type="email"]')

    await emailInput.fill("test@test.com")
    const emailInputValue = await emailInput.inputValue()

    expect(emailInputValue).toEqual("test@test.com")
  })

  test("assertion tests", async ({ page }) => {
    const basicForm = page.locator("nb-card", { hasText: "Basic Form" })
    const basicFormButton = basicForm.locator("button")
    const submitButton = await basicForm.locator("button").textContent()

    await expect(basicFormButton).toHaveText("Submit")

    expect(submitButton).toEqual("Submit")
    await basicFormButton.click()
  })
})
