import { getAllPostsSlugs } from '@/lib/staticData/fetcher';

export async function GET() {
  try {
    // Remove trailing slash from siteUrl to prevent double slashes
    const siteUrl = (process.env.SITE_URL || 'https://mydomain.com').replace(/\/$/, '');
    
    // Static pages
    const staticPages = [
      '',
      '/about/',
      '/contact/',
      '/category/',
      '/search/',
      '/privacy-policy/',
      '/terms-of-service/',
      '/disclaimer/',
    ];

    // Get all post slugs
    let postSlugs = [];
    try {
      const slugs = await getAllPostsSlugs();
      postSlugs = slugs.map(({ slug }) => `/post/${slug}/`);
    } catch (error) {
      console.warn('Could not fetch post slugs for sitemap:', error.message);
    }

    // Combine all URLs
    const allUrls = [...staticPages, ...postSlugs];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '' ? '1.0' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}