import { defineConfig, devices } from "@playwright/test"
import type { TestOptions } from "@util/types"
import * as dotenv from "dotenv"
import * as path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") })
const port = 4200

export default defineConfig<TestOptions>({
  timeout: 40000,
  expect: {
    timeout: 4000,
    toMatchSnapshot: { maxDiffPixels: 50 },
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["json", { outputFile: "test-results/report.json" }],
    ["junit", { outputFile: "test-results/report.xml" }],
    ["html"],
  ],

  use: {
    baseURL: "http://localhost:4200/",
    // baseURL:
    //   process.env.DEV === "1"
    //     ? "http://localhost:4200/"
    //     : process.env.STAGING === "1"
    //     ? "http://localhost:4201/"
    //     : "http://localhost:4200/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    navigationTimeout: 6 * 10000,
  },

  projects: [
    {
      name: "staging",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: { browserName: "firefox", video: "on" },
    },
    {
      name: "pageObjectFullscreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        video: {
          mode: "on",
          size: { width: 1920, height: 1080 },
        },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["iPhone SE"],
        // viewport: { width: 320, height: 360 },
        // deviceScaleFactor: 2,  
      },
    },
  ],
  webServer: {
    timeout: 120000,
    command: "npm run start",
    port: port,
    reuseExistingServer: !process.env.CI,
  },
})
