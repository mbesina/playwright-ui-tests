import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase {
  readonly formLayoutMenuItem: Locator
  readonly datepickerMenuItem: Locator
  readonly smartTableMenuItem: Locator
  readonly toastrMenuItem: Locator
  readonly tooltipMenuItem: Locator

  constructor (page: Page) {
    super(page)
    this.formLayoutMenuItem = this.page.getByText("Form Layouts")
    this.datepickerMenuItem = this.page.getByText("Datepicker")
    this.smartTableMenuItem = this.page.getByText("Smart Table")
    this.toastrMenuItem = this.page.getByText("Toastr")
    this.tooltipMenuItem = this.page.getByText("Tooltip")
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms")
    await this.waitForNumberOfSeconds(2)
    await this.formLayoutMenuItem.click()
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms")
    await this.datepickerMenuItem.click()
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data")
    await this.smartTableMenuItem.click()
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays")
    await this.toastrMenuItem.click()
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays")
    await this.tooltipMenuItem.click()
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute("aria-expanded")

    if (expandedState == "false") {
      await groupMenuItem.click()
    }
  }
}
