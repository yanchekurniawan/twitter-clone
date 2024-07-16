const TrendsSkeleton = () => {
  return (
    <div className="flex flex-col px-4 py-3">
      <div className="flex justify-between">
        <div className="skeleton w-36 h-3 rounded-full"></div>
        <div className="skeleton w-7 h-3 rounded-full"></div>
      </div>
      <div className="flex flex-col ">
        <div className="skeleton w-20 h-3 rounded-full mt-2"></div>
        <div className="skeleton w-16 h-3 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default TrendsSkeleton;
