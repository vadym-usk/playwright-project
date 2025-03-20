import { expect, APIRequestContext } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test.describe('Task 2: Positive tests', () => {
    let apiContext: APIRequestContext;
    let carId: number | undefined;

    test.beforeEach(async ({ playwright, login }) => {
        const page = await login;
        apiContext = await playwright.request.newContext();
    });

    test('Add new car to the garage', async ({ login }) => {
        const page = await login;

        const addCar = await apiContext.post('https://qauto.forstudy.space/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }
        });

        const responseData = await addCar.json();
        console.log("API Response:", responseData);
        carId = responseData.data.id;

        expect(addCar.status()).toBe(201);
        expect(addCar).toBeOK();
        expect(responseData.status).toBe("ok");
        expect(typeof responseData.data.id).toBe("number");
        expect(responseData.data.carBrandId).toBe(1);
        expect(responseData.data.carModelId).toBe(1);
        expect(responseData.data.initialMileage).toBe(122);
        expect(typeof responseData.data.updatedMileageAt).toBe("string");
        expect(typeof responseData.data.carCreatedAt).toBe("string");
        expect(responseData.data.mileage).toBe(122);
        expect(responseData.data.brand).toBe("Audi");
        expect(responseData.data.model).toBe("TT");
        expect(responseData.data.logo).toBe("audi.png");
    });

    test.afterEach(async () => {
        const deleteCar = await apiContext.delete(`https://qauto.forstudy.space/api/cars/${carId}`);
        const responseData = await deleteCar.json();
        console.log("API Response:", responseData);
    });
});