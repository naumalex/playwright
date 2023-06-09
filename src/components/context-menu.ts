import { locatorTemplateFormat } from '../utils/locator';
import { Page, Locator } from '@playwright/test';

export class ContextMenu {
    page: Page;
    locator: Locator;
    
    constructor(page: Page) {
        this.page = page;
    }

    async select(optionToSelect: string) {
        /*let selector = locatorTemplateFormat(
            'this.page.getByText("{menuOption}", { exact: true })', { menuOption: optionToSelect });*/
        let locator = this.page.getByText(optionToSelect, { exact: true });
        await locator.click();
    }
}

