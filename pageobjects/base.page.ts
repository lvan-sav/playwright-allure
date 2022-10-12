import { Locator, Page } from '@playwright/test';


const cookiePopupClsBtn = 'button[aria-label="close and deny"]'

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('/')
    }

    async closeCookiePopup() {
        const closeBtn: Locator = await this.page.locator(cookiePopupClsBtn)

        await closeBtn.hover()
        await closeBtn.click({ force: true })
    }
}