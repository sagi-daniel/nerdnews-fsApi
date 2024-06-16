function GridItemSkeleton({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <div className="relative overflow-hidden bg-bg-dark opacity-90 text-content-dark h-full rounded-md">
      <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="h-6 bg-gray-600 w-5/6 mb-2 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-600 w-4/6 mb-2 animate-pulse rounded"></div>
        <div className="flex text-gray-400 mb-2">
          <div className="h-6 bg-gray-600 w-32  animate-pulse rounded"></div>
          <div className="h-6  mx-2 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-600 w-32  animate-pulse rounded"></div>
        </div>
        {highlighted && <div className="h-4 bg-gray-600 w-3/4 animate-pulse rounded"></div>}
      </div>
    </div>
  );
}

export default GridItemSkeleton;
