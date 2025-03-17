import { Page, Locator } from '@playwright/test';

export class LoginPopup {
    private page: Page;
    readonly loginTitle: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginTitle = page.locator("h4.modal-title", { hasText: 'Log in' });
        this.emailInput = page.locator("#signinEmail");
        this.passwordInput = page.locator("#signinPassword");
        this.loginBtn = page.locator("button[type='button']", { hasText: 'Login' });
    }

    async fillLoginForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submitLogin() {
        await this.loginBtn.click();
        return this;
    }
}