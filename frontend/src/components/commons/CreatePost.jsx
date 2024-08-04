/* import { dummyProfile } from "../../utils/dummy/dummyData"; */
import { GrImage } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { RiListRadio, RiCalendarScheduleLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { dinamicTextarea } from "../../utils/functions/myFunctions";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const { data: myProfile } = useQuery({
    queryKey: ["authUser"],
  });

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ img, text }) => {
      try {
        await axios.post("api/posts/post", {
          img,
          text,
        });
        queryClient.refetchQueries({ queryKey: ["post"] });
        setText("");
        setImg("");
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

  const postSubmitHandler = (e) => {
    e.preventDefault();
    console.log(text);
    mutate({ img, text });
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    dinamicTextarea(textareaRef, "56px");
  }, [textareaRef, text]);

  return (
    <div className="flex px-4 py-3 border-b border-[#2f3336]">
      <img
        src={myProfile.profileImg || "./avatar-placeholder.png"}
        className="w-11 h-11 rounded-full object-cover object-top"
        alt="Avatar"
      />
      <div className="flex flex-1 flex-col me-4">
        <form onSubmit={(e) => postSubmitHandler(e)}>
          <textarea
            className="textarea w-full p-0 ml-3 text-xl resize-none border-none focus:outline-none placeholder-gray-500"
            placeholder="What is happening?!"
            value={text}
            ref={textareaRef}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>

          {img && (
            <div className="mb-7 flex justify-center relative">
              <img
                src={img}
                alt="Post Image"
                className="max-h-[600px] w-full rounded-3xl bg-white object-cover object-top -z-10"
              />
              <div
                className="absolute bg-black rounded-full bg-opacity-70 cursor-pointer hover:bg-opacity-60 right-2 top-2"
                onClick={() => {
                  setImg("");
                }}
              >
                <IoCloseOutline className="w-8 h-8" />
              </div>
            </div>
          )}
          <div className="flex ml-2 w-full justify-between">
            <div className="flex gap-2 items-center">
              <div>
                <input
                  type="file"
                  id="postImage"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImgChange(e)}
                />
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
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
