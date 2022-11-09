import { test, expect, Page } from '@playwright/test';
import { BlogPage } from '../pageobjects/articles.pages';
import { MainPage } from '../pageobjects/main.page'


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
})