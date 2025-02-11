import { expect, Locator, Page } from "@playwright/test"

export class DatepickerPage {
  private readonly page: Page
  readonly formPicker: Locator
  readonly rangePicker: Locator
  readonly calendarViewMode: Locator
  readonly calendarRighNavigation: Locator
  readonly dateSelected: (expectedDate: string) => Locator

  constructor (page: Page) {
    this.page = page
    this.formPicker = this.page.getByPlaceholder("Form Picker")
    this.rangePicker = this.page.getByPlaceholder("Range Picker")
    this.calendarViewMode = this.page.locator("nb-calendar-view-mode")
    this.calendarRighNavigation = this.page.locator(
      'nb-calendar-pageable-navigation [data-name="chevron-right"]'
    )
    this.dateSelected = (expectedDate: string) =>
      this.page
        .locator(".day-cell.ng-star-inserted")
        .getByText(expectedDate, { exact: true })
  }

  async selectCommonDatePicketDateFromToday(numberOfDaysFromToday: number) {
    await this.formPicker.click()
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    )
    await expect(this.formPicker).toHaveValue(dateToAssert)
  }

  async selectDatePickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    await this.rangePicker.click()
    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    )
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
    await expect(this.rangePicker).toHaveValue(dateToAssert)
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString("En-US", {
      month: "short",
    })
    const expectedMonthLong = date.toLocaleString("En-US", {
      month: "long",
    })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    let calendarMonthAndYear = await this.calendarViewMode.textContent()
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.calendarRighNavigation.click()
      calendarMonthAndYear = await this.calendarViewMode.textContent()
    }

    await this.dateSelected(expectedDate).click()
    await this.page.waitForTimeout(1000)
    return dateToAssert
  }
}
