import { Page, Locator } from '@playwright/test';

export class RegistrationPopup {
    private page: Page;
    readonly registrationTitle: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationTitle = page.locator("h4.modal-title", { hasText: 'Registration' });
        this.nameInput = page.locator("#signupName");
        this.lastNameInput = page.locator("#signupLastName");
        this.emailInput = page.locator("#signupEmail");
        this.passwordInput = page.locator("#signupPassword");
        this.reEnterPasswordInput = page.locator("#signupRepeatPassword");
        this.registerBtn = page.locator("button[type='button']", { hasText: 'Register' });
    }

    async fillRegistrationForm(name: string, lastName: string, email: string, password: string) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.reEnterPasswordInput.fill(password);
    }
    
    async submitRegistration() {
        await this.registerBtn.click();
        return this;
    }
}