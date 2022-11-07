import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { MainPage } from '../pageobjects/main.page'
import { CompanyIntegrationsPage, CompanyPartnersPage, } from '../pageobjects/company.pages'


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Become to a cooperation with Telnyx team', () => {
    test('Go to the Integrations page from main page and become a\
 Beta Tester by filling in the all fields with random valid data', async ({ page }) => {
        const mainPage = new MainPage(page)
        const companyIntegrationPage = new CompanyIntegrationsPage(page)

        await mainPage.hoverCompanyDropdown()
        await mainPage.clickIntegrationsBtn()

        await companyIntegrationPage.scrollToTesterForm()

        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        
        const caseInSum = companyIntegrationPage.useCaseOptCount
        const randCodeCount = Math.floor(Math.random() * caseInSum) + 1
        const selectedCode = await companyIntegrationPage.getCaseOpt(randCodeCount)

        const addInfo = faker.lorem.lines(1)

        await companyIntegrationPage.fillForm(
            firstName,
            lastName,
            email,
            randCodeCount,
            addInfo,
            true
        )

        await expect(companyIntegrationPage.firstNameInp).toHaveValue(firstName)
        await expect(companyIntegrationPage.lastNameInp).toHaveValue(lastName)
        await expect(companyIntegrationPage.emailInp).toHaveValue(email)
        await expect(companyIntegrationPage.useCaseSelector).toHaveValue(selectedCode)
        await expect(companyIntegrationPage.addInfoInp).toHaveValue(addInfo)
        await expect(companyIntegrationPage.receiveEmailBox).toBeChecked()
        await expect(companyIntegrationPage.submitBtn).toBeEnabled()
    })

    test('Go to the Partners page and become a Telnyx Partner by filling\
 in the all fields with random valid data', async ({ page }) => {
        const mainPage = new MainPage(page)
        const companyPartnersPage = new CompanyPartnersPage(page)

        await mainPage.hoverCompanyDropdown()
        await mainPage.clickPartnersBtn()

        await companyPartnersPage.scrollToPartnerForm()

        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        
        const caseInSum = companyPartnersPage.useCaseOptCount
        const randCodeCount = Math.floor(Math.random() * caseInSum) + 1
        const selectedCode = await companyPartnersPage.getCaseOpt(randCodeCount)

        const addInfo = faker.lorem.lines(1)

        await companyPartnersPage.fillForm(
            firstName,
            lastName,
            email,
            randCodeCount,
            addInfo,
            true
        )

        await expect(companyPartnersPage.firstNameInp).toHaveValue(firstName)
        await expect(companyPartnersPage.lastNameInp).toHaveValue(lastName)
        await expect(companyPartnersPage.emailInp).toHaveValue(email)
        await expect(companyPartnersPage.useCaseSelector).toHaveValue(selectedCode)
        await expect(companyPartnersPage.addInfoInp).toHaveValue(addInfo)
        await expect(companyPartnersPage.receiveEmailBox).toBeChecked()
        await expect(companyPartnersPage.submitBtn).toBeEnabled()
    })
})