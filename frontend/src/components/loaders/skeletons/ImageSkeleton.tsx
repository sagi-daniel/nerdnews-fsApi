function MovieCardSkeleton() {
  return (
    <div className="mx-1 flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <div className="relative overflow-hidden bg-bg-dark opacity-90 text-content-dark h-full rounded-md">
        <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="h-6 bg-gray-600 w-4/5 mb-2 animate-pulse rounded"></div>

          <div className="h-4 bg-gray-600 w-full animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
