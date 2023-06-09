//import { test as setup } from '@playwright/test';
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { STORAGE_STATE } from '../../../playwright.config'; 
import fs from 'fs';


//const authFile = 'user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('MOR', 'MOR');
    await page.waitForURL('https://utility2.intrahealth.com/1004/hcare/#/provider/patients/recent');
  //  await page.context().storageState({ path: STORAGE_STATE });
  await page.waitForTimeout(10000); 
  let sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
 //sessionStorage = (sessionStorage as string).replace(/\\/g, '');//.replace('"{', '{').replace('}"', '}');
  try {
  fs.writeFileSync('session.json', sessionStorage, 'utf-8');
}
catch (e) {
  console.log(e)
}
  });

  /*setup('do login', async ({ page }) => {
    await page.goto('https://en.wikipedia.org');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByPlaceholder('Enter your username').fill('ALN1979');
    await page.getByPlaceholder('Enter your password').fill('Password1*');
    await page.getByRole('button', { name: 'Log in' }).click();
  
    await expect(page.getByRole('button', { name: 'Personal tools' })).toBeVisible();
   // await page.context().storageState({ path: STORAGE_STATE });
  });*/