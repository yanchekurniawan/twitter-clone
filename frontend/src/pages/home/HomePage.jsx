import { useEffect, useState } from "react";
import CreatePost from "../../components/commons/CreatePost";
import Posts from "../../components/commons/Posts";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  useEffect(() => {
    localStorage.setItem("activeMenu", "home");
  }, []);
  return (
    <div className="flex-[3] justify-center min-h-screen border-r border-[#2f3336]">
      <div className="sticky top-0 flex flex-grow-[2.5] border-b border-[#2f3336] bg-black bg-opacity-50 backdrop-blur-md">
        <div className="flex w-full justify-center">
          <div
            className="flex flex-1 py-3 justify-center hover:bg-secondary cursor-pointer relative transition duration-300"
            onClick={() => setFeedType("forYou")}
          >
            {feedType === "forYou" ? (
              <>
                <p className="font-bold">For you</p>
                <div className="absolute bottom-0 h-1 w-16 rounded-full bg-primary"></div>
              </>
            ) : (
              <p className="font-medium text-gray-600">For you</p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div
            className="flex flex-1 py-3 justify-center hover:bg-secondary cursor-pointer relative transition duration-300"
            onClick={() => setFeedType("following")}
          >
            {feedType === "following" ? (
              <>
                <p className="font-bold">Following</p>
                <div className="absolute bottom-0 h-1 w-[4.5rem] rounded-full bg-primary"></div>
              </>
            ) : (
              <p className="font-medium text-gray-600">Following</p>
            )}
          </div>
        </div>
      </div>
      <CreatePost />
      <Posts feedType={feedType} />
    </div>
  );
};

export default HomePage;
