import { Locator } from '@playwright/test'
import { BasePage } from "./base.page";


const downloadFormLoc = 'div#pricing_download_form'
const firstNameInpLoc = '[name="FirstName"]'
const lastNameInpLoc = '[name="LastName"]'
const emailInpLoc = '[name="Email"]'
const formReceiveBox = '#pricing_download_form rect'
const downloadPriceBtnLoc = '#pricing_download_form button'
const thankDownloadMsgLoc = '#pricing_download_form div>div:nth-child(4)'

class PricingBase extends BasePage {

    readonly downloadForm: Locator = this.page.locator(downloadFormLoc)
    readonly firstNameField: Locator = this.page.locator(firstNameInpLoc)
    readonly lastNameField: Locator = this.page.locator(lastNameInpLoc)
    readonly emailField: Locator = this.page.locator(emailInpLoc)
    readonly formReceiveBox: Locator = this.page.locator(formReceiveBox)
    readonly downloadPriceBtnLoc: Locator = this.page.locator(downloadPriceBtnLoc)
    readonly thankDownloadMsg: Locator = this.page.locator(thankDownloadMsgLoc)

    async scrollToDownloadForm() {
        await this.downloadForm.scrollIntoViewIfNeeded()
    }

    async fillDownloadForm (
        firstName?: string,
        lastName?: string,
        email?: string,
        receiveBoxCheck: Boolean = false
    ) {
        if (firstName) await this.firstNameField.fill(firstName)
        if (lastName) await this.lastNameField.fill(lastName)
        if (email) await this.emailField.fill(email)
        if (receiveBoxCheck) await this.formReceiveBox.click()
    }

    async clickDownloadBtn() {
        await this.downloadPriceBtnLoc.click({ delay: 200})
    }
}

export class SipTrunkingPricePage extends PricingBase {

}

export class MsgPricePage extends PricingBase {

}