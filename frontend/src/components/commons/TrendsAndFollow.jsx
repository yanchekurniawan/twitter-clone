import { HiDotsHorizontal } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { trendsDummyData } from "../../utils/dummy/dummyData";
import WhoToFollowSkeletons from "../skeletons/WhoToFollowSkeletons";
import TrendsSkeleton from "../skeletons/TrendsSkeleton";
import { numberFormatter } from "../../utils/functions/myFunctions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import useFollow from "../hooks/useFollow";

const TrendsAndFollow = () => {
  const { data: suggestedUser, isLoading } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/users/suggested");
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { follow, isPending } = useFollow();

  const followUserHandler = (userId) => {
    follow(userId);
  };

  return (
    <div className="flex-[1.9] text-center hidden lg:block">
      <div className="flex flex-col pl-7 gap-4 h-full">
        <div className="sticky top-0 bg-black">
          <label className="input input-md rounded-full flex items-center gap-2 mt-2 bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="Search" />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start border border-[#2f3336] px-4 py-3 rounded-2xl">
            <p className="font-bold text-xl tracking-tight">
              Subscribe to Premium
            </p>
            <p className="text-start leading-5 mt-1 tracking-tight">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="btn btn-sm btn-primary mt-1 rounded-full font-bold text-white mt-3 tracking-tight text-[16px] h-9">
              Subscribe
            </button>
          </div>
          <div className="flex flex-col border border-[#2f3336] pt-3 rounded-2xl">
            <p className="text-start pl-4 text-xl font-bold mb-4">
              Trends for you
            </p>
            {isLoading && (
              <>
                <TrendsSkeleton />
                <TrendsSkeleton />
                <TrendsSkeleton />
                <TrendsSkeleton />
              </>
            )}
            {!isLoading &&
              trendsDummyData?.map((trend, index) => {
                return (
                  <div
                    className="flex flex-col px-4 py-3 hover:bg-secondary cursor-pointer"
                    key={index}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        Trending in {trend.location}
                      </p>
                      <HiDotsHorizontal className="text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-start text-white font-bold">
                        {trend.tag}
                      </p>
                      <p className="text-start text-sm text-gray-500">
                        {numberFormatter(trend.countPost, 1)} Posts
                      </p>
                    </div>
                  </div>
                );
              })}
            <div className="p-4 text-start text-primary hover:bg-secondary hover:rounded-b-2xl cursor-pointer">
              Show more
            </div>
          </div>
          <div className="flex flex-col border border-[#2f3336] pt-3 rounded-2xl">
            <p className="text-start pl-4 text-xl font-bold mb-4">
              Who to follow
            </p>
            {isLoading && (
              <>
                <WhoToFollowSkeletons />
                <WhoToFollowSkeletons />
                <WhoToFollowSkeletons />
              </>
            )}
            {!isLoading &&
              suggestedUser?.map((acc, index) => {
                return (
                  <div
                    className="flex px-4 py-3 hover:bg-secondary cursor-pointer"
                    key={index}
                  >
                    <Link
                      to={`/profile/${acc.username}`}
                      className="flex w-full"
                    >
                      <img
                        src={acc.img || "/avatar-placeholder.png"}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col mr-auto ml-3">
                        <div className="flex items-center">
                          <p className="text-start font-bold">{acc.fullname}</p>
                          {acc.verified && (
                            <>
                              <RiVerifiedBadgeFill className="ml-1 text-primary" />
                            </>
                          )}
                        </div>
                        <p className="text-start text-gray-500 leading-3">
                          @{acc.username}
                        </p>
                      </div>
                      <button
                        className="btn btn-sm bg-white text-black hover:bg-white hover:bg-opacity-80 transition duration-300 rounded-full self-center"
                        onClick={(e) => {
                          e.preventDefault();
                          followUserHandler(acc._id);
                        }}
                      >
                        {isPending ? <LoadingSpinner width="sm" /> : "Follow"}
                      </button>
                    </Link>
                  </div>
                );
              })}
            <div className="p-4 text-start text-primary hover:bg-secondary hover:rounded-b-2xl cursor-pointer">
              Show more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsAndFollow;
