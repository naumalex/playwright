import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PatientsPage } from '../pages/patients-page';


type SearchParameters = {
    textToSearch: string;
    patientFullNameToOpen: string;
};


type PatientsPageTestsFixtures = {
    loginPage: LoginPage;
    patientsPage: PatientsPage;
    SearchParameters: SearchParameters;
};

export const test = base.extend<PatientsPageTestsFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    patientsPage: async ({ page }, use) => {
        await use(new PatientsPage(page));
    },

    SearchParameters: {
        textToSearch: 'as',
        patientFullNameToOpen: 'Gump Forrest Alexander'
    }
});

test.beforeEach(async ({ loginPage }) => {
    await loginPage.login('MOR', 'MOR');
  });

test('search patient', async ({ patientsPage, page }) => {
    await patientsPage.clickSearchIcon();
    
});