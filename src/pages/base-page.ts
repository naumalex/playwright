import { Page } from '@playwright/test';

export class BasePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
  
    async open(url: string): Promise<void> {
        await this.page.goto(url, { timeout: 200_000 });
    }
  
    async reload(): Promise<void> {
      const currentUrl = this.page.url();
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }
  }
