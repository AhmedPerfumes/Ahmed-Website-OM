import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  localeDetection: false, // optional: always Arabic by default
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
