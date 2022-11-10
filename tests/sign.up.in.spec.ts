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

test.describe('Sign up, sign in and forgot password cases', () => {
    test.only('Sign up after click "Try it for free" button on the main page by\
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

        await expect(signUpPage.formErrorMsg).toBeVisible()
        await expect(signUpPage.formErrorMsg).toHaveText(/your browser could not be authenticated via recaptcha/)
    });

    test('Sign up after click "Try it for free" button on the main page by filling\
 in in requireds fields with already registered email', async ({ page }) => {
        const mainPage = new MainPage(page)
        const signUpPage = new SignUpPage(page)

        const usersCreds = helper.getUsersCreds()
        const email = usersCreds.blockedCreditans.email

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

    test('Login in the Telnyx website with blocked account with valid data on the Main page', async ({ page }) => {
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
    })

    test('Login in the Telnyx website without email with valid data on the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page)

        const usersCreds = helper.getUsersCreds()
        const password = usersCreds.blockedCreditans.password

        await mainPage.clickHeadLoginBtn()
        
        await loginPage.fillPasswordField(
            password
        )
        
        await loginPage.clickLoginBtn()

        await expect(loginPage.reqErrorMsg).toBeVisible()
    })

    test('Login in the Telnyx website without password with valid data on the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page)

        const usersCreds = helper.getUsersCreds()
        const email = usersCreds.blockedCreditans.email

        await mainPage.clickHeadLoginBtn()
        
        await loginPage.fillEmailField(
            email
        )
        
        await loginPage.clickLoginBtn()

        await expect(loginPage.reqErrorMsg).toBeVisible()
    })

    test('Reset password by the "Forgot your password" link on the Log in page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page)
        const resetPassPage = new ResetPasswordPage(page)

        const usersCreds = helper.getUsersCreds()
        const email = usersCreds.blockedCreditans.email

        await mainPage.clickHeadLoginBtn()

        await loginPage.clickForgotPasswordLink()

        await resetPassPage.fillEmailField(email)
        await resetPassPage.clickResetPassBtn()

        await expect(loginPage.emailField).toBeEmpty()
        await expect(loginPage.passwordField).toBeEmpty()
    })
})
