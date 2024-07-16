const PostsStekelonts = () => {
  return (
    <div className="flex px-4 py-3 border border-[#2f3336]">
      <div className="skeleton w-11 h-11 rounded-full mr-3"></div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex">
            <div className="skeleton h-3 w-28 rounded-full mr-1"></div>
            <div className="skeleton h-3 w-24 rounded-full"></div>
          </div>
          <div className="skeleton h-3 w-7 rounded-full"></div>
        </div>
        <div>
          <div className="skeleton h-3 w-16 rounded-full mt-2"></div>
        </div>
        <div className="h-96 skeleton flex justify-center mt-3 rounded-xl border border-[#2f3336]"></div>
        <div className="flex mt-2 justify-between">
          <div className="flex">
            <div className="skeleton w-4 h-4 rounded-full mr-1"></div>
            <div className="skeleton h-4 w-7 rounded-full"></div>
          </div>
          <div className="flex">
            <div className="skeleton w-4 h-4 rounded-full mr-1"></div>
            <div className="skeleton h-4 w-7 rounded-full"></div>
          </div>
          <div className="flex">
            <div className="skeleton w-4 h-4 rounded-full mr-1"></div>
            <div className="skeleton h-4 w-7 rounded-full"></div>
          </div>
          <div className="flex">
            <div className="skeleton w-4 h-4 rounded-full mr-1"></div>
            <div className="skeleton h-4 w-7 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="skeleton h-4 w-4 rounded-full mr-1"></div>
            <div className="skeleton h-4 w-4 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsStekelonts;
