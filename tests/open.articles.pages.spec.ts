import { test, expect, Page } from '@playwright/test';
import { BlogPage, DocsPage, UseCasePage } from '../pageobjects/articles.pages';
import { SupportPage, SupportArticlePage } from '../pageobjects/support.articles.pages';
import { MainPage } from '../pageobjects/main.page';


test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.goto()
    await mainPage.closeCookiePopup()
})

test.describe('Open additional pages in the Telnyx website', () => {
    test('Search random existing article on the Blog page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const blogPage = new BlogPage(page)

        await mainPage.hoverResourcesDropdown()
        await mainPage.clickBlogBtn()

        const randomArticleTitle = await blogPage.getRandomArticlePageTitle()
        await blogPage.fillSearchField(randomArticleTitle)
        await blogPage.searchArticle()

        await expect(blogPage.firstArticle).toHaveText(randomArticleTitle)
    })

    test('Go to the "Programmable Wireless Reporting and Analytics" support article from the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const supportPage = new SupportPage(page)
        const supportArticlePage = new SupportArticlePage(page)

        await mainPage.clickSupportCenterlink()

        await supportPage.fillSearchField('Programmable Wireless Reporting and Analytics')
        await supportPage.searchArticle()
        await supportPage.clickFirtsArticle()

        await expect(supportArticlePage.lastBreadcrumbItem).toHaveText('Programmable Wireless Reporting and Analytics')
        await expect(supportArticlePage.articleTitle).toHaveText('Programmable Wireless Reporting and Analytics')
        await expect(supportArticlePage.articleAuthor).toHaveText(/Telnyx Engineering/)
        await expect(supportArticlePage.reactionPicker).toBeVisible()
        await expect(supportArticlePage.reactionDissapointed).toBeEnabled()
        await expect(supportArticlePage.reactionNeutral).toBeEnabled()
        await expect(supportArticlePage.reactionSmiley).toBeEnabled()
    })

    test('Go to the "TeXML" doc page from the main page', async ({ page }) => {
        const mainPAge = new MainPage(page)
        const docsPage = new DocsPage(page)

        await mainPAge.clickLearnMoreLink()

        await docsPage.fillSearchField('TeXML')
        await docsPage.clickFirstPossobleResult()

        await expect(docsPage.docsPageTitle).toHaveText(/TeXML/)
        await expect(docsPage.docsPageSubtitle).toHaveText('Dynamic Parameters for TeXML')
        await expect(docsPage.docsQuestionBlock).toHaveText('Was this page helpful?')
    })

    test('Go to the random Use Case article from the Main page', async ({ page }) => {
        const mainPage = new MainPage(page)
        const useCasePage = new UseCasePage(page)

        await mainPage.hoverSolutionsDropdown()
        await mainPage.clickAllUseCasesBtn()

        const randomUseCaseTitle = await useCasePage.clickRandomUseCase()

        await expect(useCasePage.useCaseArticleTitle).toHaveText(randomUseCaseTitle)
    })
})