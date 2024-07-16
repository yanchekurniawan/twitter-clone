import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal, HiOutlineLocationMarker } from "react-icons/hi";
import { numberFormatter } from "../../utils/functions/numberFormatter";
import { BiBarChart, BiRepost } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import {
  RiCalendarScheduleLine,
  RiListRadio,
  RiShare2Line,
} from "react-icons/ri";
import { dummyProfile } from "../../utils/dummy/dummyData";
import { GrImage } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";

const Post = (props) => {
  const { post } = props;

  return (
    <div
      className="flex px-4 py-3 border-b border-[#2f3336] cursor-pointer"
      key={post._id}
    >
      <img src={post.user.profileImg} className="w-11 h-11 rounded-full mr-3" />
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex">
            <p className="font-bold mr-1">{post.user.fullName}</p>
            <p className="text-gray-500">@{post.user.username}</p>
          </div>
          <div className="group cursor-pointer p-2 hover:bg-primary hover:bg-opacity-10 transition duration-300 rounded-full hover:rounded-full">
            <HiDotsHorizontal className="group-hover:text-primary transition duration-300" />
          </div>
        </div>
        <div>
          <p>{post.text}</p>
        </div>
        {post.img && (
          <div className="flex justify-center mt-3 rounded-xl border border-[#2f3336] overflow-hidden">
            <img src={post.img} alt="" className="h-96 object-contain" />
          </div>
        )}
        <div className="flex mt-2 justify-between">
          <div
            className="group flex items-center cursor-pointer"
            onClick={() =>
              document.getElementById("comments_modal").showModal()
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
            <div className="p-1 rounded-full group-hover:bg-pink-600 group-hover:bg-opacity-10 transition duration-300">
              <IoHeartOutline className="w-5 h-5 text-gray-500 group-hover:text-pink-600 transition duration-300" />
            </div>
            <p className="font-thin text-sm group-hover:text-pink-600 transition duration-500">
              {numberFormatter(post.likes.length, 0)}
            </p>
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
      <dialog
        id="comments_modal"
        className="modal modal-top flex justify-center"
      >
        <div className="modal-box w-11/12 max-w-2xl rounded-xl mt-6">
          <div className="flex items-center justify-between">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
            <p className="text-primary font-medium rounded-full py-1 px-4 hover:rounded-full hover:bg-primary hover:bg-opacity-10">
              Drafts
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex">
              <div className="flex flex-col justify-center items-center  mr-3">
                <img
                  src={post.user.profileImg}
                  className="w-11 h-11 rounded-full"
                  alt=""
                />
                <div className="w-[2px] h-full bg-[#2f3336] mt-2"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <p className="font-bold mr-1">{post.user.fullName}</p>
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
                src={dummyProfile.profileImg}
                className="w-11 h-11 rounded-full"
              />
              <form className="flex-1">
                <textarea
                  className="textar bg-transparent w-full h-fit p-0 ml-3 text-xl resize-none border-none focus:outline-none placeholder-gray-500 mt-2"
                  placeholder="Post your reply"
                ></textarea>
              </form>
            </div>
            <div className="flex gap-2">
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
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Post;
