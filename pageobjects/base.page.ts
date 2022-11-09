import { Locator, Page } from '@playwright/test';


const cookiePopupClsBtn = 'button[aria-label="close and deny"]'

const talkToExpertsBtnLoc = 'header li [href="/contact-us"]'
const headLoginBtnLoc = 'header'
const headPricingDrpDownLoc = 'header li:nth-child(10)'
const headCompanyDrpDownLoc = 'header li:nth-child(8)'
const headResourcesDrpDownLoc = 'header li:nth-child(6)'

const headIntegrationsBtnLoc = 'header [href="/integrations"]'
const headPartnersBtnLoc = 'header [href="/company/partnerships"]'
const headSipTrunkPriceBtnLoc = 'header [href="/pricing/elastic-sip"]'
const headMsgPriceBtnLoc = 'header [href="/pricing/messaging"]'
const headBlogBtnLoc = 'header [href="/resources"]'
const headSavingCalcBtnLoc = 'header [href="/twilio-pricing-calculator"]'

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

    async clickIntegrationsBtn() {
        const headIntegrationsBtn: Locator = this.page.locator(headIntegrationsBtnLoc)

        await headIntegrationsBtn.hover()
        await headIntegrationsBtn.click()
    }

    async clickPartnersBtn() {
        const headPartnersBtn: Locator = this.page.locator(headPartnersBtnLoc)

        await headPartnersBtn.hover()
        await headPartnersBtn.click()
    }

    async clickBlogBtn() {
        const headBlogBtn: Locator = this.page.locator(headBlogBtnLoc)

        await headBlogBtn.hover()
        await headBlogBtn.click()
    }

    async clickSavingCalculatorBtn() {
        const headSavingCalcBtn: Locator = this.page.locator(headSavingCalcBtnLoc)

        await headSavingCalcBtn.click()
    }

    async clickFootReportAbuseLink () {
        const footerReportAbuseLink: Locator = this.page.locator(footerReportAbuseLinkLoc)

        await footerReportAbuseLink.hover()
        await footerReportAbuseLink.click()
    }

    async hoverResourcesDropdown () {
        const headResourcesDrpDown: Locator = this.page.locator(headResourcesDrpDownLoc)
        
        await headResourcesDrpDown.hover()
        await headResourcesDrpDown.click()
    }

    async hoverCompanyDropdown() {
        const headCompanyDrpDown: Locator = this.page.locator(headCompanyDrpDownLoc)

        await headCompanyDrpDown.hover()
    }

    async hoverPricingDropdown () {
        const headPricingDrpDown: Locator = this.page.locator(headPricingDrpDownLoc);

        await headPricingDrpDown.hover()
    }

    randomNumber(till: number) {
        return Math.ceil(Math.random() * till)
    }
}