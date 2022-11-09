import { Locator } from '@playwright/test'
import { BasePage } from './base.page'


const anyArticleTitleLoc = {
    firstHalf: '[href*="/resources"]:nth-child(',
    secHalf: ') article h2'
}
const articlePaginationNum = 31
const searchBlogArticleInpLoc = '#search'

const searchDocsArticleInpLoc = '#docs-desktop-sidebar input'
const possibleSearchResultsLoc = '#docs-desktop-sidebar [href*="developers"]'
const docsPageTitleLoc = 'main h1'
const docsPageSubtitleLoc = 'main h2 span:first-child'
const docsQuestionBlockLoc = 'main > div:nth-child(3) > div > div'

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
        await this.page.locator(searchBlogArticleInpLoc).fill(text)
    }

    async fillSearchByRandomArticle() {
        const randomArticleTitle: string = await this.getRandomArticlePageTitle(articlePaginationNum)

        await this.fillSearchField(randomArticleTitle)
    }

    async searchArticle(){
        await this.page.locator(searchBlogArticleInpLoc).press('Enter')
    }
}

export class DocsPage extends BasePage {

    readonly docsPageTitle: Locator = this.page.locator(docsPageTitleLoc)
    readonly docsPageSubtitle: Locator = this.page.locator(docsPageSubtitleLoc)
    readonly docsQuestionBlock: Locator = this.page.locator(docsQuestionBlockLoc)

    async fillSearchField(text: string) {
        await this.page.locator(searchDocsArticleInpLoc).fill(text)
    }

    async clickFirstPossobleResult() {
        await this.page.locator(`${possibleSearchResultsLoc}:nth-child(1)`).click()
    }
}

