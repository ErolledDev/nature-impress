import { Suspense } from "react";
import HomePage from "./home";
import { getAllPosts } from "@/lib/staticData/fetcher";
import Loading from "@/components/loading";

export default async function IndexPage() {
  const posts = await getAllPosts();
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage posts={posts} />
    </Suspense>
  );
}

function HomePageSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-screen-lg py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-primary dark:text-brand-accent mb-4 sm:mb-6 leading-tight min-h-[3rem] sm:min-h-[4rem] lg:min-h-[5rem] xl:min-h-[6rem]">
          Nature&apos;s Whispers
        </h1>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed px-4 min-h-[2rem] sm:min-h-[2.5rem] lg:min-h-[3rem]">
          Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology.
        </p>
      </div>

      {/* Featured Posts Skeleton */}
      <Loading count={2} aspect="landscape" layout="featured" />

      {/* Recent Posts Grid Skeleton */}
      <Loading count={6} aspect="square" layout="grid" />

      {/* Load More Button Skeleton */}
      <div className="mt-10 sm:mt-12 lg:mt-16 flex justify-center">
        <button
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/20 bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-brand-primary opacity-0 cursor-default transition-all duration-200 dark:border-brand-accent/20 dark:bg-gray-800 dark:text-brand-accent">
          <span>Load More Posts</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Browse Categories Link Skeleton */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 opacity-0 cursor-default">
          Browse by Categories →
        </span>
      </div>
    </div>
  );
}

// export const revalidate = 60;