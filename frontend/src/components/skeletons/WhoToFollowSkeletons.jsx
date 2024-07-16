const WhoToFollowSkeletons = () => {
  return (
    <div className="flex px-4 py-3 items-center">
      <div className="skeleton w-11 h-11 rounded-full"></div>
      <div className="flex flex-col mr-auto ml-3 justify-center">
        <div className="skeleton w-28 h-3 rounded-full"></div>
        <div className="skeleton w-20 h-3 rounded-full mt-2"></div>
      </div>
      <div className="skeleton w-16 h-7 rounded-full"></div>
    </div>
  );
};

export default WhoToFollowSkeletons;
