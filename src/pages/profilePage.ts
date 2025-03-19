import { expect, Page, Locator } from '@playwright/test';

export class ProfilePage {
    private page: Page;
    public readonly url: string = '/panel/profile';
    readonly profileTitle: Locator;
    readonly profileName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileTitle = page.locator("h1", { hasText: 'Profile' });
        this.profileName = page.locator("p[class*='profile_name']");
    }
}