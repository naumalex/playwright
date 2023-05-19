import { HomePage } from './home-page';
import { Page } from '@playwright/test';

export class PatientsPage extends HomePage {
    constructor(public page: Page) {
        super(page);
    }

  async clickSearchIcon(): Promise<void> {
    await this.page.getByAltText('search').click();
  }

  async fillSearchInput(textToSearch: string): Promise<void> {
    await this.page.getByPlaceholder('Search Patient').fill(textToSearch);
  }

  async searchPatient(textToSearch: string): Promise<void> {
    await this.clickSearchIcon();
    await this.fillSearchInput(textToSearch);
  }

  async clickPatientLink(patientFullName: string): Promise<void> {
    await this.page.getByText(patientFullName).click();
  }
 
}