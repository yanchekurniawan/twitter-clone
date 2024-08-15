import { HiDotsHorizontal, HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiShare2Line, RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { LuDot } from "react-icons/lu";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import {
  dinamicTextarea,
  numberFormatter,
} from "../../utils/functions/myFunctions";
import { BiBarChart, BiRepost } from "react-icons/bi";
import { GrImage } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import Post from "../../components/commons/Post";
import { useEffect, useRef, useState } from "react";
import useComment from "../../components/hooks/useComment";
import LoadingSpinner from "../../components/commons/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import useLike from "../../components/hooks/useLike";

const StatusPage = () => {
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["postById"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/posts/post/${postId}`);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { data: myProfile } = useQuery({ queryKey: ["authUser"] });

  !isLoading && console.log(post);

  const postDate = new Date(post?.createdAt);

  const [comment, setComment] = useState("");

  const textareaRef = useRef(null);

  const { submitComment, isCommentPending } = useComment();

  const commentHandler = (postId) => {
    submitComment({ comment, postId });
    setComment("");
  };

  const { likePost } = useLike();

  const likePostHandler = (postId) => {
    likePost(postId);
  };

  const navigate = useNavigate();

  useEffect(() => {
    !isLoading && dinamicTextarea(textareaRef, "50px");
  }, [textareaRef, comment]);

  return (
    <div className="flex-[3] justify-center min-h-screen border-r border-[#2f3336]">
      <div className="sticky top-0 flex px-2 py-2 items-center gap-2 z-10 bg-black bg-opacity-75 backdrop-blur-md">
        <div className="p-2 rounded-full hover:bg-secondary transition duration-300 cursor-pointer">
          <IoMdArrowRoundBack
            className="w-5 h-5"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="ml-5">
          <p className="font-bold text-xl">Post</p>
        </div>
      </div>
      {!isLoading && (
        <div>
          <div className="flex flex-col px-4">
            <div className="flex mt-2 items-center justify-between">
              <div className="flex gap-2">
                <img
                  src={post?.user.profileImg || "/avatar-placeholder.png"}
                  className="w-11 h-11 rounded-full"
                />
                <div className="flex-col">
                  <div className="flex items-center gap-1">
                    <p className="font-bold tracking-tight">
                      {post?.user.fullname}
                    </p>
                    {post?.user.verified && (
                      <RiVerifiedBadgeFill className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-gray-500 leading-4">
                    @{post?.user.username}
                  </p>
                </div>
              </div>
              <div className="group cursor-pointer p-2 hover:bg-primary hover:bg-opacity-10 transition duration-300 rounded-full hover:rounded-full">
                <HiDotsHorizontal className="group-hover:text-primary transition duration-300" />
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <p>{post?.text}</p>
              {post?.img && (
                <div className="flex justify-center mt-3 rounded-xl border border-[#2f3336] overflow-hidden">
                  <img
                    src={post?.img}
                    alt=""
                    className="max-h-[600px] object-contain"
                  />
                </div>
              )}
              <div className="flex py-2 items-center">
                <p className="text-gray-500">
                  {postDate.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
                <LuDot className="text-gray-500" />
                <p className="text-gray-500">
                  {moment(postDate).format("MMMM d, y")}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border border-b-0 border-[#2f3336]"></div>
              <div className="flex justify-between items-center py-1">
                <div
                  className="group flex items-center cursor-pointer"
                  onClick={() =>
                    document.getElementById("commentsModal").showModal()
                  }
                >
                  <div className="p-2 rounded-full group-hover:bg-primary group-hover:bg-opacity-10 transition duration-300">
                    <FaRegComment className="w-4 h-4 text-gray-500 group-hover:text-primary transition duration-300" />
                  </div>
                  <p className="font-thin text-sm group-hover:text-primary transition duration-300">
                    {numberFormatter(post?.comments.length, 0)}
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer ">
                  <div className="p-1 rounded-full group-hover:bg-green-500 group-hover:bg-opacity-10 transition duration-300">
                    <BiRepost className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition duration-300" />
                  </div>
                  <p className="font-thin text-sm group-hover:text-green-500 transition duration-300">
                    {numberFormatter(post?.comments.length, 0)}
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer">
                  <div
                    className="p-1 rounded-full group-hover:bg-pink-600 group-hover:bg-opacity-10 transition duration-300"
                    onClick={() => likePostHandler(post?._id)}
                  >
                    {post.likes.includes(myProfile._id) ? (
                      <TiHeart className="w-[22px] h-[22px] text-pink-600 group-hover:text-pink-600 transition duration-300"></TiHeart>
                    ) : (
                      <TiHeartOutline className="w-[22px] h-[22px] text-gray-500 group-hover:text-pink-600 transition duration-300" />
                    )}
                  </div>
                  {post.likes.includes(myProfile._id) ? (
                    <p className="font-thin text-sm text-pink-600 group-hover:text-pink-600 transition duration-500">
                      {numberFormatter(post.likes.length, 0)}
                    </p>
                  ) : (
                    <p className="font-thin text-sm group-hover:text-pink-600 transition duration-500">
                      {numberFormatter(post.likes.length, 0)}
                    </p>
                  )}
                </div>
                <div className="group flex items-center cursor-pointer">
                  <div className="p-[0.30rem] rounded-full group-hover:bg-primary group-hover:bg-opacity-10 transition duration-300">
                    <BiBarChart className="w-5 h-5 text-gray-500 group-hover:text-primary transition duration-300" />
                  </div>
                  <p className="font-thin text-sm group-hover:text-primary transition duration-300">
                    {numberFormatter(post?.likes.length, 0)}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full group p-2 hover:bg-primary hover:bg-opacity-10 hover:rounded-full transition duration-300">
                    <FaRegBookmark className="w-4 h-4 text-gray-500 cursor-pointer group-hover:text-primary transition duration-300" />
                  </div>
                  <div className="rounded-full group p-2 hover:bg-primary hover:bg-opacity-10 hover:rounded-full transition duration-300">
                    <RiShare2Line className="w-5 h-5 text-gray-500 cursor-pointer group-hover:text-primary transition duration-300" />
                  </div>
                </div>
              </div>
              <div className="border border-b-0 border-[#2f3336]"></div>
            </div>
          </div>
          <div className="flex-col px-4 pb-4 border-b border-[#2f3336]">
            <div>
              <p className="text-gray-500 pl-14 mt-1">
                Replying to{" "}
                <span className="text-primary">@{post?.user.username}</span>
              </p>
            </div>
            <div className="flex">
              <img
                src={post?.user.profileImg || "/avatar-placeholder.png"}
                className="w-11 h-11 rounded-full"
              />
              <div className="relative w-full">
                <form className="flex-1 flex items-center">
                  <textarea
                    ref={textareaRef}
                    value={comment}
                    maxLength={280}
                    onChange={(e) => setComment(e.target.value)}
                    className="peer/comment bg-transparent w-full h-fit p-0 ml-3 text-xl resize-none border-none focus:outline-none placeholder-gray-500 mt-2"
                    placeholder="Post your reply"
                  ></textarea>
                </form>
                <button
                  className="btn btn-sm btn-primary rounded-full text-white absolute right-0"
                  onClick={() => commentHandler(post?._id)}
                >
                  {isCommentPending ? (
                    <LoadingSpinner bgColor="white" />
                  ) : (
                    "Reply"
                  )}
                </button>
                <div className="flex items-center pl-2">
                  <div>
                    <input type="file" id="postImage" accept="image/*" hidden />
                    <label htmlFor="postImage">
                      <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
                        <GrImage className="w-4 h-4 text-primary" />
                      </div>
                    </label>
                  </div>
                  <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
                    <MdOutlineGifBox className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
                    <BsEmojiSmile className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
                    <HiOutlineLocationMarker className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {post?.comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <Post key={comment._id} post={comment} />
            ))}
        </div>
      )}
    </div>
  );
};

export default StatusPage;
