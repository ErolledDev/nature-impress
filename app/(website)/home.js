"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Post({ posts }) {
  const [displayLimit, setDisplayLimit] = useState(14);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayLimit(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const hasMorePosts = posts && posts.length > displayLimit;
  const displayedPosts = posts ? posts.slice(0, displayLimit) : [];

  return (
    <>
      {displayedPosts && displayedPosts.length > 0 && (
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-primary dark:text-brand-accent mb-4 sm:mb-6 leading-tight">
              Nature's Whispers
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology.
            </p>
          </div>

          {/* Featured Posts */}
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-12 sm:mb-16">
            {displayedPosts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
                fontSize="large"
              />
            ))}
          </div>

          {/* Recent Posts Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {displayedPosts.slice(2).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="mt-12 sm:mt-16 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/20 bg-white hover:bg-brand-primary/5 px-6 py-3 text-base font-medium text-brand-primary hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 dark:border-brand-accent/20 dark:bg-gray-800 dark:text-brand-accent dark:hover:bg-brand-accent/5 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Posts</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Browse Categories Link */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/category"
              className="text-sm text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors duration-200">
              Browse by Categories →
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
