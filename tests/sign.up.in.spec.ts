import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import helper from '../helper/helper';
import { MainPage } from '../pageobjects/main.page';
import { SignUpPage, VerifyEmailPage } from '../pageobjects/sign.up.pages';
import { LoginPage, ResetPasswordPage } from '../pageobjects/log.in.pages';

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Sign up, "Contact Us" and "Report Abuse" cases', () => {
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

    test('Sign up after click "Try it for free" button on the main page by filling\
 in in requireds fields with already registered email', async ({ page }) => {
        const mainPage = new MainPage(page)
        const signUpPage = new SignUpPage(page)

        const email = 'vansav.ka@gmail.com'

        await mainPage.fillEmailInp(email)
        await mainPage.clickTryFreeBtn()

        const fullName = faker.name.fullName()
        const password = faker.internet.password(30, false, /[!-}]/, '!1So')

        await signUpPage.fillReqFieldExcludeEmail(
            fullName,
            password
        )

        await signUpPage.clickCreateAccBtn()
        await signUpPage.clickCreateAccBtn()

        await expect(signUpPage.emailErrorMsg).toBeVisible()
        await expect(signUpPage.emailErrorMsg).toHaveText(/^Another account already exists/)
        await expect(signUpPage.formErrorMsg).toBeVisible()
        await expect(signUpPage.formErrorMsg).toHaveText(/^One or more fields are not valid. Please update these fields and try again/)        
    });

    test.only('Login in the Telnyx website with blocked account with valid data on the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page)
        
        const usersCreds = helper.getUsersCreds()
        const blockedEmail = usersCreds.blockedCreditans.email
        const blockedPassword = usersCreds.blockedCreditans.password

        await mainPage.clickHeadLoginBtn()
        
        await loginPage.fillRequiredFields(
            blockedEmail,
            blockedPassword
        )

        await loginPage.clickLoginBtn()

        await expect(loginPage.accBlockErrorMsg).toBeVisible()

        await page.pause()       
    })
})
