export default function Loading({ count = 6, aspect = "square", layout = "grid" }) {
  return (
    <div className={`mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:gap-10 xl:gap-12 ${
      layout === "featured" 
        ? "md:grid-cols-2" 
        : layout === "grid" 
        ? "sm:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1"
    }`}>
      {new Array(count).fill().map((item, index) => (
        <PostCardSkeleton 
          key={index} 
          aspect={aspect}
          featured={layout === "featured" && index < 2}
        />
      ))}
    </div>
  );
}

const PostCardSkeleton = ({ aspect = "square", featured = false }) => {
  return (
    <div className="group animate-pulse">
      {/* Image Skeleton */}
      <div className={`overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${
        aspect === "landscape" ? "aspect-video" : "aspect-square"
      }`}>
        <PostCardImageSkeleton aspect={aspect} />
      </div>

      {/* Content Skeleton */}
      <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {/* Category Skeleton */}
        <div>
          <div className="inline-block h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 sm:space-y-3">
          <div className={`h-6 bg-gray-200 dark:bg-gray-700 rounded ${
            featured ? "sm:h-7 lg:h-8" : "sm:h-6"
          }`}></div>
          <div className={`h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ${
            featured ? "sm:h-7 lg:h-8" : "sm:h-6"
          }`}></div>
          {featured && (
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 sm:h-7 lg:h-8"></div>
          )}
        </div>

        {/* Author and Date Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
            {/* Author Name */}
            <div className="h-4 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          {/* Date */}
          <div className="h-4 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const PostCardImageSkeleton = ({ aspect }) => {
  const viewBox = aspect === "landscape" ? "0 0 500 281" : "0 0 500 500";
  const imageHeight = aspect === "landscape" ? "281" : "500";
  
  return (
    <div 
      className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"
      style={{ aspectRatio: aspect === "landscape" ? "16/9" : "1/1" }}
      aria-label="Loading image..."
      role="img"
    />
  );
  
  // Alternative: Keep SVG for more sophisticated animation
  /* return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      id="skeleton"
      aria-labelledby="loading-aria"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full">
      <title id="loading-aria">Loading...</title>
      <style>{`
        .dark svg#skeleton #colorbase {
          stop-color: #2d2d2d;
        }
        .dark svg#skeleton #colorhighlight {
          stop-color: #3d3d3d;
        }
      `}</style>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      />
      <defs>
        <clipPath id="clip-path">
          <rect
            x="0"
            y="0"
            rx="10"
            ry="10"
            width="500"
            height={imageHeight}
          />
        </clipPath>
        <linearGradient id="fill">
          <stop
            offset="0.599964"
            stopColor="#f0f0f0"
            stopOpacity="1"
            id="colorbase">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="1.59996"
            stopColor="#f7f7f7"
            stopOpacity="1"
            id="colorhighlight">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="2.59996"
            stopColor="#f0f0f0"
            stopOpacity="1"
            id="colorbase">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  ); */
};