// @ts-check
const { test, expect } = require('@playwright/test');
const { Eyes, Target, Configuration, BatchInfo, VisualGridRunner } = require('@applitools/eyes-playwright');

test.describe('Visual testing to Facebook login page', () => {
  const runner = new VisualGridRunner({ testConcurrency: 1 });
  const batch = new BatchInfo({ name: 'Facebook login page' });
  const config = new Configuration();
  config.setBatch(batch);
  config.setApiKey('<your_api_key>');
  const eyes = new Eyes(runner, config);
  const language = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  };

  test.beforeEach(async ({ page }) => {
    await eyes.open(page, 'Facebook', test.info().title);
  });

  test('login page in different languages', async ({ page }) => {
    const selectedLanguage = language.fr;
    await page.goto('https://www.facebook.com/');
    await page.getByRole('listitem').filter({ hasText: selectedLanguage })
      .click();
    await expect(page.getByRole('listitem').nth(0)).toContainText(selectedLanguage);
    await eyes.check('Login page in different languages', Target.window().fully());
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  })

  test.afterAll(async () => {
    const results = await runner.getAllTestResults();
    console.log('Visual test results: ', results);
  })
})

