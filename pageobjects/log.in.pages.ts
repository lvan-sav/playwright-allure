import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const emailInpLoc = '[aria-label="loginForm"] [name="email"]'
const passwordInpLoc = '[name="password"]'
const forgotPassLinkLoc = '[href="/#/login/password-reset"]'
const rememberEmailBoxLoc = 'label[class*="CheckboxField_"]'
const loginBtn = '[aria-label="loginForm"] button'

const accBlockErrorMsgLoc = 'div:has-text("Your account has been blocked. Please contact Telnyx support for information reg") >> nth=4'
const reqErrorMsgLoc = '[class*="TextField__ErrorMessage"]'

export class LoginPage extends BasePage {

    accBlockErrorMsg: Locator = this.page.locator(accBlockErrorMsgLoc)
    reqErrorMsg: Locator = this.page.locator(reqErrorMsgLoc)

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

export class ResetPasswordPage extends LoginPage {

}