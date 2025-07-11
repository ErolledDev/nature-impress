'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";
import { getPaginatedPosts, getCategoryBySlug, getAllCategories } from "@/lib/staticData/fetcher";

function CategoryContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const categorySlug = searchParams.get('category');
  const page = searchParams.get('page');
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const currentPageIndex = parseInt(page, 10) || 1;
        setPageIndex(currentPageIndex);

        // Fetch category data if categorySlug exists
        let categoryData = null;
        if (categorySlug) {
          categoryData = await getCategoryBySlug(categorySlug);
          setCategory(categoryData);
        } else {
          setCategory(null);
        }

        // Fetch all categories for the category list
        const allCategories = await getAllCategories();
        setCategories(allCategories);

        // Fetch posts
        const params = {
          pageIndex: (currentPageIndex - 1) * POSTS_PER_PAGE,
          limit: currentPageIndex * POSTS_PER_PAGE,
          categorySlug: categorySlug
        };

        const postsData = await getPaginatedPosts(params);
        setPosts(postsData);

        // Determine pagination state
        setIsFirstPage(currentPageIndex < 2);
        
        let lastPage = postsData.length < POSTS_PER_PAGE;
        if (categorySlug) {
          const allCategoryPosts = await getPaginatedPosts({ 
            pageIndex: 0, 
            limit: 1000,
            categorySlug: categorySlug 
          });
          lastPage = currentPageIndex * POSTS_PER_PAGE >= allCategoryPosts.length;
        }
        setIsLastPage(lastPage);

      } catch (error) {
        console.error('Error fetching category data:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categorySlug, page]);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug mb-4">
          {category ? `${category.title} Stories` : 'Browse by Categories'}
        </h1>
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {category 
              ? `Discover all our ${category.title.toLowerCase()} adventures and insights.`
              : 'Explore our nature stories organized by category. Find content that matches your interests.'
            }
          </p>
        </div>

        {!category && (
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/category?category=${cat.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full text-sm font-medium transition-colors duration-200">
                <span>{cat.title}</span>
                <span className="bg-brand-primary/20 text-xs px-2 py-0.5 rounded-full">
                  {cat.count || 0}
                </span>
              </a>
            ))}
          </div>
        )}

        {category && (
          <div className="text-center mt-4 mb-8">
            <a
              href="/category"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all categories
            </a>
          </div>
        )}
      </div>

      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            {categorySlug ? 'No posts found in this category.' : 'End of the result!'}
          </span>
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>

      {posts.length > 0 && (
        <Pagination
          pageIndex={pageIndex}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          categorySlug={categorySlug}
        />
      )}
    </>
  );
}

export default function CategoryClientContent() {
  return (
    <Suspense fallback={
      <div className="flex h-40 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}