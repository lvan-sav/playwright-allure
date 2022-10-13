import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const contactReasons = ['', 'Sales Inquiry', 'Support', 'Support']
const reasonSelectLoc = '#Reason_for_Contact__c'
const firstNameLoc = '#FirstName'
const lastNameLoc = '#LastName'
const emailLoc = '#Email'
const codeSum = 221
const codeSelectLoc = '#Phone_Number_Extension__c'
const numberLoc = '#Phone_Number_Base__c'
const websiteLoc = '#Website'
const addInfoLoc = '#Form_Additional_Information__c'
const receiveBoxLoc = '[name="Subscription_Opt_In__c"]'

export class ContactUsPage extends BasePage {
    readonly reasonOpt: string[] = contactReasons
    readonly codeSum: number = codeSum
    readonly reasonSelect: Locator = this.page.locator(reasonSelectLoc)
    readonly firstNameInp: Locator = this.page.locator(firstNameLoc)
    readonly lastNameInp: Locator = this.page.locator(lastNameLoc)
    readonly emailInp: Locator = this.page.locator(emailLoc)
    readonly codeInSum: number = codeSum
    readonly codeSelect: Locator = this.page.locator(codeSelectLoc)
    readonly numberInp: Locator = this.page.locator(numberLoc)
    readonly websiteInp: Locator = this.page.locator(websiteLoc)
    readonly addInfoInp: Locator = this.page.locator(addInfoLoc)
    readonly receiveBox: Locator = this.page.locator(receiveBoxLoc)

    async fillFields (
        reason: string,
        firstName: string | undefined = '',
        lastName: string | undefined = '',
        email: string | undefined = '',
        codeCount: number = 0,
        number: string | undefined = '',
        website: string | undefined = '',
        addInfo: string | undefined = '',
        receiveBoxChecked: boolean = false
    ) {
        
        await this.reasonSelect.selectOption({ value: reason })

        await this.firstNameInp.type(firstName)

        await this.lastNameInp.type(lastName)

        await this.emailInp.type(email)

        await this.codeSelect.selectOption({ index: codeCount })

        await this.numberInp.type(number)

        await this.websiteInp.type(website)

        await this.addInfoInp.type(addInfo)

        if (receiveBoxChecked)
            this.receiveBox.click()
    };

    async fillAllFields(
        reason: string,
        firstName: string,
        lastName: string,
        email: string,
        codeCount: number,
        number: string,
        website: string,
        addInfo: string
    ) 
    {
        return await this.fillFields (
            reason,
            firstName,
            lastName,
            email,
            codeCount,
            number,
            website,
            addInfo,
            true
        )
    }

    async getNumberCode (index: number) {
        return await this.codeSelect.locator('option').nth(index).innerText()
    }
}