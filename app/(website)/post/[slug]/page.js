import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/staticData/fetcher";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Nature\'s Whispers',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Discover ${post.title} - A captivating nature story from Nature's Whispers exploring the beauty and wonder of the natural world.`,
    keywords: [
      ...(post.categories?.map(cat => cat.title) || []),
      'nature', 'wildlife', 'environment', 'conservation'
    ],
    authors: [{ name: post.author?.name || 'Nature Explorer' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Discover ${post.title} - A captivating nature story from Nature's Whispers.`,
      type: 'article',
      publishedTime: post.publishedAt || post._createdAt,
      authors: [post.author?.name || 'Nature Explorer'],
      images: post.mainImage?.src ? [
        {
          url: post.mainImage.src,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Discover ${post.title} - A captivating nature story.`,
      images: post.mainImage?.src ? [post.mainImage.src] : [],
    },
    alternates: {
      canonical: `/post/${params.slug}`,
    },
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

// export const revalidate = 60;
