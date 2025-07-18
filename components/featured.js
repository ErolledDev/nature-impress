import Image from "next/image";
import { parseISO, format } from "date-fns";
import { cx } from "@/utils/all";
import Link from "next/link";

export default function Featured({ post, pathPrefix }) {
  return (
    <div
      className={cx(
        "grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 min-h-[60vh] lg:min-h-[calc(100vh-30vh)]"
      )}
      style={{
        backgroundColor: "#1a5f3f"
      }}>
      {post.mainImage?.src && (
        <div className="relative aspect-video lg:aspect-auto">
          <Link
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug?.current || post.slug
            }`}>
            <Image
              src={post.mainImage.src}
              alt={post.mainImage?.alt || post.title}
              priority
              loading="eager"
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </Link>
        </div>
      )}

      <div className="self-center px-6 py-8 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <Link
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug?.current || post.slug
            }`}>
            <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight hover:text-brand-accent transition-colors duration-300">
              {post.title}
            </h1>
          </Link>

          <div className="flex mt-6 space-x-3 text-gray-300 lg:mt-8">
            <div className="flex flex-col gap-3 lg:items-center lg:flex-row">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0 w-5 h-5">
                  <div className="w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {post?.author?.name?.charAt(0) || 'N'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-100 hover:text-white transition-colors duration-200">
                  {post.author.name}{" "}
                  <span className="hidden pl-2 lg:inline"> ·</span>
                </p>
              </div>

              <div>
                <div className="flex space-x-2 text-sm lg:flex-row lg:items-center">
                  <time
                    className="text-white"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(
                        post?.publishedAt || post._createdAt
                      ),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span className="text-white">
                    · {post.estReadingTime || "5"} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
