import { test as base } from "@playwright/test"
import { TestOptions } from "@util/types"
import { PageManager } from "./page-objects/pageManager"

export const test = base.extend<TestOptions>({
  globalsQaURL: ["", { option: true }],

  formLayoutsPage: async ({ page }, use) => {
    console.log("test setup")
    const pm = new PageManager(page)
    await page.goto(process.env.URL)
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
    await use("")
    console.log("test teardown")
  },

  pageManager: [
    async ({ page, formLayoutsPage }, use) => {
      const pm = new PageManager(page)
      await use(pm)
    },
    { auto: true },
  ],
})
