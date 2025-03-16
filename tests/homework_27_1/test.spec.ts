import { test } from '@playwright/test';

test.describe('Positive Tests', () => {
    test.only('Check Garage page for logged-in user', async ({ page }, testInfo) => {
        //const config = testInfo.project.use;
        //console.log('BASE_URL:', config.baseURL);
        //console.log('Username:', config.httpCredentials?.username);
        //console.log('Password:', config.httpCredentials?.password);

        console.log('Basic test for Homework');

        await page.goto('/');
    });
});