import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  try {
    return {
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);
    const fallback = locale === 'ar' ? 'en' : 'ar';
    return {
      messages: (await import(`./messages/${fallback}.json`)).default
    };
  }
});
