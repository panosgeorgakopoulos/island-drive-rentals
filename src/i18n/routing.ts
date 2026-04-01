import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'el', 'fr', 'it', 'es', 'de', 'sv', 'no'],
  defaultLocale: 'en'
});
