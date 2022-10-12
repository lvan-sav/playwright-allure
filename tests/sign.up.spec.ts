import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { MainPage } from '../pageobjects/main.page'
import { SignUpPage, VerifyEmailPage } from '../pageobjects/sign.up.pages';


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Sign up and "Contact Us" and "Report Abuse" cases', () => {
    test('Sign up after click "Try it for free" button on the main page by\
 filling in in required fields with random valid data', async ({ page }) => {
        const mainPage = new MainPage(page)
        const signUpPage = new SignUpPage(page)
        const verifyEmailPage = new VerifyEmailPage(page)

        const email = faker.internet.email()
    
        await mainPage.fillEmailInp(email)
        await mainPage.clickTryFreeBtn()

        const fullName = faker.name.fullName()
        const password = faker.internet.password(30, false, /[!-}]/, '!1So')

        await signUpPage.fillReqFieldExcludeEmail(
            fullName,
            password
        )

        await signUpPage.clickCreateAccBtn()

        await expect(verifyEmailPage.verifyEmail).toHaveText(email)
        await expect(verifyEmailPage.resentLink).toBeEnabled()
    });


})
