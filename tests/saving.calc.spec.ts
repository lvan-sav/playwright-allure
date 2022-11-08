import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { MainPage } from '../pageobjects/main.page'
import { CalcPage } from '../pageobjects/saving.calc.page'


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Using the saving calculator on the Saving Calculator page', () => {
    test('Use saving calculator for the "Messaging API" service', async ({ page }) => {
        const mainPage = new MainPage(page)
        const calcPage = new CalcPage(page)

        await mainPage.hoverResourcesDropdown()
        await mainPage.clickSavingCalculatorBtn()

        await calcPage.clickMsgApiBox()
        await calcPage.clickContinueBtn()
        await calcPage.setLocalNumbers(calcPage.randomNumber(100000))
        await calcPage.setTollNumbers(calcPage.randomNumber(100000))

        await calcPage.clickContinueBtn()

        await calcPage.setSendSms(calcPage.randomNumber(10000000))
        await calcPage.setReceiveSms(calcPage.randomNumber(10000000))
        await calcPage.setSendMms(calcPage.randomNumber(10000000))
        await calcPage.setReceiveMms(calcPage.randomNumber(10000000))
    
        await expect(calcPage.priceBlock).toBeVisible()
        await expect(calcPage.calcSignUpBtn).toBeEnabled()
    })

    test('Use saving calculator for "Elastic SIP Trunking" service', async ({ page }) => {
        const mainPage = new MainPage(page)
        const calcPage = new CalcPage(page)

        await mainPage.hoverResourcesDropdown()
        await mainPage.clickSavingCalculatorBtn()

        await calcPage.clickSipTrunkBox()
        await calcPage.clickContinueBtn()
        await calcPage.setLocalNumbers(calcPage.randomNumber(100000))
        await calcPage.setTollNumbers(calcPage.randomNumber(100000))

        await calcPage.clickContinueBtn()

        await calcPage.setInboundLocalNum(calcPage.randomNumber(1000000))
        await calcPage.setInboundTollNum(calcPage.randomNumber(1000000))
        await calcPage.setOutbondNum(calcPage.randomNumber(1000000))
    })

    test('Use saving calculator for "Voice API" service', async ({ page }) => {
        const mainPage = new MainPage(page)
        const calcPage = new CalcPage(page)

        await mainPage.hoverResourcesDropdown()
        await mainPage.clickSavingCalculatorBtn()

        await calcPage.clickVoiceApiBox()
        await calcPage.clickContinueBtn()
        await calcPage.setLocalNumbers(calcPage.randomNumber(100000))
        await calcPage.setTollNumbers(calcPage.randomNumber(100000))

        await calcPage.clickContinueBtn()

        await calcPage.setInboundCallControl(calcPage.randomNumber(1000000))
        await calcPage.setOutboundCallControl(calcPage.randomNumber(1000000))
    })
})