import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import config from './playwright.config'


const firefoxConfig: PlaywrightTestConfig = {
    ...config,
    projects: [
        {
            name: 'firefox',
            use: {
              ...devices['Desktop Firefox'],
              viewport: { width: 1920, height: 1080 },
              video: 'on-first-retry',
            },
        }
    ]
}

export default firefoxConfig