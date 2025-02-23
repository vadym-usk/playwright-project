import { expect, Page, Locator } from '@playwright/test';

export class GaragePage {
    private page: Page;
    public readonly url: string = '/panel/garage';
    readonly garageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garageTitle = page.locator("h1", { hasText: 'Garage' });
    }

    async assertGaragePage() {
        await expect(this.garageTitle).toHaveText('Garage');
        await expect(this.page).toHaveURL(new RegExp(this.url + '$'));
        return this;
    }
}