import { test as baseTest } from '@playwright/test';

export type MyFixture = {
    userGaragePage: {
        goto: () => Promise<void>;
        addCar: (model: string, year: number) => Promise<void>;
        getCarsList: () => Promise<string[]>;
    };
}

export const test = baseTest.extend<MyFixture>({
    userGaragePage: async ({ page }, use) => {
        const userGaragePage = {
            async goto() {
                await page.goto('/garage');
            },
            async addCar(model: string, year: number) {
                await page.fill('#car-model', model);
                await page.fill('#car-year', year.toString());
                await page.click('#add-car-button');
            },
            async getCarsList() {
                return await page.locator('.car-item').allTextContents();
            }
        };

        await use(userGaragePage);
    }
});