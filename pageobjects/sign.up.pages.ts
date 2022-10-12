import { ElementHandle, Locator } from '@playwright/test';
import { BasePage } from "./base.page";


//sign up page's locators
const emailInpLoc = '#email'
const nameInpLoc = '#full_name'
const passInpLoc = '#password'
const termsBoxLoc = '[aria-labelledby="terms-label"]'
const receiveBoxLoc = '[for="subscription_opt_in"]'
const createAccBtnLoc = 'button[type="submit"]'
//verify email page's locators
const verifyEmailLoc = '//h1/following-sibling::div//strong'
const resendLinkLoc = 'main button'

export class SignUpPage extends BasePage {
    async fillFields (
        email: string | undefined = '',
        fullName: string | undefined = '',
        password: string | undefined = '',
        termsBoxChecked: boolean = false,
        receiveBoxChecked: boolean = false
    ) {
        const emailInp: Locator = this.page.locator(emailInpLoc)
        await emailInp.type(email)

        const nameInp: Locator = this.page.locator(nameInpLoc)
        await nameInp.type(fullName)

        const passInp: Locator = this.page.locator(passInpLoc)
        await passInp.type(password)

        const termsBox: Locator = this.page.locator(termsBoxLoc)
        if (termsBoxChecked)
            await termsBox.click()

        const receiveBox: Locator = this.page.locator(receiveBoxLoc)
        if(receiveBoxChecked)
            await receiveBox.click()
    }

    async clickCreateAccBtn() {
        const createAccBtn: Locator = this.page.locator(createAccBtnLoc)
        await createAccBtn.click({ delay: 100, force: true})
    }

    async fillReqFieldExcludeEmail(
        fullName: string,
        password: string
    ) {
        return this.fillFields(
            undefined,
            fullName,
            password,
            true
        )
    }
}

export class VerifyEmailPage extends BasePage {
    verifyEmail: Locator =  this.page.locator(verifyEmailLoc)
    resentLink: Locator =  this.page.locator(resendLinkLoc)
    
}