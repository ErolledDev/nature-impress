import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";

import { getPaginatedPosts } from "@/lib/staticData/fetcher";

export default async function Post({ searchParams }) {
  // Fetch the current page from the query parameters, defaulting to 1 if it doesn't exist
  const page = searchParams.page;
  const categorySlug = searchParams.category;
  const pageIndex = parseInt(page, 10) || 1;

  // Set the number of posts to be displayed per page
  const POSTS_PER_PAGE = 6;

  // Define the parameters for fetching posts based on the current page
  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE,
    categorySlug: categorySlug
  };

  const posts = await getPaginatedPosts(params);

  // Check if the current page is the first or the last
  const isFirstPage = pageIndex < 2;
  
  // For category filtering, we need to check against the total filtered posts
  let isLastPage = posts.length < POSTS_PER_PAGE;
  if (categorySlug) {
    // Get all posts for this category to determine if we're on the last page
    const allCategoryPosts = await getPaginatedPosts({ 
      pageIndex: 0, 
      limit: 1000, // Get all posts
      categorySlug: categorySlug 
    });
    isLastPage = pageIndex * POSTS_PER_PAGE >= allCategoryPosts.length;
  }

  return (
    <>
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

      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        categorySlug={categorySlug}
      />
    </>
  );
}
