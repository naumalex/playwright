import { test, expect, Page } from '@playwright/test';

export class LoginPage {
    readonly USER_NAME_INPUT_XPATH_LOCATOR = 
      'xpath=//span[text() = "User ID"]/../following-sibling::div/input';
    readonly PASSWORD_INPUT_XPATH_LOCATOR = 
      'xpath=//span[text() = "Password"]/../following-sibling::div/input';
    
    constructor(public page: Page) {
        this.page = page;
      }
    
    async openLoginPage() {
        await this.page.goto('https://utility2.intrahealth.com/1003/hcare/#/login');
    }

    async fillLoginPage(userId, password): Promise<void> {
        let userIdInput = 
          await this.page.locator(this.USER_NAME_INPUT_XPATH_LOCATOR).fill(userId);
        let passwordInput = 
          await this.page.locator(this.PASSWORD_INPUT_XPATH_LOCATOR).fill(password);
    }

    async clickLogInButton(): Promise<void> {
        await this.page.getByText('Log In', { exact: true }).click();
    }

    async login(userId, password): Promise<void> {
        await this.openLoginPage();
        await this.fillLoginPage(userId, password);
        await this.clickLogInButton();
    } 
}