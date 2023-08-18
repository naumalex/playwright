import { BasePage } from "../pages/base-page";
import { Page } from '@playwright/test';
import { BaseModal } from "./base-modal";

export class NewEncounterModal extends BaseModal {
    constructor(public page: Page) {
        super(page);
    }

    
}