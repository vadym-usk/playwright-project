import { expect, APIRequestContext } from '@playwright/test';
import { test } from '../../fixtures/fixtures';
import { ProfilePage } from '../../../src/pages/profile-page';

test.describe('Garage - Positive', () => {
    let apiContext: APIRequestContext;
    let carId: number | undefined;
    let profilePage;

    test.beforeEach(async ({ playwright, login }) => {
        const page = await login;
        apiContext = await playwright.request.newContext();
        profilePage = new ProfilePage(page);
    });

    test('Check the empty Garage page for logged-in user', async ({ userGaragePage }) => {
        await userGaragePage.goto();
        await userGaragePage.assertEmptyGarageList();
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

    test('Add new car to the garage', async ({ baseURL, login }) => {
        const page = await login;

        const addCar = await apiContext.post(`${baseURL}/api/cars`, {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }
        });

        const responseData = await addCar.json();
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

    test.afterEach(async ({ baseURL }) => {
        const deleteCar = await apiContext.delete(`${baseURL}/api/cars/${carId}`);
        const responseData = await deleteCar.json();
    });
});