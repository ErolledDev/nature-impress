import Link from "next/link";

export default function AuthorCard({ author }) {
  return (
    <div className="mt-6 sm:mt-8 rounded-2xl bg-gray-50 px-4 sm:px-6 py-6 sm:py-8 lg:px-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0 mx-auto sm:mx-0">
          <Link href={`/author/${author.slug.current}`}>
            <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full bg-brand-primary hover:bg-brand-secondary flex items-center justify-center transition-colors duration-200">
              <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                {author?.name?.charAt(0) || 'N'}
              </span>
            </div>
          </Link>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-300">
              About {author.name}
            </h3>
          </div>
          <div>
            <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              A passionate nature explorer dedicated to sharing the wonders of the wild 
              through captivating stories and stunning photography.
            </p>
          </div>
          <div>
            <Link
              href={`/author/${author.slug.current}`}
              className="inline-block bg-brand-primary/10 hover:bg-brand-primary/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-brand-primary dark:text-brand-accent transition-colors duration-200">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}