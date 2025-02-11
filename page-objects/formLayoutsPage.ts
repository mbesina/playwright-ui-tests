import { Locator, Page } from "@playwright/test"

export class FormLayoutsPage {
  private readonly page: Page
  readonly usingTheGridForm: Locator
  readonly gridEmailInput: Locator
  readonly gridPasswordInput: Locator
  readonly gridRadioOption1: Locator
  readonly gridSignInButton: Locator
  readonly inlineForm: Locator
  readonly inlineNameInput: Locator
  readonly inlineEmailInput: Locator
  readonly inlineRememberMeCheckbox: Locator
  readonly inlineSubmitButton: Locator

  constructor (page: Page) {
    this.page = page
    this.usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    })
    this.gridEmailInput = this.usingTheGridForm.locator("#inputEmail1")
    this.gridPasswordInput = this.usingTheGridForm.locator("#inputPassword2")
    this.gridRadioOption1 = this.usingTheGridForm.getByRole("radio", {
      name: "Option 1",
    })
    this.gridSignInButton = this.usingTheGridForm.locator(
      '[data-testid="SignIn"]'
    )
    this.inlineForm = this.page.locator("nb-card", {
      hasText: "Inline Form",
    })
    this.inlineNameInput = this.inlineForm.getByRole("textbox", {
      name: "Jane Doe",
    })
    this.inlineEmailInput = this.inlineForm.getByRole("textbox", {
      name: "Email",
    })
    this.inlineRememberMeCheckbox = this.inlineForm.getByRole("checkbox")
    this.inlineSubmitButton = this.inlineForm.getByRole("button", {
      name: "Submit",
    })
  }

  async submitUsingThisGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string
  ) {
    await this.gridEmailInput.fill(email)
    await this.gridPasswordInput.fill(password)
    await this.gridRadioOption1.check({ force: true })
    await this.gridSignInButton.click()
  }

  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    await this.inlineNameInput.fill(name)
    await this.inlineEmailInput.fill(email)

    if (rememberMe) {
      await this.inlineRememberMeCheckbox.check({ force: true })
    }
    await this.inlineSubmitButton.click()
  }
}
