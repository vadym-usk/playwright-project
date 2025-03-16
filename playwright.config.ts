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
    ['html'],
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
      name: 'QA:setup',
      use: {
        baseURL: process.env.BASE_URL_QA,
      },
      testMatch: 'tests/setup/setup.spec.ts'
    },
    {
      name: 'QA:run',
      use: {
        baseURL: process.env.BASE_URL_QA,
        storageState: 'tests/storage/auth.json'
      },
      testIgnore: 'tests/setup/*.spec.ts'
    },
    {
      name: 'PROD:setup',
      use: {
        baseURL: process.env.BASE_URL_PROD,
      },
      testMatch: 'tests/setup/setup.spec.ts'
    },
    {
      name: 'PROD:run',
      use: {
        baseURL: process.env.BASE_URL_PROD,
        storageState: 'tests/storage/auth.json'
      },
      testIgnore: 'tests/setup/*.spec.ts'
    },
    {
      name: 'TEST:setup',
      use: {
        baseURL: process.env.BASE_URL_TEST,
      },
      testMatch: 'tests/setup/setup.spec.ts'
    },
    {
      name: 'TEST:run',
      use: {
        baseURL: process.env.BASE_URL_TEST,
        storageState: 'tests/storage/auth.json'
      },
      testIgnore: 'tests/setup/*.spec.ts'
    }
  ],
});