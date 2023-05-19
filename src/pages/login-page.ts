import { Page } from '@playwright/test';
import { locatorTemplateFormat } from '../utils/locator';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    readonly URL = 'https://utility2.intrahealth.com/1004/hcare/#/login';
    readonly INPUT_XPATH_LOCATOR_TEMPLATE =
        'xpath=//span[text() = {label}]/../following-sibling::div/input';
    /* readonly PASSWORD_INPUT_XPATH_LOCATOR = 
       'xpath=//span[text() = "Password"]/../following-sibling::div/input';*/
/* readonly PASSWORD_INPUT_XPATH_LOCATOR = 
       'xpath=//span[text() = "User ID"]/../following-sibling::div/input';*/ 

    constructor(public page: Page) {
        super(page);
    }

    async openLoginPage() {
        //await this.page.goto('https://utility2.intrahealth.com/1004/hcare/#/login');
        await this.open(this.URL);
    }

    async fillLoginPage(userId, password): Promise<void> {
        let userIdInputLocator = locatorTemplateFormat(
            this.INPUT_XPATH_LOCATOR_TEMPLATE, { label: '"User ID"' });
        await this.page.locator(userIdInputLocator).fill(userId);
        let passwordInputLocator = locatorTemplateFormat(
            this.INPUT_XPATH_LOCATOR_TEMPLATE, { label: '"Password"' });
        let passwordInput =
            await this.page.locator(passwordInputLocator).fill(password);
    }

    async clickLogInButton(): Promise<void> {
        await this.page.getByText('Log In', { exact: true }).click({timeout: 200_000});
    }

    async login(userId, password): Promise<void> {
        await this.openLoginPage();
        await this.fillLoginPage(userId, password);
        await this.clickLogInButton();
    }
}