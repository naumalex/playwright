import { PatientsPage } from '../pages/patients-page';
import { baseTest } from '../fixtures/base-fixture';
import { expect } from '@playwright/test';
import { PatientsListItem } from '../components/patients-list-item';
import { patientData } from '../data-factory/patient-object-factory';
import { NewEncounterModal } from '../modals/new-encounter-modal';

type SearchParameters = {
    textToSearch: string;
    patientFullNameToOpen: string;
};

type PatientsPageTestsFixtures = {
    patientsPage: PatientsPage;
    searchParameters: SearchParameters;
    indexOfSearchParameter: number;
   // newEncounterModal: NewEncounterModal;
};

export const test = baseTest.extend<PatientsPageTestsFixtures>({
    patientsPage: async ({ page }, use) => {
        await use(new PatientsPage(page));
    },
   /* newEncounterModal: async ({ page }, use) => {
        await use(new NewEncounterModal(page));
    }*/
});

const searchParameters = [
    {
        textToSearch: patientData[0].lastName.substring(0, 3),
        patientFullNameToOpen: patientData[0].fullName,
        testDescription: 'by last name using first 3 characters'
    },
    {
        textToSearch: ',' + patientData[1].firstName.substring(0, 4),
        patientFullNameToOpen: patientData[1].fullName,
        testDescription: 'by first name using first 4 characters'
    },];

searchParameters.forEach((param, i) => {
    test.use({ searchParameters: param, indexOfSearchParameter: i });

    test(`search patient ${param.testDescription} param = ${param.textToSearch}`,
        async ({ patientsPage, searchParameters, page, indexOfSearchParameter }) => {
            await patientsPage.clickSearchIcon();
            await patientsPage.fillSearchInput(searchParameters.textToSearch);
            let displayedPatientData = await (new PatientsListItem(page,
                searchParameters.patientFullNameToOpen).get());
            expect(displayedPatientData)
                .toMatchObject(patientData[indexOfSearchParameter]);
            await patientsPage.clickPatientLink(
                searchParameters.patientFullNameToOpen);
            await expect(page.locator(patientsPage.getTitleSelector()))
                .toHaveText('Appointments');
        });
})

test.use({ searchParameters: searchParameters[1] });
test('Open New Encounter',
    async ({ patientsPage, searchParameters, page/*, newEncounterModal */}) => {
        await patientsPage.clickSearchIcon();
        await patientsPage.fillSearchInput(searchParameters.textToSearch);
        await expect(new PatientsListItem(
            page, searchParameters.patientFullNameToOpen).getLocator())
            .toBeVisible();
        await patientsPage.openNewEncounterForListItem(
            searchParameters.patientFullNameToOpen);
       // expect((await newEncounterModal.getTitle()) === 'New Encounter');
    }) 