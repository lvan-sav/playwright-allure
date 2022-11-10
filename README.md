# Playwright framework with Allure Reporter integration

For start you need to follow next steps:

1. Download or fork this repo
2. Run `npm install`
3. Run `npm run pw:install`
4. Run `npm run test`

### Awailable scripts

Default command for testing:

    npm run pw:test

For run on special browsers:

    npm run pw:chrome
    npm run pw:firefox
    npm run pw:msedge
    npm run pw:webkit

For run in headed mode:

    npm run w:test:headed

For observe the Allure reporter, you need to use commands below:

    npm run allure:generate
    npm run allure:open