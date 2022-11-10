


import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import config from './playwright.config'


const webkitConfig: PlaywrightTestConfig = {
    ...config,
    projects: [
        {
            name: 'webkit',
            use: {
              ...devices['Desktop Safari'],
              viewport: { width: 1920, height: 1080 },
              video: 'on-first-retry',
            },
          },
    ]
}

export default webkitConfig