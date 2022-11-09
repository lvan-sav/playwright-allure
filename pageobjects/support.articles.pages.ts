import { Locator } from '@playwright/test'
import { BasePage } from './base.page'


const searchSupportArticleInpLoc = '.search__input'
const anySearchArticle = '.search-results__row'

const lastBreadcrumbItemLoc = '.breadcrumb > :last-child'
const articleTitleLoc = '.article__meta h1'
const articleAuthorLoc = '.article__meta span'
const reactionPickerLoc = '.intercom-reaction-picker'
const reactionDissapointedLoc = '[data-emoji="disappointed"]'
const reactionNeutralLoc = '[data-emoji="neutral_face"]'
const reactionSmilayLoc = '[data-emoji="smiley"]'

export class SupportPage extends BasePage {

    async fillSearchField(text: string) {
        await this.page.locator(searchSupportArticleInpLoc).fill(text)
    }

    async searchArticle(){
        await this.page.locator(searchSupportArticleInpLoc).press('Enter')
    }

    async clickFirtsArticle() {
        await this.page.locator(`${anySearchArticle}:nth-child(2)`).click()
    }
}

export class SupportArticlePage extends SupportPage {
    
    readonly lastBreadcrumbItem: Locator = this.page.locator(lastBreadcrumbItemLoc)
    readonly articleTitle: Locator = this.page.locator(articleTitleLoc)
    readonly articleAuthor: Locator = this.page.locator(articleAuthorLoc)
    readonly reactionPicker: Locator = this.page.locator(reactionPickerLoc)
    readonly reactionDissapointed: Locator = this.page.locator(reactionDissapointedLoc)
    readonly reactionNeutral: Locator = this.page.locator(reactionNeutralLoc)
    readonly reactionSmiley: Locator = this.page.locator(reactionSmilayLoc)
}