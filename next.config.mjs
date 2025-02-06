import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'phpstack-1406565-5228144.cloudwaysapps.com',
          },
          {
            protocol: 'https',
            hostname: 'adminom.ahmedalmaghribi.com',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
          }
        ],
      },
      productionBrowserSourceMaps: true,
      // basePath: '/om'
};

export default withNextIntl(nextConfig);
