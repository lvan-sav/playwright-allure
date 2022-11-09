import { BasePage } from "./base.page"


const becomeTesterFormLoc = '#become-a-beta-tester'
const firstNameInpLoc = '#FirstName'
const lastNameInpLoc = '#LastName'
const emailInpLoc = '#Email'
const useCaseSelectorLoc = '#Use_Case_Form__c'
const addInfoInpLoc = '#Form_Additional_Information__c'
const receiveEmailBoxLoc = '#LblSubscription_Opt_In__c:last-child'
const submitBtnLoc = '[type="submit"]'

const becomePartnerFormLoc = '#become-a-partner'

const exploreMarketBtnLoc = '//h1/..//*[contains(@href, "marketplace")]'

class CompanyFormBase extends BasePage {

    readonly firstNameInp = this.page.locator(firstNameInpLoc);
    readonly lastNameInp = this.page.locator(lastNameInpLoc);
    readonly emailInp = this.page.locator(emailInpLoc);
    readonly useCaseSelector = this.page.locator(useCaseSelectorLoc);
    readonly useCaseOptCount = 17
    readonly addInfoInp = this.page.locator(addInfoInpLoc);
    readonly receiveEmailBox = this.page.locator(receiveEmailBoxLoc);
    readonly submitBtn = this.page.locator(submitBtnLoc);
    
    async fillForm(
        firstName?: string,
        lastName?: string,
        email?: string,
        useCase: number = 0,
        addInform?: string,
        receiveEmails: Boolean = false
    ) {
        if (firstName) await this.firstNameInp.fill(firstName)
        if (lastName) await this.lastNameInp.fill(lastName)
        if (email) await this.emailInp.fill(email)
        if (useCase) await this.useCaseSelector.selectOption({ index: useCase })
        if (addInform) await this.addInfoInp.fill(addInform)
        if (receiveEmails) await this.receiveEmailBox.click()
    }

    async getCaseOpt (index: number) {
        return await this.useCaseSelector.locator('option').nth(index).innerText()
    }
}

export class CompanyIntegrationsPage extends CompanyFormBase {

    async clickExploreMarketplaceBtn () {
        await this.page.locator(exploreMarketBtnLoc).click()
    }

    async scrollToTesterForm () {
        await this.page.locator(becomeTesterFormLoc).scrollIntoViewIfNeeded()
    }

}

export class CompanyPartnersPage extends CompanyFormBase {

    async scrollToPartnerForm () {
        await this.page.locator(becomePartnerFormLoc).scrollIntoViewIfNeeded()
    }
}