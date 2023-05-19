import { LocatorContext } from '../types/locator';
export const locatorTemplateFormat = (locator: string, { ...context }: LocatorContext): string => {
    let template = locator;
    for (const [key, value] of Object.entries(context)) {
      template = template.replace(`{${key}}`, value.toString());
    }
    return template;
  };