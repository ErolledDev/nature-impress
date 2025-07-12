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
      <div className="text-center mb-10 sm:mb-14 lg:mb-16 animate-pulse">
        <div className="h-12 sm:h-16 lg:h-20 xl:h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 sm:mb-6 mx-auto max-w-2xl"></div>
        <div className="space-y-3 max-w-4xl mx-auto">
          <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
        </div>
      </div>

      {/* Featured Posts Skeleton */}
      <Loading count={2} aspect="landscape" layout="featured" />

      {/* Recent Posts Grid Skeleton */}
      <Loading count={6} aspect="square" layout="grid" />

      {/* Load More Button Skeleton */}
      <div className="mt-10 sm:mt-12 lg:mt-16 flex justify-center animate-pulse">
        <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Browse Categories Link Skeleton */}
      <div className="mt-6 sm:mt-8 flex justify-center animate-pulse">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

// export const revalidate = 60;