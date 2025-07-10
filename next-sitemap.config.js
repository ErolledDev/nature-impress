/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://mydomain.com",
  generateRobotsTxt: true,
  output: 'export',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: ['/studio', '/studio/*', '/api/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about/'),
    await config.transform(config, '/contact/'),
    await config.transform(config, '/category/'),
    await config.transform(config, '/search/'),
    await config.transform(config, '/privacy-policy/'),
    await config.transform(config, '/terms-of-service/'),
    await config.transform(config, '/disclaimer/'),
    await config.transform(config, '/post/secret-life-forest-ecosystems/'),
    await config.transform(config, '/post/marine-life-conservation-efforts/'),
    await config.transform(config, '/post/bird-migration-climate-change/'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api', '/archive'],
      },
    ],
    additionalSitemaps: [
      'https://mydomain.com/sitemap.xml',
    ],
  },
};