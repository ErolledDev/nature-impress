'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";
import { getPaginatedPosts, getCategoryBySlug, getAllCategories, getPostsByCategory } from "@/lib/staticData/fetcher";

function CategoryContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  const categorySlug = searchParams.get('category');
  const page = searchParams.get('page');
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const currentPageIndex = parseInt(page, 10) || 1;
        setPageIndex(currentPageIndex);

        // Fetch all categories for the category list
        const allCategories = await getAllCategories();
        setCategories(allCategories);

        // Fetch category data and posts if categorySlug exists
        let categoryData = null;
        let postsData = [];
        let allCategoryPosts = [];
        
        if (categorySlug) {
          // Try to find category by slug first, then by title
          categoryData = await getCategoryBySlug(categorySlug);
          if (!categoryData) {
            // If not found by slug, try to find by matching title
            const foundCategory = allCategories.find(cat => 
              cat.title.toLowerCase().replace(/\s+/g, '-') === categorySlug
            );
            if (foundCategory) {
              categoryData = foundCategory;
            }
          }
          setCategory(categoryData);
          
          // Get all posts for this category to calculate pagination
          allCategoryPosts = await getPostsByCategory(categorySlug);
          setTotalPosts(allCategoryPosts.length);
          
          // Get paginated posts for current page
          const startIndex = (currentPageIndex - 1) * POSTS_PER_PAGE;
          postsData = allCategoryPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
        } else {
          setCategory(null);
          // If no category, get all posts with pagination
          const params = {
            pageIndex: (currentPageIndex - 1) * POSTS_PER_PAGE,
            limit: currentPageIndex * POSTS_PER_PAGE,
            categorySlug: null
          };
          postsData = await getPaginatedPosts(params);
          setTotalPosts(postsData.length);
        }

        setPosts(postsData);

        // Determine pagination state
        setIsFirstPage(currentPageIndex < 2);
        
        // Calculate if this is the last page
        let lastPage;
        if (categorySlug && allCategoryPosts.length > 0) {
          lastPage = currentPageIndex * POSTS_PER_PAGE >= allCategoryPosts.length;
        } else {
          lastPage = postsData.length < POSTS_PER_PAGE;
        }
        setIsLastPage(lastPage);

      } catch (error) {
        console.error('Error fetching category data:', error);
        setPosts([]);
        setTotalPosts(0);
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
              ? `Discover all our ${category.title.toLowerCase()} adventures and insights. (${totalPosts} ${totalPosts === 1 ? 'story' : 'stories'} found)`
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

      {posts && posts?.length === 0 && !loading && (
        <div className="flex h-40 items-center justify-center">
          <div className="text-center">
            <span className="text-lg text-gray-500 block mb-4">
              {categorySlug ? `No posts found in the "${category?.title || categorySlug}" category.` : 'No posts found.'}
            </span>
            {categorySlug && (
              <a
                href="/category"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full text-sm font-medium transition-colors duration-200">
                Browse all categories
              </a>
            )}
          </div>
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {posts.map(post => (
            <PostList key={post._id} post={post} aspect="square" />
          ))}
        </div>
      )}

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
