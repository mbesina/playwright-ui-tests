import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("Form Layout Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
  })

  test("entering input @sanity", async ({ page }) => {
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

  test("Selecting Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    })

    await usingTheGridForm.getByLabel("Option 2").check({ force: true })
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked()

    await expect(usingTheGridForm).toHaveScreenshot({ maxDiffPixels: 250 })

    // expect(usingTheGridForm.getByRole("radio", { name: "Option 1" })).toBeChecked

    // await usingTheGridForm
    //   .getByRole("radio", { name: "Option 2" })
    //   .check({ force: true })

    // const radioStatus = await usingTheGridForm
    //   .getByRole("radio", { name: "Option 2" })
    //   .isChecked()

    // expect(radioStatus).toBeTruthy
  })
})

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click()
  await page.getByText("Toastr").click()

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true })

  const checkboxes = page.getByRole("checkbox")
  for (const box of await checkboxes.all()) {
    await box.check({ force: true })
    expect(await box.isChecked()).toBeTruthy

    await box.uncheck({ force: true })
    expect(await box.isChecked()).toBeFalsy
  }
})

test("lists and dropdowns", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select")

  await dropdownMenu.click()

  const optionList = page.locator("nb-option-list nb-option")

  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

  await optionList.filter({ hasText: "Cosmic" }).click()

  const layoutHeader = page.locator("nb-layout-header")

  await expect(layoutHeader).toHaveCSS("background-color", "rgb(50, 50, 89)")

  const cosmicColors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  }

  for (const color in cosmicColors) {
    await dropdownMenu.click()
    await optionList.filter({ hasText: color }).click()
    await expect(layoutHeader).toHaveCSS(
      "background-color",
      cosmicColors[color],
    )
  }
})

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click()
  await page.getByText("Tooltip").click()

  await page
    .locator("nb-card-body")
    .getByRole("button", { name: "Top" })
    .hover()

  const tooltip = await page.locator("nb-tooltip").textContent()

  expect(tooltip).toEqual("This is a tooltip")
})

test("Tables & Data", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?")
    dialog.accept()
  })

  await page
    .getByRole("table")
    .locator("tr", { hasText: "@mdo" })
    .locator(".nb-trash")
    .click()

  await expect(page.locator("table tr").first()).not.toHaveText("@mdo")
})

test("Tables - modify row by email", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" })

  await targetRow.locator(".nb-edit").click()

  const inputEditable = page.locator("input-editor").getByPlaceholder("Age")
  await inputEditable.clear()
  expect(await inputEditable.isEditable()).toBeTruthy

  await inputEditable.fill("20")
  await page.locator(".nb-checkmark").click()
  await expect(targetRow).toContainText("20")
})

test("Tables - modify row by id", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" })

  await page.locator(".ng2-smart-pagination-nav", { hasText: "2" }).click()
  const targetRowByID = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") })

  await targetRowByID.locator(".nb-edit").click()

  const inputEditable = page.locator("input-editor").getByPlaceholder("E-mail")
  await inputEditable.clear()
  expect(await inputEditable.isEditable()).toBeTruthy

  await inputEditable.fill("test@tset.com")
  await page.locator(".nb-checkmark").click()
  await expect(targetRowByID.locator("td").nth(5)).toHaveText("test@tset.com")
})

test("Tables - searching on tables", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  const ages = ["20", "30", "40", "200"]

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear()
    await page.locator("input-filter").getByPlaceholder("Age").fill(age)

    await page.waitForTimeout(500)
    const ageRows = page.locator("tbody tr")

    for (let row of await ageRows.all()) {
      const ageContent = await row.locator("td").last().textContent()

      if (age === "200") {
        expect(ageContent).toEqual(" No data found ")
      } else {
        expect(ageContent).toEqual(age)
      }
    }
  }
})

test("Datepicker test", async ({ page }) => {
  await page.getByText("Forms").click()
  await page.getByText("Datepicker").click()

  const formPicker = page.getByPlaceholder("Form Picker")
  await formPicker.click()

  let date = new Date()
  date.setDate(date.getDate() + 2)
  const expectedDate = date.getDate().toString()
  const expectedMonthShot = date.toLocaleString("En-US", { month: "short" })
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

  console.log(expectedDate)
  console.log(dateToAssert)

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click()

  // await expect(formPicker).toHaveValue("Feb 1, 2025");
})

test("slider", async ({ page }) => {
  const temp = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger cirle',
  )

  await temp.evaluate((node) => {
    node.setAttribute("cx", "239.21986519082543")
    node.setAttribute("cy", "239.21986519082543")
  })

  await temp.click()
})
