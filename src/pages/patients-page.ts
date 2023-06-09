import { HomePage } from './home-page';
import { Page } from '@playwright/test';
import { ContextMenu } from '../components/context-menu';
import { PatientsListItem } from '../components/patients-list-item';

export class PatientsPage extends HomePage {
    constructor(public page: Page) {
        super(page);
    }

  async clickSearchIcon(): Promise<void> {
    await this.page.getByAltText('search').click({ timeout: 200_000 });
  }

  async fillSearchInput(textToSearch: string): Promise<void> {
    await this.page.getByPlaceholder('Search Patient').fill(textToSearch);
  }

  async searchPatient(textToSearch: string): Promise<void> {
    await this.clickSearchIcon();
    await this.fillSearchInput(textToSearch);
  }

  async clickPatientLink(patientFullName: string): Promise<void> {
    //await this.page.getByText(patientFullName).click();
    await new PatientsListItem(this.page, patientFullName).click();
  }

  async openNewEncounterForListItem(listItem: string): Promise<void> {
    await new PatientsListItem(this.page, listItem).openContextMenu();
    await new ContextMenu(this.page).select('New Encounter');
  }  
 
}