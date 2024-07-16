import { postsDummyData } from "../../utils/dummy/dummyData";
import PostsStekelonts from "../skeletons/PostsStekelonts";
import Post from "./Post";

const Posts = () => {
  const isLoading = false;
  return (
    <div>
      {isLoading && (
        <div>
          <PostsStekelonts />
          <PostsStekelonts />
          <PostsStekelonts />
          <PostsStekelonts />
        </div>
      )}
      {!isLoading &&
        postsDummyData?.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
