import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-6 md:gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            "overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800"
          )}>
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug?.current || post.slug
            }`}>
            {post.mainImage?.src ? (
              <Image
                src={post.mainImage.src}
                alt={post.mainImage.alt || post.title}
                priority={preloadImage ? true : false}
                className="object-cover transition-all duration-300"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={cx("mt-4 sm:mt-6", minimal && "mt-0 flex items-center")}>
          <div>
            <CategoryLabel
              categories={post.categories}
              nomargin={minimal}
            />
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-xl sm:text-2xl"
                  : minimal
                  ? "text-2xl sm:text-3xl"
                  : "text-lg sm:text-xl",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2 sm:mt-3 dark:text-white"
              )}>
              <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug?.current || post.slug
                }`}>
                <span
                  className="bg-gradient-to-r from-brand-secondary/30 to-brand-accent/20 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-300
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-brand-primary/40 dark:to-brand-accent/30">
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/post/${
                      pathPrefix ? `${pathPrefix}/` : ""
                    }${post.slug?.current || post.slug}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-500 dark:text-gray-400">
              <Link href={`/author/${post?.author?.slug?.current}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-brand-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {post?.author?.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                  </div>
                  <span className="truncate text-xs sm:text-sm hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
                    {post?.author?.name}
                  </span>
                </div>
              </Link>
              <span className="hidden sm:inline text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="truncate text-xs sm:text-sm"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}