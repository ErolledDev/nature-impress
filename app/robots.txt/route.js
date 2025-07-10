export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://mydomain.com';
  
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /studio
Disallow: /api

# Crawl-delay
Crawl-delay: 1

# Host
Host: ${siteUrl}

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/api/rss/`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}