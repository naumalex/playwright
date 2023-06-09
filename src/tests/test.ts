import { test as base, expect } from '@playwright/test';
import { PatientsPage } from '../pages/patients-page';
import fs from 'fs';

/*const test = base.extend({
    // override `context` fixture to add init script
    page: async ({ context}, use) => {
        const sessionStorage = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
        await context.addInitScript(storage => {
            if (window.location.hostname === 'example.com') {
              for (const [key, value] of Object.entries(storage)) {
                window.sessionStorage.setItem(key, value as string);
              }
            }
          }, sessionStorage);
    const newPage = await context.newPage();
    await use(newPage) 
    },
  });*/

  const test = base.extend({
    // override `context` fixture to add init script
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

base.beforeEach(async ({ page}) => {
   /* const savedStorage = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
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
      }, savedStorage);   */
   await page.goto('/1004/hcare/');
  });

  test('logs user out', async ({ page }) => {
    await expect(page.locator(new PatientsPage(page).getTitleSelector()))
    .toHaveText('Patients', { timeout: 200_000 });
  })