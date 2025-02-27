import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/homePage';
import { RegistrationPopup } from '../../src/pages/registrationPopup';
import { GaragePage } from '../../src/pages/garagePage';

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
        await registrationPopup.fillRegistrationForm('testName', 'testLastName', uniqueEmail, 'Secretpass123');
        await registrationPopup.registerBtn.click();

        await expect(page).toHaveURL(new RegExp(garagePage.url + '$'));
        await expect(garagePage.garageTitle).toHaveText('Garage');
    });
});