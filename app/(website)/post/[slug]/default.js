'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { parseISO, format } from "date-fns";
import { ShareIcon } from "@heroicons/react/24/outline";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";
import SubscriptionFormComponent from "@/components/SubscriptionFormComponent";
import SocialShareModal from "@/components/SocialShareModal";

// Dynamically import ValineComments, ensuring it's not rendered on the server
const ValineComments = dynamic(() => import("@/components/ValineComments"), {
  ssr: false
});

export default function Post(props) {
  const { loading, post, settings } = props;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Use optional chaining for safe access to post.slug.current
  const slug = post?.slug?.current;

  // Determine post URL:
  // - If on client-side (window is defined), use current window location.
  // - If on server-side, construct URL using NEXT_PUBLIC_SITE_URL or fallback.
  //   Ensure NEXT_PUBLIC_SITE_URL is set in your .env file for client-side access.
  const postUrl = typeof window !== 'undefined'
    ? window.location.href
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://natures-impress.erolledph.workers.dev'}/post/${slug}/`;

  // If not loading and no slug, it means the post was not found.
  if (!loading && !slug) {
    notFound();
  }

  // Render a loading state if data is still being fetched or is not yet available.
  // You can replace this with a more sophisticated skeleton loader.
  if (loading || !post) {
    return (
      <Container className="!pt-10 !pb-10 text-center">
        <p>Loading post...</p>
      </Container>
    );
  }

  // If post data is available, render the full content.
  return (
    <>
      <Container className="!pt-0 !pb-0">
        <article className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="flex justify-center mb-4 sm:mb-6">
            {/* Pass categories with optional chaining for safety */}
            <CategoryLabel categories={post?.categories} />
          </div>

          <header className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
            <h1 className="text-brand-primary mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-white leading-tight">
              {post.title}
            </h1>

            {/* Meta Description */}
            {post.excerpt && (
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Corrected: Removed the redundant nested div that caused the JSX error.
                The 'flex items-center justify-between w-full' div now directly wraps the content. */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex-shrink-0">
                  {/* Use optional chaining for author slug */}
                  <Link href={`/author/${post?.author?.slug?.current}`}>
                    <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-brand-primary hover:bg-brand-secondary flex items-center justify-center transition-colors duration-200">
                      <span className="text-white text-sm sm:text-base lg:text-lg font-bold">
                        {/* Use optional chaining for author name */}
                        {post?.author?.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                    {/* Use optional chaining for author slug */}
                    <Link
                      href={`/author/${post?.author?.slug?.current}`}
                      className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
                      {post.author.name}
                    </Link>
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm lg:text-base">
                    <time
                      className="text-gray-500 dark:text-gray-400"
                      dateTime={post?.publishedAt || post._createdAt}>
                      {format(
                        parseISO(post?.publishedAt || post._createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                    <span className="hidden sm:inline">·</span>
                    <span>{post.estReadingTime || "5"} min read</span>
                  </div>
                </div>
              </div>

              {/* Social Share Button */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 flex-shrink-0 self-center sm:self-auto">
                <ShareIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Share this story</span>
                <span className="sm:hidden">Share</span>
              </button>
            </div>
          </header>
        </article>
      </Container>

      {/* Featured Image */}
      <div className="relative z-0 mx-auto aspect-video max-w-6xl overflow-hidden mb-6 sm:mb-8 lg:mb-12 lg:rounded-xl shadow-lg">
        {post.mainImage?.src && ( // Check if src exists before rendering Image
          <Image
            src={post.mainImage.src}
            alt={post.mainImage?.alt || post.title} // Use optional chaining for alt
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            className="object-cover"
            priority // Sets loading="eager" internally, no need to specify both
          />
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-4xl">
          {/* Article Content */}
          <div className="prose prose-base sm:prose-lg lg:prose-xl mx-auto dark:prose-invert prose-headings:font-serif prose-headings:text-brand-primary dark:prose-headings:text-brand-accent prose-a:text-brand-primary dark:prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md px-4 sm:px-0">
            {post.body && ( // Ensure post.body exists before rendering
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            )}
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 lg:mb-6">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="inline-block bg-gray-100 hover:bg-brand-primary/10 dark:bg-gray-800 dark:hover:bg-brand-accent/10 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-base font-medium transition-colors duration-200">
                    #{tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Home Link */}
          <div className="mb-6 sm:mb-8 mt-8 sm:mt-12 flex justify-center px-4 sm:px-0">
            <Link
              href="/"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full text-sm sm:text-base font-medium transition-colors duration-200">
              ← Back to Nature
            </Link>
          </div>

          {/* Author Card */}
          {post?.author && <AuthorCard author={post.author} />}

          {/* Valine Comments Section - Moved here after Author Card */}
          {/* Render ValineComments only if post.slug.current is available */}
          {post?.slug?.current && <ValineComments postSlug={post.slug.current} />}

          {/* Newsletter Subscription Section */}
          <div className="mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 lg:mb-4">
                Stay Connected with Nature
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                Join our community of nature enthusiasts and receive weekly updates featuring
                the latest wildlife stories, conservation news, and stunning photography from the wild.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Pass settings with optional chaining */}
              <SubscriptionFormComponent settings={settings} />
            </div>
          </div>
        </article>

        {/* Social Share Modal */}
        <SocialShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          postUrl={postUrl}
          postTitle={post.title}
        />
      </Container>
    </>
  );
}