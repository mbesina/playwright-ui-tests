import { test } from "../test-options"

test("Forms Layout Basic form", async ({ pageManager }) => {
  await pageManager
    .onFormLayoutsPage()
    .submitUsingThisGridFormWithCredentialsAndSelectOption(
      process.env.USER,
      process.env.PASSWORD
    )
})
