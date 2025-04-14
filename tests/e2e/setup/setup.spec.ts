import { test as setup } from '@playwright/test';
import path from 'path';
import { performLogin } from '../../../src/utils/auth';

setup('Login and save storage state', async ({ page }) => {
    await performLogin(page, process.env.HTTP_CREDENTIALS_USERNAME as string, process.env.HTTP_CREDENTIALS_PASSWORD as string);
    await page.context().storageState({ path: path.resolve(__dirname, '../storage/auth.json') });
});