import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME as string,
      password: process.env.HTTP_CREDENTIALS_PASSWORD as string,
    },
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'TEST:setup',
      testMatch: 'tests/e2e/setup/setup.spec.ts'
    },
    {
      name: 'TEST:run:auth',
      testMatch: 'tests/e2e/auth/*.spec.ts'
    },
    {
      name: 'TEST:run:base',
      use: {
        storageState: 'tests/storage/auth.json'
      },
      testIgnore: [
        'tests/e2e/setup/*.spec.ts',
        'tests/e2e/auth/*.spec.ts'
      ]
    }
  ],
});