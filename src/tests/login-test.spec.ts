import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('successlogin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('MOR', 'MOR');
  });