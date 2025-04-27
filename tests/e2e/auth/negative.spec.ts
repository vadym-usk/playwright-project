import { test, expect } from '@playwright/test';
import { HomePage } from '../../../src/pages/home-page';
import { RegistrationPopup } from '../../../src/pages/registration-popup';

test.describe('Auth - Negative', () => {
    let homePage;
    let registrationPopup;
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homePage = new HomePage(page);
        registrationPopup = new RegistrationPopup(page);
    });

    test('Check registration popup with empty fields', async ({ }) => {
        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm('', '', '', '');
        await registrationPopup.registrationTitle.click();

        await expect(registrationPopup.registerBtn).toBeDisabled();
        await registrationPopup.assertNameValidation('Name required');
        await registrationPopup.assertLastNameValidation('Last name required');
        await registrationPopup.assertEmailValidation('Email required');
        await registrationPopup.assertPasswordValidation('Password required');
        await registrationPopup.assertReEnterPasswordValidation('Re-enter password required');
    });

    test('Check registration popup with wrong data', async ({ }) => {
        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm(' фылаорыкуадка', 'флвоы аикуло ', 'testemail.com', 'test');
        await registrationPopup.registrationTitle.click();

        await expect(registrationPopup.registerBtn).toBeDisabled();
        await registrationPopup.assertNameValidation('Name is invalid');
        await registrationPopup.assertLastNameValidation('Last name is invalid');
        await registrationPopup.assertEmailValidation('Email is incorrect');
        await registrationPopup.assertPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPopup.assertReEnterPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Check registration popup with wrong length for Name, Last Name and Password fields', async ({ }) => {
        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm('t', 'testLastNametestLastN', 'test-email+1@gmail.com', '1Gsd1Gsd1Gsd1Gsd');
        await registrationPopup.registrationTitle.click();

        await expect(registrationPopup.registerBtn).toBeDisabled();
        await registrationPopup.assertNameValidation('Name has to be from 2 to 20 characters long');
        await registrationPopup.assertLastNameValidation('Last name has to be from 2 to 20 characters long');
        await registrationPopup.assertPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPopup.assertReEnterPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Check registration popup with special symbols for Password field', async ({ }) => {
        await homePage.clickSignUpBtn();
        await registrationPopup.fillRegistrationForm('testName', 'testLastName', 'test-email+1@gmail.com', 'secretpasstttt');
        await registrationPopup.registrationTitle.click();

        await expect(registrationPopup.registerBtn).toBeDisabled();
        await registrationPopup.assertPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPopup.assertReEnterPasswordValidation('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Check registration popup with not matched passwords', async ({ }) => {
        await homePage.clickSignUpBtn();
        await registrationPopup.nameInput.fill('testName');
        await registrationPopup.lastNameInput.fill('testLastName');
        await registrationPopup.emailInput.fill('test-email+1@gmail.com');
        await registrationPopup.passwordInput.fill('Secretpass123');
        await registrationPopup.reEnterPasswordInput.fill('Secretpass1231');
        await registrationPopup.registrationTitle.click();

        await expect(registrationPopup.registerBtn).toBeDisabled();
        await registrationPopup.assertReEnterPasswordValidation('Passwords do not match');
    });
});