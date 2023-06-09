import { locatorTemplateFormat } from '../utils/locator';
import { Page, Locator } from '@playwright/test';
import { PatientBuilder } from '../data-factory/patient-object-factory';

export class PatientsListItem {
    readonly LOCATOR_TEMPLATE = '//span[text() = "{item}"]//ancestor::div[@class = "patient-info"]';
    itemText: string;
    page: Page;


    constructor(page: Page, itemText: string) {
        this.page = page;
        this.itemText = itemText;
    }

    getOpenContextMenuButtonLocator(): Locator {
        let selector = this.LOCATOR_TEMPLATE + '//following-sibling::div';
        return this.page.locator(locatorTemplateFormat(selector, { item: this.itemText }));
    }

    async openContextMenu(): Promise<void> {
        await this.getOpenContextMenuButtonLocator().click();
    }

    getLocator(): Locator {
        return this.page.locator(
            locatorTemplateFormat(this.LOCATOR_TEMPLATE, { item: this.itemText }));
    }

    async click(): Promise<void> {
        await this.getLocator().click();
    }

    async get() {
        let fullName = await this.page.locator(
            locatorTemplateFormat(this.LOCATOR_TEMPLATE + '//span[@class = "display-name"]',
                { item: this.itemText })).first().textContent();
        let demographicsData = await this.page.locator(
            locatorTemplateFormat(this.LOCATOR_TEMPLATE + '//span[@class = "demographic-info"]',
                { item: this.itemText })).first().textContent();

        let patientAge = demographicsData?.split(';')[0].trim();
        let gender = demographicsData?.split(';')[1].trim();

       /* return {
            fullName: fullName, age: demographicsData?.split(';')[0].trim(),
            gender: demographicsData?.split(';')[1].trim()
        };*/
        return new PatientBuilder().fullName(fullName!).age(patientAge!).gender(gender!).build();
    }
}

