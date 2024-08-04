import { useQuery } from "@tanstack/react-query";
/* import { postsDummyData } from "../../utils/dummy/dummyData"; */
import PostsStekelonts from "../skeletons/PostsStekelonts";
import Post from "./Post";
import axios from "axios";
import { useEffect } from "react";

const Posts = ({ feedType, username }) => {
  const getPostApi = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/post";
      case "following":
        return "/api/posts/following";
      case "myPost":
        return `/api/posts/post/user/${username}`;
      case "likes":
        return "/api/posts/post/likes";
      default:
        return "/api/posts/post";
    }
  };

  const postApi = getPostApi();

  const {
    data: postData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      try {
        /* console.log(`API`, postApi); */
        const response = await axios.get(postApi);
        /* console.log("response", response); */
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  return (
    <div>
      {(isLoading || isRefetching) && (
        <div>
          <PostsStekelonts />
          <PostsStekelonts />
          <PostsStekelonts />
          <PostsStekelonts />
        </div>
      )}
      {!isLoading &&
        !isRefetching &&
        postData?.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
