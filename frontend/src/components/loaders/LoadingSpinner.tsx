function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-[-999]">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute border-4 border-t-4 border-transparent border-t-bg-light dark:border-t-primary rounded-full w-full h-full"></div>
        <div className="absolute border-4 border-t-4 border-transparent  rounded-full w-12 h-12 top-2 left-2"></div>
        <div className="absolute border-4 border-t-4 border-transparent  rounded-full w-8 h-8 top-4 left-4"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
