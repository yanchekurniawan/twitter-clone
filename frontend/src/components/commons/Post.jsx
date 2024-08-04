/* SVG Icon */
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal, HiOutlineLocationMarker } from "react-icons/hi";
import { BiBarChart, BiRepost } from "react-icons/bi";
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import {
  RiCalendarScheduleLine,
  RiListRadio,
  RiShare2Line,
  RiVerifiedBadgeFill,
  RiDeleteBinLine,
} from "react-icons/ri";
import { GrImage } from "react-icons/gr";
import { MdOutlineGifBox, MdSpeakerNotesOff } from "react-icons/md";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";
import { TbPinned, TbFlag3 } from "react-icons/tb";
import { PiShootingStarLight } from "react-icons/pi";
import { LuDot } from "react-icons/lu";

import {
  dinamicTextarea,
  formatPostDate,
  numberFormatter,
} from "../../utils/functions/myFunctions";
import LoadingSpinner from "../../components/commons/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { post } = props;

  const { data: myProfile } = useQuery({
    queryKey: ["authUser"],
  });

  const queryClient = useQueryClient();

  const { mutate, isPending: isDeletePostPending } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postId) => {
      try {
        await axios.delete(`/api/posts/post/${postId}`);
        queryClient.refetchQueries({
          queryKey: ["post"],
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const deletePostHandler = (e, postId) => {
    e.preventDefault();
    mutate(postId);
  };

  const { mutate: mutateComment /* isPending */ } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async ({ comment: text, postId }) => {
      try {
        await axios.post(`/api/posts/comment/${postId}`, {
          text,
        });
        queryClient.refetchQueries({
          queryKey: ["post"],
        });
      } catch (error) {
        toast(error.response.data.error, {
          position: "bottom-center",
          style: {
            backgroundColor: "#1D9BF0",
            color: "#fff",
          },
        });
      }
    },
  });

  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");

  const commentHandler = (postId) => {
    console.log(comment, postId);
    mutateComment({ comment, postId });
  };

  const { mutate: mutateLike } = useMutation({
    mutationKey: ["like"],
    mutationFn: async (postId) => {
      try {
        await axios.post(`/api/posts/like/${postId}`);
        queryClient.refetchQueries({
          queryKey: ["post"],
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const likePostHandler = (postId) => {
    mutateLike(postId);
  };

  const commentsModalCloseHandler = () => {
    setComment("");
    document.getElementById("commentsModal").close();
  };

  useEffect(() => {
    dinamicTextarea(textareaRef, "50px");
  }, [textareaRef, comment]);

  return (
    <Link to={`/${post.user.username}/status/${post._id}`} state={post}>
      <div
        className="flex px-4 py-3 border-b border-[#2f3336] cursor-pointer overflow-hidden hover:bg-white hover:bg-opacity-[0.03] transition duration-300"
        key={post._id}
      >
        <img
          src={post.user.profileImg || "/avatar-placeholder.png"}
          className="w-11 h-11 rounded-full mr-3 object-cover object-top"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div className="flex items-center">
              <p className="font-bold tracking-tight">{post.user.fullname}</p>
              {post.user.verified && (
                <RiVerifiedBadgeFill className="w-4 h-4 text-primary ml-[0.2rem]" />
              )}
              <p className="text-gray-500 ml-1">@{post.user.username}</p>
              <LuDot className="text-gray-500" />
              <p className="text-gray-500">{formatPostDate(post.createdAt)}</p>
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group cursor-pointer p-2 hover:bg-primary hover:bg-opacity-10 transition duration-300 rounded-full hover:rounded-full"
              >
                <HiDotsHorizontal className="group-hover:text-primary transition duration-300" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 z-[1] w-[300px] p-0 shadow-[0_0_5px_1px_rgb(255,255,255,0.3)] rounded-lg"
              >
                {myProfile._id === post.user._id && (
                  <>
                    <li>
                      <div
                        className="flex items-center px-4"
                        onClick={() =>
                          document.getElementById("confirmDelete").showModal()
                        }
                      >
                        <RiDeleteBinLine className="w-[18px] h-[18px] text-red-600" />
                        <a className="font-bold text-[1rem] py-1 text-red-600">
                          Delete
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center px-4">
                        <TbPinned className="w-[18px] h-[18px]" />
                        <a className="font-bold text-[1rem] py-1">
                          Pin to your profile
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center px-4">
                        <PiShootingStarLight className="w-[18px] h-[18px]" />
                        <a className="font-bold text-[1rem] py-1">
                          Highlight on your profile
                        </a>
                      </div>
                    </li>
                  </>
                )}
                {myProfile._id !== post.user._id && (
                  <>
                    <li>
                      <div className="flex items-center px-4">
                        <MdSpeakerNotesOff className="w-[18px] h-[18px]" />
                        <a className="font-bold text-[1rem] py-1">
                          Not interested in {post.user.fullname}
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center px-4">
                        <BsEmojiFrown className="w-[18px] h-[18px]" />
                        <a className="font-bold text-[1rem] py-1">
                          Not interested in this post
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center px-4">
                        <TbFlag3 className="w-[18px] h-[18px]" />
                        <a className="font-bold text-[1rem] py-1">
                          Report post
                        </a>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div>
            <p>{post.text}</p>
          </div>
          {post.img && (
            <div className="flex justify-center mt-3 rounded-xl border border-[#2f3336] overflow-hidden">
              <img
                src={post.img}
                alt=""
                className="max-h-[600px] object-contain"
              />
            </div>
          )}
          <div className="flex mt-2 justify-between">
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
                {numberFormatter(post.comments.length, 0)}
              </p>
            </div>
            <div className="group flex items-center cursor-pointer ">
              <div className="p-1 rounded-full group-hover:bg-green-500 group-hover:bg-opacity-10 transition duration-300">
                <BiRepost className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition duration-300" />
              </div>
              <p className="font-thin text-sm group-hover:text-green-500 transition duration-300">
                {numberFormatter(post.comments.length, 0)}
              </p>
            </div>
            <div className="group flex items-center cursor-pointer">
              <div
                className="p-1 rounded-full group-hover:bg-pink-600 group-hover:bg-opacity-10 transition duration-300"
                onClick={() => likePostHandler(post._id)}
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
                {numberFormatter(post.likes.length, 0)}
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
        </div>

        {/* Modal */}
        {/* Comments Modal */}
        <dialog
          id="commentsModal"
          className="modal modal-top flex justify-center"
        >
          <div className="modal-box w-11/12 max-w-2xl rounded-xl mt-6">
            <div className="flex items-center justify-between">
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => commentsModalCloseHandler()}
              >
                ✕
              </button>
              <p className="text-primary font-medium rounded-full py-1 px-4 hover:rounded-full hover:bg-primary hover:bg-opacity-10">
                Drafts
              </p>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex">
                <div className="flex flex-col justify-center items-center  mr-3">
                  <img
                    src={post.user.profileImg || "/avatar-placeholder.png"}
                    className="w-11 h-11 rounded-full"
                    alt=""
                  />
                  <div className="w-[2px] h-full bg-[#2f3336] mt-2"></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="font-bold mr-1">{post.user.fullname}</p>
                    <p className="text-gray-500">@{post.user.username}</p>
                  </div>
                  <p>{post.text}</p>
                  <p className="py-3 text-gray-500">
                    Replying to{" "}
                    <span className="text-primary">@{post.user.username}</span>
                  </p>
                </div>
              </div>
              <div className="flex mt-4">
                <img
                  src={post.user.profileImg || "/avatar-placeholder.png"}
                  className="w-11 h-11 rounded-full"
                />
                <form className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="textar bg-transparent w-full h-fit p-0 ml-3 text-xl resize-none border-none focus:outline-none placeholder-gray-500 mt-2"
                    placeholder="Post your reply"
                  ></textarea>
                </form>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <GrImage className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <MdOutlineGifBox className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <RiListRadio className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <BsEmojiSmile className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <RiCalendarScheduleLine className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer rounded-full">
                    <HiOutlineLocationMarker className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm text-white rounded-full"
                  onClick={() => commentHandler(post._id)}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </dialog>

        {/* Confirm Delete Post Modal */}
        <dialog id="confirmDelete" className="modal">
          <div className="modal-box rounded-xl max-w-[340px] px-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Delete post?</p>
              <p className="mb-5 text-gray-500 leading-5">
                This can’t be undone and it will be removed from your profile,
                the timeline of any accounts that follow you, and from search
                results.
              </p>
              <button
                className="btn bg-red-600 hover:bg-red-700 transition duration-300 rounded-full font-bold"
                onClick={(e) => deletePostHandler(e, post._id)}
              >
                {isDeletePostPending ? <LoadingSpinner width="sm" /> : "Delete"}
              </button>
              <form method="dialog" className="w-full">
                <button className="btn border-[#555b5f] bg-black hover:border-[#555b5f] hover:bg-white hover:bg-opacity-10 hover:text-inherit transition duration-300 rounded-full w-full">
                  Cancel
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </Link>
  );
};

export default Post;
