import { test as setup } from '@playwright/test';
import path from 'path';
import { performLogin } from '../../src/utils/auth';

setup('Login and save storage state', async ({ page }) => {
    //const email = process.env.TEST_EMAIL || 'test-email+1@gmail.com';
    //const password = process.env.TEST_PASSWORD || 'Secretpass123';

    const email = 'test-email+1@gmail.com';
    const password = 'Secretpass123';

    await performLogin(page, email, password);

    await page.context().storageState({ path: path.resolve(__dirname, '../storage/auth.json') });
});