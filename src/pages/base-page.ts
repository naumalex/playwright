import { test, Page } from '@playwright/test';

export class BasePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
  
    async open(url: string): Promise<void> {
      await test.step(`Opening the url "${url}"`, async () => {
        await this.page.goto(url);
      });
    }
  
    async reload(): Promise<void> {
      const currentUrl = this.page.url();
  
      await test.step(`Reloading page with url "${currentUrl}"`, async () => {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
      });
    }
  }
