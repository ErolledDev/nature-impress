import { getAllPosts } from '@/lib/staticData/fetcher';

export async function GET() {
  try {
    const posts = await getAllPosts();
    // Remove trailing slash from siteUrl to prevent double slashes
    const siteUrl = (process.env.SITE_URL || 'https://mydomain.com').replace(/\/$/, '');
    
    const rssItems = posts.slice(0, 20).map(post => {
      const postUrl = `${siteUrl}/post/${post.slug.current}/`;
      const pubDate = new Date(post.publishedAt || post._createdAt).toUTCString();
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt || 'Discover the beauty and wonder of the natural world through this captivating nature story.'}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[hello@mydomain.com (${post.author.name})]]></author>
      ${post.categories.map(cat => `<category><![CDATA[${cat.title}]]></category>`).join('')}
      ${post.mainImage?.src ? `<enclosure url="${post.mainImage.src}" type="image/jpeg" />` : ''}
    </item>`;
    }).join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[Nature's Whispers - Exploring the Wild]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology.]]></description>
    <language>en-US</language>
    <managingEditor><![CDATA[hello@mydomain.com (Nature Explorer)]]></managingEditor>
    <webMaster><![CDATA[hello@mydomain.com (Nature Explorer)]]></webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss/" rel="self" type="application/rss+xml" />
    <image>
      <url>https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=144&amp;h=144&amp;fit=crop</url>
      <title><![CDATA[Nature's Whispers]]></title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    // RSS feed generation failed, returning error response
    return new Response('Error generating RSS feed', { status: 500 });
  }
}