import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";


const searchIntegrationInploc = 'input[type="text"]'
const possiblesearchResult = '[role="listbox"]'

const integrationPageTitleLoc = 'h1.title'
const lastBreadcrumbItemLoc = '.breadcrumbs li:last-child'
const asideGetStartedBtnLoc = 'aside a.button'

export class MarketplacePage extends BasePage {

    async fillSearchField(text: string) {
        await this.page.waitForNavigation()

        await this.page.locator(searchIntegrationInploc)
        .fill(text)
    }

    async clickFirstSearchResult() {
        await this.page.waitForTimeout(1000)

        await this.page.locator(possiblesearchResult)
        .nth(0)
        .click()
    }
}

export class MarketIntegrationPage extends MarketplacePage {

    readonly integrationPageTitle = this.page.locator(integrationPageTitleLoc)
    readonly lastBreadcrumbItem = this.page.locator(lastBreadcrumbItemLoc)
    readonly asideGetStartedBtn = this.page.locator(asideGetStartedBtnLoc)
}