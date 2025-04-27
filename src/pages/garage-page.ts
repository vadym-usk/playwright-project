import { expect, Page, Locator } from '@playwright/test';

export class GaragePage {
    private page: Page;
    public readonly url: string = '/panel/garage';
    readonly garageTitle: Locator;
    readonly emptyGarageTitle: Locator;
    readonly emptyGaragePanel: Locator;
    readonly addCarBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garageTitle = page.locator("h1", { hasText: 'Garage' });
        this.emptyGarageTitle = page.locator("p[class*='empty_message']");
        this.emptyGaragePanel = page.locator("div[class*='panel-empty']");
        this.addCarBtn = page.locator("button[class*='btn-primary']", { hasText: 'Add car' });
    }

    async assertGaragePage() {
        await expect(this.garageTitle).toHaveText('Garage');
        await expect(this.page).toHaveURL(new RegExp(this.url + '$'));
        return this;
    }
}