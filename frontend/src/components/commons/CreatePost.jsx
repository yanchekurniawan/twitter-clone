import { dummyProfile } from "../../utils/dummy/dummyData";
import { GrImage } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { RiListRadio, RiCalendarScheduleLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";

const CreatePost = () => {
  return (
    <div className="flex px-4 py-3 border-b border-[#2f3336]">
      <img src={dummyProfile.profileImg} className="w-11 h-11" alt="Avatar" />
      <div className="flex flex-1 flex-col me-4">
        <form>
          <textarea
            className="textarea w-full p-0 ml-3 text-xl resize-none border-none focus:outline-none placeholder-gray-500"
            placeholder="What is happening?!"
          ></textarea>
        </form>
        <div className="flex ml-2 w-full justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <GrImage className="w-4 h-4 text-primary" />
            </div>
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <MdOutlineGifBox className="w-5 h-5 text-primary" />
            </div>
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <RiListRadio className="w-5 h-5 text-primary" />
            </div>
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <BsEmojiSmile className="w-5 h-5 text-primary" />
            </div>
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <RiCalendarScheduleLine className="w-5 h-5 text-primary" />
            </div>
            <div className="p-2 hover:bg-secondary cursor-pointer rounded-full">
              <HiOutlineLocationMarker className="w-5 h-5 text-primary" />
            </div>
          </div>
          <button className="btn btn-sm btn-primary rounded-full text-white">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
