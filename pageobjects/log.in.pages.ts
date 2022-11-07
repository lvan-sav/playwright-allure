import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const emailInpLoc = '[aria-label="loginForm"] [name="email"]'
const passwordInpLoc = '[name="password"]'
const forgotPassLinkLoc = '[href="/#/login/password-reset"]'
const rememberEmailBoxLoc = 'label[class*="CheckboxField_"]'
const loginBtn = '[aria-label="loginForm"] button'

const accBlockErrorMsgLoc = 'div:has-text("Your account has been blocked. Please contact Telnyx support for information reg") >> nth=4'
const reqErrorMsgLoc = '[class*="TextField__ErrorMessage"]'

const forgotEmailInpLoc = '[class*="PasswordResetForm"] [name="email"]'
const resetPassBtnLoc = 'button[type="submit"]'

export class LoginPage extends BasePage {

    readonly emailField: Locator = this.page.locator(emailInpLoc)
    readonly passwordField: Locator = this.page.locator(passwordInpLoc)
    readonly accBlockErrorMsg: Locator = this.page.locator(accBlockErrorMsgLoc)
    readonly reqErrorMsg: Locator = this.page.locator(reqErrorMsgLoc)

    async fillFields(
        email?: string,
        password?: string,
        rememberEmail: boolean = false
    ) {
        if (email) await this.page.locator(emailInpLoc).fill(email)
        if (password) await this.page.locator(passwordInpLoc).fill(password)
        if (rememberEmail) await this.page.locator(rememberEmailBoxLoc).click()
    }

    async fillRequiredFields(
        email: string,
        password: string
    ) {
        return await this.fillFields(
            email,
            password
        )
    }

    async fillPasswordField(password: string){
        return await this.fillFields(
            undefined,
            password
        )
    }

    async fillEmailField(email: string) {
        return await this.fillFields(
            email
        )
    }

    async clickForgotPasswordLink() {
        await this.page.locator(forgotPassLinkLoc).click()
    }

    async clickRememberEmailBox() {
        await this.page.locator(rememberEmailBoxLoc).click()
    }

    async clickLoginBtn() {
        await this.page.locator(loginBtn).click()
    }
}

export class ResetPasswordPage extends BasePage {

    emailInp: Locator = this.page.locator(forgotEmailInpLoc)

    async fillEmailField(email: string) {
        await this.emailInp.fill(email)
    }

    async clickResetPassBtn() {
        await this.page.locator(resetPassBtnLoc).click()
    }
}