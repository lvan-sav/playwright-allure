import { Locator, Page } from '@playwright/test';


const cookiePopupClsBtn = 'button[aria-label="close and deny"]'

const talkToExpertsBtnLoc = 'header li [href="/contact-us"]'
const headLoginBtnLoc = 'header'

const footerReportAbuseLinkLoc = 'footer [href="/report-abuse"]'

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

    async clickHeadLoginBtn () {
        const headLoginBtn: Locator = this.page.locator(headLoginBtnLoc).getByRole('link', { name: "Log in", includeHidden: false })

        await headLoginBtn.hover()
        await headLoginBtn.click({ delay: 200 })
    }

    async clickFootReportAbuseLink () {
        const footerReportAbuseLink: Locator = this.page.locator(footerReportAbuseLinkLoc)

        await footerReportAbuseLink.hover()
        await footerReportAbuseLink.click()
    }
}