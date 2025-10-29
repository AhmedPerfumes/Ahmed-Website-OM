import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
 
  try {
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);
    const fallback = locale === 'ar' ? 'en' : 'ar';
    return {
      locale,
      messages: (await import(`../messages/${fallback}.json`)).default
    };
  }
});
