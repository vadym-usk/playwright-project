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
  reporter: 'html',
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
      name: 'QA',
      use: {
        baseURL: process.env.BASE_URL_QA
      },
    },
    {
      name: 'PROD',
      use: {
        baseURL: process.env.BASE_URL_PROD
      },
    },
    {
      name: 'TEST',
      use: {
        baseURL: process.env.BASE_URL_TEST
      }
    }
  ],
});