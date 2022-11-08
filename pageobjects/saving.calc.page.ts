import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const msgApiBoxLoc = '//*[@id="MessageApi_svg__a"]/../..'
const sipTrunkBoxLoc = '//*[@alt="elastic sip trunking"]/..'
const voiceApiBoxLoc = '//*[@alt="voice api"]/..'

const continueBtnLoc = 'main div:nth-child(4) button'

const localNumInpLoc = '#local-numbers'
const tollNumInpLoc = '#toll-free-numbers'

const sendSmsInpLoc = '#send-sms'
const receiveSmsInpLoc = '#receive-sms'
const sendMmsInpLoc = '#send-mms'
const receiveMmsInploc = '#receive-mms'

const inboundToLocalInpLoc = '#receive-inbound-calls-to-local-numbers'
const inboundToTollInpLoc = '#receive-inbound-calls-to-toll-free-numbers'
const outbondInpLoc = '#make-outbound-calls'

const inboundCallControlInpLoc = '#receive-inbound-calls-with-call-control'
const outboundCallControlInpLoc = '#make-outbound-calls-with-call-control'

const priceBlocLoc = '//header/../div[2]/div[2]'
const calcSignUpBtnloc = 'div:nth-child(4) .sign-up-link'

export class CalcPage extends BasePage {

    readonly priceBlock: Locator = this.page.locator(priceBlocLoc)
    readonly calcSignUpBtn: Locator = this.page.locator(calcSignUpBtnloc)

    async clickMsgApiBox() {
        await this.page.locator(msgApiBoxLoc).click()
    }

    async clickSipTrunkBox() {
        await this.page.locator(sipTrunkBoxLoc).click()
    }

    async clickVoiceApiBox() {
        await this.page.locator(voiceApiBoxLoc).click()
    }

    async clickContinueBtn() {
        await this.page.locator(continueBtnLoc).click()
    }

    async setLocalNumbers(num: number) {
        await this.setNumber(num, localNumInpLoc)
    }

    async setTollNumbers(num: number) {
        await this.setNumber(num, tollNumInpLoc)
    }

    async setSendSms(num: number) {
        await this.setNumber(num, sendSmsInpLoc)
    }

    async setReceiveSms(num: number) {
        await this.setNumber(num, receiveSmsInpLoc)
    }

    async setSendMms(num: number) {
        await this.setNumber(num, sendMmsInpLoc)
    }

    async setReceiveMms(num: number) {
        await this.setNumber(num, receiveMmsInploc)
    }

    async setInboundLocalNum(num: number) {
        await this.setNumber(num, inboundToLocalInpLoc)
    }

    async setInboundTollNum(num: number) {
        await this.setNumber(num, inboundToTollInpLoc)
    }

    async setOutbondNum(num: number) {
        await this.setNumber(num, outbondInpLoc)
    }

    async setInboundCallControl(num: number) {
        await this.setNumber(num, inboundCallControlInpLoc)
    }

    async setOutboundCallControl(num: number) {
        await this.setNumber(num, outboundCallControlInpLoc)
    }

    private async setNumber(num: number, locator: string) {
        let number = String(num)
        return await this.page.locator(locator).fill(number)
    }
}