/** @type {import('next-sitemap').IConfig} */
const { getAllPostsSlugs } = require('./lib/staticData/fetcher');

module.exports = {
  siteUrl: process.env.SITE_URL || "https://natures-impress.erolledph.workers.dev",
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: ['/studio', '/studio/*', '/api/*'],
  additionalPaths: async (config) => {
    const staticPaths = [
      await config.transform(config, '/'),
      await config.transform(config, '/about/'),
      await config.transform(config, '/contact/'),
      await config.transform(config, '/category/'),
      await config.transform(config, '/search/'),
      await config.transform(config, '/privacy-policy/'),
      await config.transform(config, '/terms-of-service/'),
      await config.transform(config, '/disclaimer/'),
    ];

    // Add all post pages dynamically
    try {
      const postSlugs = await getAllPostsSlugs();
      const postPaths = await Promise.all(
        postSlugs.map(({ slug }) => 
          config.transform(config, `/post/${slug}/`)
        )
      );
      return [...staticPaths, ...postPaths];
    } catch (error) {
      console.warn('Could not fetch post slugs for sitemap:', error.message);
      return staticPaths;
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api', '/archive'],
      },
    ],
    additionalSitemaps: [
      (process.env.SITE_URL || 'https://natures-impress.erolledph.workers.dev') + '/sitemap.xml',
      (process.env.SITE_URL || 'https://natures-impress.erolledph.workers.dev') + '/api/rss/',
    ],
  },
};