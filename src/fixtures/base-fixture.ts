import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import fs from 'fs';

type BaseTestFixtures = {
    loginPage: LoginPage;
};

export const baseTest = test.extend<BaseTestFixtures>({
   /* loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },*/
    page: async ({ page }, use) => {
        const savedStorage = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
        await page.addInitScript(st => {
        console.log('init script is running');
        console.log(window.location.hostname);
        console.log(st);
        
        if (window.location.hostname === 'utility2.intrahealth.com') {
          console.log(Object.entries(st));
            for (const [key, value] of Object.entries(st)) {
            window.sessionStorage.setItem(key, value as string);
          }
        }
      }, savedStorage);
      await page.goto('/1004/hcare/');
      await use(page);
    },
});