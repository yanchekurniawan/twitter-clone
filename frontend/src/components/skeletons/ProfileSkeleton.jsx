const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col relative">
        <div className="skeleton h-64"></div>
        <div className="absolute px-4 -bottom-[4.5rem]">
          <div className="border-4 border-black rounded-full">
            <div className="skeleton w-36 h-36 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-2 px-4">
        <div className="flex w-full justify-end">
          <div className="skeleton h-6 w-20 rounded-full"></div>
        </div>
        <div className="flex flex-col mt-14">
          <div className="flex items-center">
            <div className="skeleton h-6 w-40 rounded-full"></div>
          </div>
          <div className="skeleton h-3 w-32 mt-2 rounded-full"></div>
          <div className="skeleton h-3 w-full mt-2 rounded-full"></div>
          <div className="flex gap-2">
            <div className="skeleton h-3 w-32 mt-2 rounded-full"></div>
            <div className="skeleton h-3 w-32 mt-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
