import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../pageobjects/main.page'
import { SipTrunkingPricePage, MsgPricePage } from '../pageobjects/pricing.pages'


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Download and send pricing CSV file to the email from pricing pages', () => {
    test('Downolad SIP Trunking pricing CSV file from the Elastic SIP Trunking price page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const sipTrunkingPricePage = new SipTrunkingPricePage(page)

        await mainPage.hoverPricingDropdown()
        await mainPage.clickElasticSipPriceBtn()

        await sipTrunkingPricePage.scrollToDownloadForm()
        await sipTrunkingPricePage.fillDownloadForm(
            faker.name.firstName(),
            faker.name.lastName(),
            faker.internet.email()
        )
        await sipTrunkingPricePage.clickDownloadBtn()

        await expect(sipTrunkingPricePage.thankDownloadMsg).toBeVisible()
        await expect(sipTrunkingPricePage.thankDownloadMsg).toHaveText("Thank you. We'll email you pricing right away!")
    })
})