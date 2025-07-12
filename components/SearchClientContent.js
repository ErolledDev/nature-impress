'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PostList from "@/components/postlist";
import Loading from "@/components/loading";
import { searchPosts } from "@/lib/staticData/fetcher";

function SearchContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    
    if (q) {
      setLoading(true);
      searchPosts(q).then(results => {
        setPosts(results);
        setLoading(false);
      }).catch(() => {
        setPosts([]);
        setLoading(false);
      });
    } else {
      setPosts([]);
    }
  }, [searchParams]);

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug mb-4">
          {query ? (
            <>
              Search Results for <span>&quot;{query}&quot;</span>
            </>
          ) : (
            'Search Nature Stories'
          )}
        </h1>
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {query ? (
              <>
                Found {posts.length} {posts.length === 1 ? 'story' : 'stories'} matching your search.
              </>
            ) : (
              'Enter a search term to find nature stories, wildlife adventures, and conservation insights.'
            )}
          </p>
        </div>
      </div>

      {query && (
        <>
          {loading ? (
            <div>
              {/* Search Results Header Skeleton */}
              <div className="text-center mb-8 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto max-w-sm mb-4"></div>
              </div>
              <Loading count={6} aspect="square" layout="grid" />
            </div>
          ) : (
            <SearchResults posts={posts} query={query} />
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <form action="/search" method="GET" className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for nature stories..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:border-brand-accent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-md text-sm font-medium transition-colors duration-200">
                  Search
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try searching for <span>&quot;wildlife&quot;</span>, <span>&quot;conservation&quot;</span>, <span>&quot;forest&quot;</span>, or any nature topic that interests you.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function SearchResults({ posts, query }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            No stories found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn&apos;t find any nature stories matching <span>&quot;{query}&quot;</span>. Try different keywords or browse our categories.
          </p>
          <div className="space-y-3">
            <a
              href="/category"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-medium rounded-lg transition-colors duration-200">
              Browse Categories
            </a>
            <div>
              <a
                href="/"
                className="text-sm text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors duration-200">
                &larr; Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a
          href="/category"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors duration-200">
          Browse all categories &rarr;
        </a>
      </div>
    </>
  );
}

export default function SearchClientContent() {
  return (
    <Suspense fallback={
      <div className="mt-10">
        <Loading />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
