import { Page } from '@playwright/test';

export class BaseModal {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
  
    async getTitle(): Promise<string | null> {
        let title = await this.page.locator('.modal .title').textContent();
        return title;
    }
  }