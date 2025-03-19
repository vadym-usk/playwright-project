import { test as base, expect } from '@playwright/test';
import path from 'path';
import { GaragePage } from '../../src/pages/garagePage';

export type MyFixture = {
    userGaragePage: {
        goto: () => Promise<void>;
        assertEmptyGarageList: () => Promise<void>;
    };
    login: any;
}

export const test = base.extend<MyFixture>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: path.resolve(__dirname, '../storage/auth.json')
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);

        const userGaragePage = {
            async goto() {
                await page.goto(garagePage.url);
                await page.waitForLoadState('domcontentloaded');
            },

            async assertEmptyGarageList() {
                await expect(garagePage.garageTitle).toHaveText('Garage');
                await expect(garagePage.emptyGarageTitle).toHaveText('You don’t have any cars in your garage');
                await expect(garagePage.emptyGaragePanel).toBeVisible();
                await expect(garagePage.addCarBtn).toBeVisible();
            }
        };

        await use(userGaragePage);
        await page.close();
        await context.close();
    },

    login: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: path.resolve(__dirname, '../storage/auth.json')
        });
        const page = await context.newPage();

        await use(page);
        await page.close();
        await context.close();
    },
});