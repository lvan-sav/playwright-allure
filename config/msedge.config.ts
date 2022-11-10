import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import config from './playwright.config'


const msedgeConfig: PlaywrightTestConfig = {
    ...config,
    projects: [
        {
            name: 'Microsoft Edge',
            use: {
              channel: 'msedge',
              viewport: { width: 1920, height: 1080 },
              video: 'on-first-retry',
            },
        },
    ]
}

export default msedgeConfig