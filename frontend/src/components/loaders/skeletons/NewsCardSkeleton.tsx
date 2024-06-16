function NewsCardSkeleton() {
  return (
    <div className="mx-1 flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <div className="flex flex-col justify-between max-w-sm bg-gray-700 text-content-dark h-full w-80 rounded-md animate-pulse">
        <div className="relative flex flex-col justify-evenly">
          <div className="h-48 bg-gray-600 rounded-t-md"></div>
          <div className="p-4">
            <div className="absolute top-2 right-1 h-6 w-16 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex justify-between items-center mb-4 animate-pulse">
              <span className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></span>
              <span className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></span>
            </div>
            <h3 className="text-lg font-bold mt-1 h-6 bg-gray-600 rounded animate-pulse"></h3>
            <p className="mt-2 h-3 bg-gray-600 rounded w-full animate-pulse"></p>
            <p className="mt-2 h-3 bg-gray-600 rounded w-3/4 animate-pulse"></p>
            <p className="mt-6 h-3 bg-gray-600 rounded w-full animate-pulse"></p>

            <p className="mt-2 h-3 bg-gray-600 rounded w-1/3 animate-pulse"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCardSkeleton;
