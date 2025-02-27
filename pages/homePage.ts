import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;
    readonly signUpBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpBtn = page.locator("button[class*='descriptor_btn']", { hasText: 'Sign up' });
    }

    async clickSignUpBtn() {
        await this.signUpBtn.click();
        return this;
    }
}