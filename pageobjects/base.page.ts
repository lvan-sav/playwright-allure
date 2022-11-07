import { Locator, Page } from '@playwright/test';


const cookiePopupClsBtn = 'button[aria-label="close and deny"]'

const talkToExpertsBtnLoc = 'header li [href="/contact-us"]'
const headLoginBtnLoc = 'header'
const headPricingDrpDownLoc = 'header li:nth-child(10)'
const headSipTrunkPriceBtnLoc = 'header [href="/pricing/elastic-sip"]'
const headMsgPriceBtnLoc = 'header [href="/pricing/messaging"]'

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

    async clickElasticSipPriceBtn () {
        const headSipTrunkPriceBtn: Locator = this.page.locator(headSipTrunkPriceBtnLoc)

        await headSipTrunkPriceBtn.click()
    }

    async clickSmsApiPriceBtn() {
        const headMsgPriceBtn: Locator = this.page.locator(headMsgPriceBtnLoc)

        await headMsgPriceBtn.hover()
        await headMsgPriceBtn.click()
    }

    async clickFootReportAbuseLink () {
        const footerReportAbuseLink: Locator = this.page.locator(footerReportAbuseLinkLoc)

        await footerReportAbuseLink.hover()
        await footerReportAbuseLink.click()
    }

    async hoverPricingDropdown () {
        const headPricingDrpDown: Locator = this.page.locator(headPricingDrpDownLoc);

        await headPricingDrpDown.hover()
    }
}