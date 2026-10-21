import { Before, After, BeforeAll, AfterAll, setWorldConstructor, World, setDefaultTimeout } from '@cucumber/cucumber';
import { type ChromiumBrowser, type Page, chromium } from 'playwright';

// Set default step/hook timeout to 20 seconds (20000ms)
setDefaultTimeout(20000);

export class CustomWorld extends World {
  browser!: ChromiumBrowser;
  page!: Page;
}

setWorldConstructor(CustomWorld);

let browser: ChromiumBrowser | undefined;

BeforeAll({ timeout: 20000 }, async () => {
  // Launch Chromium with explicit timeout allowance
  browser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
  // Safely close browser instance if initialized
  if (browser) {
    await browser.close();
  }
});

Before(async function (this: CustomWorld) {
  if (!browser) {
    throw new Error('Chromium browser failed to initialize in BeforeAll hook.');
  }
  const context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
});