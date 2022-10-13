import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { MainPage } from '../pageobjects/main.page'
import { ContactUsPage } from '../pageobjects/contact.us.page';
import { ReportAbusePage } from '../pageobjects/report.abuse.page';


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Test suite with support contact cases', () => {
    test('Go to "Contact us" page from the Main page and request support by filling\
 all fields with random valid data', async ({ page }) => {
        const mainPage = new MainPage(page)
        const contactUsPage = new ContactUsPage(page)
        
        await mainPage.clickHeadTalkToExpertBtn()

        const reasonOptions = contactUsPage.reasonOpt
        const randReason = reasonOptions[Math.floor(Math.random() * (reasonOptions.length - 1))]

        const randFirstName = faker.name.firstName()
        const randLastName = faker.name.lastName()
        const randEmail = faker.internet.email()

        const codeInSum = contactUsPage.codeInSum
        const randCodeCount = Math.floor(Math.random() * codeInSum) + 1
        const selectedCode = await contactUsPage.getNumberCode(randCodeCount)
        
        const randNum = faker.phone.number('###########')
        const randWebSite = faker.internet.url()
        const randText = faker.lorem.paragraph()

        await contactUsPage.fillAllFields(
            randReason,
            randFirstName,
            randLastName,
            randEmail,
            randCodeCount,
            randNum,
            randWebSite,
            randText
        )

        await expect(contactUsPage.reasonSelect).toHaveValue(randReason)
        await expect(contactUsPage.firstNameInp).toHaveValue(randFirstName)
        await expect(contactUsPage.lastNameInp).toHaveValue(randLastName)
        await expect(contactUsPage.emailInp).toHaveValue(randEmail)
        await expect(contactUsPage.codeSelect).toHaveValue(selectedCode)
        await expect(contactUsPage.numberInp).toHaveValue(randNum)
        await expect(contactUsPage.websiteInp).toHaveValue(randWebSite)
        await expect(contactUsPage.addInfoInp).toHaveValue(randText)
    });

    test('Send report abuse link from the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const reportAbusePage = new ReportAbusePage(page)

        await mainPage.clickFootReportAbuseLink()

        const randSubject = faker.word.adverb()
        const randAbusiveNum = faker.phone.number('+##-###-###-###')
        const randAbusedNum = faker.phone.number('+##-###-###-###')
        const randFullName = faker.name.fullName()
        const randEmail = faker.internet.email()
        const randAddInfo = faker.lorem.sentences(2)

        await reportAbusePage.fillAllFields (
            randSubject,
            randAbusiveNum,
            randAbusedNum,
            randFullName,
            randEmail,
            randAddInfo
        )

        await expect(reportAbusePage.subjectInp).toHaveValue(randSubject)
        await expect(reportAbusePage.phoneAbusiveInp).toHaveValue(randAbusiveNum)
        await expect(reportAbusePage.phoneAbusedInp).toHaveValue(randAbusedNum)
        await expect(reportAbusePage.abusedDateTimeCalendar).toBeVisible()
        await expect(reportAbusePage.voiceBox).toBeChecked()
        await expect(reportAbusePage.smsBox).toBeChecked()
        await expect(reportAbusePage.nameInp).toHaveValue(randFullName)
        await expect(reportAbusePage.emailInp).toHaveValue(randEmail)
        await expect(reportAbusePage.addInfoInp).toHaveValue(randAddInfo)
        await expect(reportAbusePage.submitBtn).toBeEnabled()
    })
})