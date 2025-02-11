import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { faker } from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL)
})

test("Forms Layout Basic form", async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage()
  await pm
    .onFormLayoutsPage()
    .submitUsingThisGridFormWithCredentialsAndSelectOption(
      process.env.USER,
      process.env.PASSWORD,
    )
})

test("Forms Layout Inline form @smoke @sanity", async ({ page }) => {
  const pm = new PageManager(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000,
  )}@test.com`
  await page.screenshot({ path: "screenshots/formsLayoutPage.png" })

  await pm.navigateTo().formLayoutsPage()
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false,
    )
})

test("datepicket test", async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().datepickerPage()
  await pm.onDatepickerPage().selectCommonDatePicketDateFromToday(2)
  await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 10)
})
