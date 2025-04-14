import { test } from '@playwright/test';

test.describe('Other - Positive', () => {
    test('Test environment variables', async ({ page }, testInfo) => {
        const config = testInfo.project.use;
        console.log('BASE_URL:', config.baseURL);
        console.log('Username:', config.httpCredentials?.username);
        console.log('Password:', config.httpCredentials?.password);

        await page.goto('/');
    });
});