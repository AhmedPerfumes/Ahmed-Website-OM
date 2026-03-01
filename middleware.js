// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar|en)/:path*']
// };


import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing, {
  localeDetection: false   // ★ IMPORTANT ★
});

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api/|_next/static|_next/image|favicon.ico|assets).*)'
  ]
};
