import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const subjectInpLoc = '[name="shortDescription"]'
const phoneAbusiveInpLoc = '[name="abusivePhoneNumber"]'
const phoneAbusedInpLoc = '[name="abusedPhoneNumber"]'
const abusedDateTimeCalendarLoc = '#abusedDateTime'
const voiceBoxLoc = '[for="serviceAbusedVoice"]'
const smsBoxLoc = '[for="serviceAbusedSms"]'
const nameInpLoc = '[name="reporterName"]'
const emailInpLoc = '[name="reporterEmail"]'
const addInfoInpLoc = '[name="longDescription"]'
const submitBtnLoc = 'button[type="submit"]'

export class ReportAbusePage extends BasePage {
    readonly subjectInp: Locator = this.page.locator(subjectInpLoc)
    readonly phoneAbusiveInp: Locator = this.page.locator(phoneAbusiveInpLoc)
    readonly phoneAbusedInp: Locator = this.page.locator(phoneAbusedInpLoc)
    readonly abusedDateTimeCalendar: Locator = this.page.locator(abusedDateTimeCalendarLoc)
    readonly voiceBox: Locator = this.page.locator(voiceBoxLoc)
    readonly smsBox: Locator = this.page.locator(smsBoxLoc)
    readonly nameInp: Locator = this.page.locator(nameInpLoc)
    readonly emailInp: Locator = this.page.locator(emailInpLoc)
    readonly addInfoInp: Locator = this.page.locator(addInfoInpLoc)
    readonly submitBtn: Locator = this.page.locator(submitBtnLoc)

    async fillFields (
        subject?: string,
        abusivePhone?: string,
        abusedPhone?: string,
        abusedDate?: string,
        abusedTime?: string,
        voiceBoxChecked: boolean = false,
        smsBoxChecked: boolean = false,
        name?: string,
        email?: string,
        addInfo?: string
    ) {
        if (subject)
            await this.subjectInp.fill(subject)
        
        if (abusivePhone)
            await this.phoneAbusiveInp.fill(abusivePhone)

        if (abusedPhone)
            await this.phoneAbusedInp.fill(abusedPhone)
        
        if (abusedDate && abusedTime)
            await this.abusedDateTimeCalendar.fill(`${abusedDate} ${abusedTime}`)
        else
            if (abusedDate)
                await this.abusedDateTimeCalendar.fill(abusedDate)
            if (abusedTime)
                await this.abusedDateTimeCalendar.fill(abusedTime)
        
        if (voiceBoxChecked)
            await this.voiceBox.click()

        if (smsBoxChecked)
            await this.smsBox.click()

        if (name)
            await this.nameInp.fill(name)

        if (email)
            await this.emailInp.fill(email)

        if (addInfo)
            await this.addInfoInp.fill(addInfo)
    }

    async fillAllFields (
        subject: string | undefined,
        abusivePhone: string | undefined,
        abusedPhone: string | undefined,
        name: string | undefined,
        email: string | undefined,
        addInfo: string | undefined
    ) {
        return await this.fillFields(
            subject,
            abusivePhone,
            abusedPhone,
            undefined,
            undefined,
            true,
            true,
            name,
            email,
            addInfo
        )
    }

    async getReportDateTime () {
        return await this.abusedDateTimeCalendar.inputValue()
    }

    async clickSubmitBtn() {
        await this.submitBtn.click()
    }
}