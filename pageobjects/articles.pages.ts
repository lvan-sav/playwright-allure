import { Locator } from '@playwright/test'
import { BasePage } from './base.page'


const anyArticleTitleLoc = {
    firstHalf: '[href*="/resources"]:nth-child(',
    secHalf: ') article h2'
}
const articlePaginationNum = 31
const searchArticleInpLoc = '#search'

export class BlogPage extends BasePage {

    readonly firstArticle: Locator = this.page.locator(`${anyArticleTitleLoc.firstHalf}1${anyArticleTitleLoc.secHalf}`)
    
    async getRandomArticlePageTitle(articlePagination: number = articlePaginationNum): Promise<string> {
        const articleTitleArr: string[] = []
        for (let i = 1; i < articlePagination + 1; i++) {
            let articleTitle: Locator = this.page.locator(`${anyArticleTitleLoc.firstHalf}${i}${anyArticleTitleLoc.secHalf}`)

            let articleTitleText: string = await articleTitle.innerText()

            articleTitleArr.push(articleTitleText)
        }

        return articleTitleArr[this.randomNumber(articleTitleArr.length) - 1]
    }

    async fillSearchField(text: string){
        await this.page.locator(searchArticleInpLoc).fill(text)
    }

    async fillSearchByRandomArticle() {
        const randomArticleTitle: string = await this.getRandomArticlePageTitle(articlePaginationNum)

        await this.fillSearchField(randomArticleTitle)
    }

    async searchArticle(){
        await this.page.locator(searchArticleInpLoc).press('Enter')
    }
}