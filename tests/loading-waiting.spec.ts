import { expect } from "@playwright/test"
import { test } from "../test-options"

test.describe("main scenario", () => {
  test("first loading test", async ({ page, globalsQaURL }) => {
    await page.goto(globalsQaURL)

    const btn = page.locator("#submit")
    // wait for element to be attached
    await btn.waitFor({ state: "attached" })
    const text = await btn.allTextContents()
    expect(text).toContain("test content here")
    expect(btn).toHaveText
    // wait for element to be present in the page
    await page.waitForSelector("#submit")

    // using API response before proceeding
    await page.waitForResponse("https://www.sample.com/ajaxdata")
  })
})
