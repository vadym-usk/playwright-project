import { expect, APIRequestContext } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

test.describe('Garage - Negative', () => {
    let apiContext: APIRequestContext;

    test.beforeEach(async ({ playwright, login }) => {
        apiContext = await playwright.request.newContext();
    });

    test('Add new car to the garage with negative mileage', async ({ baseURL, login }) => {
        const addCar = await apiContext.post(`${baseURL}/api/cars`, {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": -122
            }
        });

        const responseData = await addCar.json();

        expect(addCar.status()).toBe(400);
        expect(responseData.status).toBe("error");
        expect(responseData.message).toBe("Mileage has to be from 0 to 999999");
    });

    test('Add new car to the garage with wrong carBrandId', async ({ baseURL, login }) => {
        const addCar = await apiContext.post(`${baseURL}/api/cars`, {
            data: {
                "carBrandId": 0,
                "carModelId": 1,
                "mileage": 122
            }
        });

        const responseData = await addCar.json();

        expect(addCar.status()).toBe(404);
        expect(responseData.status).toBe("error");
        expect(responseData.message).toBe("Brand not found");
    });
});