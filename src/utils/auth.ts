import { Page, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home-page';
import { LoginPopup } from '../../src/pages/login-popup';
import { GaragePage } from '../../src/pages/garage-page';

export async function performLogin(page: Page, email: string, password: string) {
    const homePage = new HomePage(page);
    const loginPopup = new LoginPopup(page);
    const garagePage = new GaragePage(page);

    await page.goto('/');
    await homePage.clickSignInBtn();
    await expect(loginPopup.loginTitle).toHaveText('Log in');
    await loginPopup.fillLoginForm(email, password);
    await loginPopup.submitLogin();

    await expect(page).toHaveURL(new RegExp(garagePage.url + '$'));
    await expect(garagePage.garageTitle).toHaveText('Garage');
}