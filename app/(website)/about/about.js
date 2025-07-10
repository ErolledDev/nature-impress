import Container from "@/components/container";
import Link from "next/link";
import { cx } from "@/utils/all";

export default function About({ authors, settings }) {
  return (
    <Container>
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-brand-primary mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white leading-tight">
          About Our Journey
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We are passionate explorers of the natural world, dedicated to sharing the beauty and wonder of wildlife through captivating stories and stunning photography.
        </p>
      </div>

      <div className="mb-16 sm:mb-20 lg:mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
        {authors.slice(0, 3).map((author, index) => {
          return (
            <div
              key={author._id}
              className={cx(
                "relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 dark:from-brand-primary/20 dark:to-brand-secondary/10 hover:shadow-lg transition-all duration-300",
                index % 2 === 1 && "sm:translate-y-8 lg:translate-y-12"
              )}>
              <Link href={`/author/${author?.slug?.current}`}>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-primary hover:bg-brand-secondary flex items-center justify-center transition-colors duration-200">
                      <span className="text-white text-xl sm:text-2xl font-bold">
                        {author?.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {author?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nature Explorer
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="prose prose-lg sm:prose-xl mx-auto text-center dark:prose-invert max-w-4xl">
        <div className="space-y-6 sm:space-y-8">
          <p className="text-base sm:text-lg leading-relaxed">
            We believe in the power of nature to inspire, heal, and teach us about 
            the interconnectedness of all life. Through our stories and photography, 
            we aim to foster a deeper appreciation for the wild spaces that surround us.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Our mission is to document the beauty of untouched landscapes, the 
            fascinating behaviors of wildlife, and the urgent need for conservation 
            efforts to protect these precious ecosystems for future generations.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Connect with Nature
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}