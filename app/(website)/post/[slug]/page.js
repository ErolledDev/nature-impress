import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/staticData/fetcher";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Nature&apos;s Whispers',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Explore the fascinating world of ${post.categories?.[0]?.title?.toLowerCase() || 'nature'} in this detailed story about ${post.title}. Discover wildlife behaviors, conservation insights, and stunning natural photography from Nature&apos;s Whispers.`,
    keywords: [
      ...(post.categories?.map(cat => cat.title) || []),
      'nature blog', 'wildlife photography', 'environmental conservation', 'nature stories'
    ],
    authors: [{ name: post.author?.name || 'Nature Explorer' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Explore the fascinating world of ${post.categories?.[0]?.title?.toLowerCase() || 'nature'} in this detailed story from Nature&apos;s Whispers.`,
      type: 'article',
      publishedTime: post.publishedAt || post._createdAt,
      authors: [post.author?.name || 'Nature Explorer'],
      images: post.mainImage?.src ? [
        {
          url: post.mainImage.src,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || `${post.title} - Nature photography from Nature's Whispers`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Explore ${post.categories?.[0]?.title?.toLowerCase() || 'nature'} stories and wildlife photography.`,
      images: post.mainImage?.src ? [post.mainImage.src] : [],
    },
    alternates: {
      canonical: (process.env.SITE_URL || "https://mydomain.com") + `/post/${params.slug}/`,
    },
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

// export const revalidate = 60;
