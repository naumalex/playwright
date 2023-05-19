import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PatientsPage } from '../pages/patients-page';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('MOR', 'MOR');
  await expect(page.locator(new PatientsPage(page).getTitleSelector()))
  .toHaveText('Patients', { timeout: 200_000 });
  });