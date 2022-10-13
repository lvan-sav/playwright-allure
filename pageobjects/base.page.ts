import { Locator, Page } from '@playwright/test';


const cookiePopupClsBtn = 'button[aria-label="close and deny"]'
const talkToExpertsBtnLoc = 'li [href="/contact-us"]'

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('/')
    }

    async closeCookiePopup() {
        const closeBtn: Locator = this.page.locator(cookiePopupClsBtn)

        await closeBtn.hover()
        await closeBtn.click({ force: true })
    }

    async clickHeadTalkToExpertBtn () {
        const talkToExpertsBtn: Locator = this.page.locator(talkToExpertsBtnLoc)

        await talkToExpertsBtn.hover()
        await talkToExpertsBtn.click()
    }
}