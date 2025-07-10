import { Suspense } from "react";
import Container from "@/components/container";
import Category from "./category";
import Loading from "@/components/loading";
import { getCategoryBySlug, getAllCategories } from "@/lib/staticData/fetcher";

export default async function CategoryPage({ searchParams }) {
  const category = searchParams.category 
    ? await getCategoryBySlug(searchParams.category)
    : null;
  
  const categories = await getAllCategories();

  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug mb-4">
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

        <Suspense
          key={searchParams.page || "1"}
          fallback={<Loading />}>
          <Category searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}