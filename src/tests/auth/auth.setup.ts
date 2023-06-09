import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import fs from 'fs';


setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('MOR', 'MOR');
  await page.waitForTimeout(10000);
  let sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync('session.json', sessionStorage, 'utf-8');
});
