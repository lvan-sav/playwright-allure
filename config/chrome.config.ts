import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import config from './playwright.config'


const chromeConfig: PlaywrightTestConfig = {
    ...config,
    projects: [
        {
            name: 'chromium',
            use: {
              ...devices['Desktop Chrome'],
              viewport: { width: 1920, height: 1080 },
            },
        },
    ]
}

export default chromeConfig