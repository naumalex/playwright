import { BasePage } from './base-page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
    
    constructor(public page: Page) {
        super(page);
    }

    getTitleSelector() {
        return '.app-content .title';
    }
}