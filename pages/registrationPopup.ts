import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPopup {
    private page: Page;
    public readonly errorColor: string = 'rgb(220, 53, 69)';
    readonly registrationTitle: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly nameValidation: Locator;
    readonly lastNameValidation: Locator;
    readonly emailValidation: Locator;
    readonly passwordValidation: Locator;
    readonly reEnterPasswordValidation: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationTitle = page.locator("h4.modal-title", { hasText: 'Registration' });
        this.nameInput = page.locator("#signupName");
        this.lastNameInput = page.locator("#signupLastName");
        this.emailInput = page.locator("#signupEmail");
        this.passwordInput = page.locator("#signupPassword");
        this.reEnterPasswordInput = page.locator("#signupRepeatPassword");
        this.nameValidation = page.locator("#signupName + *");
        this.lastNameValidation = page.locator("#signupLastName + *");
        this.emailValidation = page.locator("#signupEmail + *");
        this.passwordValidation = page.locator("#signupPassword + *");
        this.reEnterPasswordValidation = page.locator("#signupRepeatPassword + *");
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

    async assertNameValidation(message) {
        await expect(this.nameValidation).toBeVisible();
        await expect(this.nameValidation).toHaveText(message);
        await expect(this.nameValidation).toHaveCSS('color', this.errorColor);
        await expect(this.nameInput).toHaveCSS('border-color', this.errorColor);
    }

    async assertLastNameValidation(message) {
        await expect(this.lastNameValidation).toBeVisible();
        await expect(this.lastNameValidation).toHaveText(message);
        await expect(this.lastNameValidation).toHaveCSS('color', this.errorColor);
        await expect(this.lastNameInput).toHaveCSS('border-color', this.errorColor);
    }

    async assertEmailValidation(message) {
        await expect(this.emailValidation).toBeVisible();
        await expect(this.emailValidation).toHaveText(message);
        await expect(this.emailValidation).toHaveCSS('color', this.errorColor);
        await expect(this.emailInput).toHaveCSS('border-color', this.errorColor);
    }

    async assertPasswordValidation(message) {
        await expect(this.passwordValidation).toBeVisible();
        await expect(this.passwordValidation).toHaveText(message);
        await expect(this.passwordValidation).toHaveCSS('color', this.errorColor);
        await expect(this.passwordInput).toHaveCSS('border-color', this.errorColor);
    }

    async assertReEnterPasswordValidation(message) {
        await expect(this.reEnterPasswordValidation).toBeVisible();
        await expect(this.reEnterPasswordValidation).toHaveText(message);
        await expect(this.reEnterPasswordValidation).toHaveCSS('color', this.errorColor);
        await expect(this.reEnterPasswordInput).toHaveCSS('border-color', this.errorColor);
    }
}