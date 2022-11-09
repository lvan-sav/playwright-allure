import { BasePage } from "./base.page";


const emailInpLoc = 'input[type="email"]'
const tryFreeBtnLoc = 'button[type="submit"]'
const learnMoreDocsApiLinkLoc = 'main [href*="developers"]'

export class MainPage extends BasePage {
    async fillEmailInp(email: string) {
        const emailInp = this.page.locator(emailInpLoc)
        await emailInp.fill(email)
    }

    async clickTryFreeBtn() {
        const tryFreeBtn = this.page.locator(tryFreeBtnLoc)
        await tryFreeBtn.click()
    }

    async clickLearnMoreLink() {
        const learnMoreLink = this.page.locator(learnMoreDocsApiLinkLoc)
        await learnMoreLink.click()
    }
}