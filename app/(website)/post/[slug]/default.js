import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";

export default function Post(props) {
  const { loading, post } = props;

  const slug = post?.slug?.current;

  if (!loading && !slug) {
    notFound();
  }

  return (
    <>
      <Container className="!pt-0 !pb-0">
        <article className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>

          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-brand-primary mb-6 mt-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <Link href={`/author/${post.author.slug.current}`}>
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-brand-primary hover:bg-brand-secondary flex items-center justify-center transition-colors duration-200">
                      <span className="text-white text-sm sm:text-base font-bold">
                        {post?.author?.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-800 dark:text-gray-300 font-medium">
                    <Link 
                      href={`/author/${post.author.slug.current}`}
                      className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
                      {post.author.name}
                    </Link>
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
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
            </div>
          </header>
        </article>
      </Container>

      {/* Featured Image */}
      <div className="relative z-0 mx-auto aspect-video max-w-6xl overflow-hidden mb-8 sm:mb-12 lg:rounded-xl shadow-lg">
        {post.mainImage?.src && (
          <Image
            src={post.mainImage.src}
            alt={post.mainImage?.alt || post.title}
            loading="eager"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-4xl">
          {/* Article Content */}
          <div className="prose prose-lg sm:prose-xl mx-auto dark:prose-invert prose-headings:font-serif prose-headings:text-brand-primary dark:prose-headings:text-brand-accent prose-a:text-brand-primary dark:prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md">
            {post.body && (
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            )}
          </div>

          {/* Back to Home Link */}
          <div className="mb-8 mt-12 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full font-medium transition-colors duration-200">
              ← Back to Nature
            </Link>
          </div>

          {/* Author Card */}
          {post.author && <AuthorCard author={post.author} />}
        </article>
      </Container>
    </>
  );
}
