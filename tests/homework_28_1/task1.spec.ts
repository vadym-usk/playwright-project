import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { ProfilePage } from '../../src/pages/profilePage';

test.describe('Task 1', () => {
    let profilePage;

    test.beforeEach(async ({ login }) => {
        const page = await login;
        profilePage = new ProfilePage(page);
    });

    test('Comparing the frontend data with API response', async ({ login }) => {
        const page = await login;

        const responsePromise = page.waitForResponse('**/api/users/profile');
        await page.goto(profilePage.url);
        const apiResponse = await (await responsePromise).json();

        const fullName = await profilePage.profileName.textContent();
        const [uiName, uiLastName] = fullName.split(" ");

        expect(uiName).toBe(apiResponse.data.name);
        expect(uiLastName).toBe(apiResponse.data.lastName);
    });
});