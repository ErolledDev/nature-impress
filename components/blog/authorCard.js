import Link from "next/link";

export default function AuthorCard({ author }) {
  return (
    <div className="mt-8 rounded-2xl bg-gray-50 px-6 py-8 sm:px-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 mx-auto sm:mx-0">
          <Link href={`/author/${author.slug.current}`}>
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-brand-primary hover:bg-brand-secondary flex items-center justify-center transition-colors duration-200">
              <span className="text-white text-xl sm:text-2xl font-bold">
                {author?.name?.charAt(0) || 'N'}
              </span>
            </div>
          </Link>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-300">
              About {author.name}
            </h3>
          </div>
          <div>
            <p className="text-sm sm:text-base leading-relaxed">
              A passionate nature explorer dedicated to sharing the wonders of the wild 
              through captivating stories and stunning photography.
            </p>
          </div>
          <div className="mt-4">
            <Link
              href={`/author/${author.slug.current}`}
              className="inline-block bg-brand-primary/10 hover:bg-brand-primary/20 rounded-full px-4 py-2 text-sm font-medium text-brand-primary dark:text-brand-accent transition-colors duration-200">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}