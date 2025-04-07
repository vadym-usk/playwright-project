import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/homePage';
import { RegistrationPopup } from '../../src/pages/registrationPopup';
import { GaragePage } from '../../src/pages/garagePage';

test.describe('Positive Tests', () => {
    let homePage;
    let registrationPopup;
    let garagePage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homePage = new HomePage(page);
        registrationPopup = new RegistrationPopup(page);
        garagePage = new GaragePage(page);
    });

    test.skip('User registration', async ({ page }) => {
        const timestamp = Date.now();
        const uniqueEmail = `test-email+${timestamp}@gmail.com`;

        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm('testName', 'testLastName', uniqueEmail, 'Secretpass123');
        await registrationPopup.registerBtn.click();

        await expect(page).toHaveURL(new RegExp(garagePage.url + '$'));
        await expect(garagePage.garageTitle).toHaveText('Garage');
    });
});