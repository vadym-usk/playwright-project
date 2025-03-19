import { test } from '../fixtures/fixtures';

test.describe('Positive Tests', () => {
    test('Check the empty Garage page for logged-in user', async ({ userGaragePage }) => {
        await userGaragePage.goto();
        await userGaragePage.assertEmptyGarageList();
    });
});