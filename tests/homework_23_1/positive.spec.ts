import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { RegistrationPopup } from '../../pages/registrationPopup';
import { GaragePage } from '../../pages/garagePage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Positive Tests', () => {
    test('User registration', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationPopup = new RegistrationPopup(page);
        const garagePage = new GaragePage(page);
        const timestamp = Date.now();
        const uniqueEmail = `test-email+${timestamp}@gmail.com`;

        await homePage.clickSignUpBtn();
        await registrationPopup.nameInput.fill('testName');
        await registrationPopup.lastNameInput.fill('testLastName');
        await registrationPopup.emailInput.fill(uniqueEmail);
        await registrationPopup.passwordInput.fill('Secretpass123');
        await registrationPopup.reEnterPasswordInput.fill('Secretpass123');
        await registrationPopup.registerBtn.click();

        await expect(page).toHaveURL(new RegExp(garagePage.url + '$'));
        await expect(garagePage.garageTitle).toHaveText('Garage');
    });
});