import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { RegistrationPopup } from '../../pages/registrationPopup';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Negative Tests', () => {
    test('User registration', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationPopup = new RegistrationPopup(page);

        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm('testName', 'testLastName', 'test-email+1@gmail.com', 'Secretpass123');


        //await expect(registrationPopup.123).toHaveText('Garage');

    });
});