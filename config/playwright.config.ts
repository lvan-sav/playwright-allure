import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';


const config: PlaywrightTestConfig = {
  testDir: '../tests',
  timeout: 4 * 60 * 1000,
  expect: {
    timeout: 4 * 60 * 1000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 3,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    baseURL: 'https://telnyx.com/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        video: 'on-first-retry',
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        video: 'on-first-retry',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        video: 'on-first-retry',
      },
    },
    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge',
        viewport: { width: 1920, height: 1080 },
        video: 'on-first-retry',
      },
    },
  ],
};

export default config;
