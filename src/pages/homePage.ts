import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;
    readonly signUpBtn: Locator;
    readonly signInBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpBtn = page.locator("button[class*='descriptor_btn']", { hasText: 'Sign up' });
        this.signInBtn = page.locator("button[class*='header_signin']", { hasText: 'Sign in' });
    }

    async clickSignUpBtn() {
        await this.signUpBtn.click();
        return this;
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
        return this;
    }
}