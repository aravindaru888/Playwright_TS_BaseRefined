import { defineConfig, devices } from '@playwright/test';
import { env } from './config/environment';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 4 : undefined,
  timeout: 60_000,
  expect: {
    timeout: env.expectTimeout
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['blob', { outputDir: 'reports/blob' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }]
  ],
  outputDir: 'reports/artifacts',
  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json'
      },
      dependencies: ['setup']
    }
  ]
});
