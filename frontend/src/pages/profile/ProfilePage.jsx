import { IoMdArrowRoundBack } from "react-icons/io";
import { dummyProfile } from "../../utils/dummy/dummyData";
import { IoCalendarOutline } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { numberFormatter } from "../../utils/functions/numberFormatter";
import { useEffect, useState } from "react";
import Posts from "../../components/commons/Posts";
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";

const ProfilePage = () => {
  const [tab, setTab] = useState("posts");
  const [editProfileData, setEditProfileData] = useState({
    name: "",
    bio: "",
    location: "",
    link: "",
    coverImg: "",
    profileImg: "",
  });

  const [editDataLength, setEditDataLength] = useState({
    name: 0,
    bio: 0,
    location: 0,
    link: 0,
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value });
  };

  const findLength = () => {
    const dummy = {
      name: editProfileData.name.length,
      bio: editProfileData.bio.length,
      location: editProfileData.location.length,
      link: editProfileData.link.length,
    };
    setEditDataLength({ ...editDataLength, ...dummy });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditProfileData({
          ...editProfileData,
          [e.target.name]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    findLength();
  }, [editProfileData]);

  const isLoading = false;
  return (
    <div className="flex-[2.8] justify-center min-h-screen border-r border-[#2f3336]">
      <div className="flex flex-col">
        <div className="sticky top-0 flex items-center px-4 py-1 z-10 bg-black bg-opacity-75 backdrop-blur-md">
          <IoMdArrowRoundBack className="w-5 h-5" />
          <div className="flex flex-col ml-9">
            <div className="flex items-center">
              <p className="text-xl font-bold">{dummyProfile.fullName}</p>
              <RiVerifiedBadgeFill className="ml-1 text-primary h-5 w-5" />
            </div>
            <p className="text-sm text-gray-500">0 posts</p>
          </div>
        </div>
        {isLoading && <ProfileSkeleton />}
        {!isLoading && (
          <div>
            <div className="flex flex-col relative">
              <div>
                <img
                  src={dummyProfile.coverImg}
                  className="h-52 object-cover"
                />
              </div>
              <div className="absolute px-4 -bottom-[4.5rem]">
                <div className="border-4 border-black rounded-full">
                  <img
                    src={dummyProfile.profileImg}
                    alt=""
                    className="w-36 h-36 rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 px-4">
              <div className="flex w-full justify-end">
                <button
                  className="btn btn-outline btn-sm rounded-full font-bold hover:bg-opacity-15 hover:text-white"
                  onClick={() =>
                    document.getElementById("edit_profile_modal").showModal()
                  }
                >
                  {" "}
                  Edit profile
                </button>
              </div>
              <div className="flex flex-col mt-10">
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">
                    {dummyProfile.fullName}
                  </p>
                  {dummyProfile.verified && (
                    <RiVerifiedBadgeFill className="ml-1 text-primary w-5 h-5" />
                  )}
                </div>
                <p className="text-gray-500">{dummyProfile.username}</p>
                <p className="py-2">{dummyProfile.bio}</p>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <BiLinkAlt className="w-[18px] h-[18px] text-gray-500 mr-1" />
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {dummyProfile.link}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <IoCalendarOutline className="w-[18px] h-[18px] text-gray-500 mr-1" />
                    <p className="text-gray-500">Joined June 2009</p>
                  </div>
                </div>
                <div className="flex gap-4 py-2">
                  <div className="flex">
                    <p>
                      {numberFormatter(dummyProfile.following.length, 0)}
                      <span className="text-gray-500"> Following</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p>
                      {numberFormatter(dummyProfile.followers.length, 0)}
                      <span className="text-gray-500"> Followers</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full border-b border-[#2f3336]">
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("posts")}
          >
            {tab === "posts" ? (
              <>
                <p className="font-semibold">Posts</p>
                <div className="h-1 w-12 bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Posts</p>
            )}
          </div>
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("replies")}
          >
            {tab === "replies" ? (
              <>
                <p className="font-semibold">Replies</p>
                <div className="h-1 w-14 bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Replies</p>
            )}
          </div>
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("highlights")}
          >
            {tab === "highlights" ? (
              <>
                <p className="font-semibold">Highlights</p>
                <div className="h-1 w-[4.8rem] bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Highlights</p>
            )}
          </div>
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("articles")}
          >
            {tab === "articles" ? (
              <>
                <p className="font-semibold">Articles</p>
                <div className="h-1 w-14 bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Articles</p>
            )}
          </div>
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("media")}
          >
            {tab === "media" ? (
              <>
                <p className="font-semibold">Media</p>
                <div className="h-1 w-12 bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Media</p>
            )}
          </div>
          <div
            className="flex flex-1 flex-col relative h-12 justify-center items-center hover:bg-secondary transition duration-300 cursor-pointer"
            onClick={() => setTab("likes")}
          >
            {tab === "likes" ? (
              <>
                <p className="font-semibold">Likes</p>
                <div className="h-1 w-12 bg-primary rounded-full absolute bottom-0"></div>
              </>
            ) : (
              <p className="text-gray-500">Likes</p>
            )}
          </div>
        </div>
        <Posts />
      </div>

      {/* Modal */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id="edit_profile_modal"
        className="modal modal-top flex justify-center"
      >
        <div className="modal-box w-11/12 max-w-2xl min-h-[90vh] rounded-xl mt-6 p-0 m-0">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-7">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
              </form>
              <p className="text-lg font-bold">Edit profile</p>
            </div>
            <button className="btn btn-sm btn-primary rounded-full text-white">
              Save
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col relative">
              <div className="relative h-48 flex justify-center items-center">
                <img
                  src={editProfileData.coverImg || dummyProfile.coverImg}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="absolute">
                  <input
                    type="file"
                    id="imgCoverUpload"
                    name="coverImg"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImgChange(e)}
                  />
                  <label htmlFor="imgCoverUpload" className="cursor-pointer">
                    <div className="p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-65 transition duration-300">
                      <MdOutlineAddAPhoto className="h-5 w-5" />
                    </div>
                  </label>
                </div>
              </div>
              <div className="absolute px-4 -bottom-[4.5rem] px-5">
                <div className="border-4 border-black rounded-full flex justify-center items-center relative">
                  <img
                    src={editProfileData.profileImg || dummyProfile.profileImg}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <div className="absolute">
                    <input
                      type="file"
                      id="imgProfileUpload"
                      name="profileImg"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleImgChange(e)}
                    />
                    <label
                      htmlFor="imgProfileUpload"
                      className="cursor-pointer"
                    >
                      <div className="p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-65 transition duration-300">
                        <MdOutlineAddAPhoto className="h-5 w-5" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <form className="flex flex-col mt-20 gap-8 px-5">
              <div className="w-full border border-[#2f3336] rounded-md relative flex flex-col justify-center">
                <p className="text-gray-500 text-end mr-2 mt-2 text-xs">
                  {editDataLength.name} / 50
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  id="name"
                  maxLength={50}
                  className="input px-2 m-0 input-sm peer/name rounded-md input-bordered w-full border-none focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                />
                <label
                  htmlFor="name"
                  className={`absolute px-2 text-gray-500 text-lg ${
                    editDataLength.name > 0 && "top-2 text-sm"
                  } peer-focus/name:top-2 peer-focus/name:text-sm transition-all duration-200`}
                >
                  Name
                </label>
              </div>
              <div className="w-full border border-[#2f3336] rounded-md relative flex flex-col">
                <p className="text-gray-500 text-end mr-2 mt-2 text-xs">
                  {editDataLength.bio} / 160
                </p>
                <textarea
                  name="bio"
                  id="bio"
                  maxLength={160}
                  className="textarea px-2 py-0 mx-0 mt-1 leading-4 peer/bio rounded-md input-bordered w-full border-none focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                />
                <label
                  htmlFor="bio"
                  className={`absolute top-5 px-2 text-gray-500 text-lg ${
                    editDataLength.bio > 0 && "top-[0.5rem] text-sm"
                  } peer-focus/bio:top-2 peer-focus/bio:text-sm transition-all duration-200`}
                >
                  Bio
                </label>
              </div>
              <div className="w-full border border-[#2f3336] rounded-md relative flex flex-col justify-center">
                <p className="text-gray-500 text-end mr-2 mt-2 text-xs">
                  {editDataLength.location} / 30
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="location"
                  id="location"
                  maxLength={30}
                  className="input px-2 m-0 input-sm peer/location rounded-md input-bordered w-full border-none focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                />
                <label
                  htmlFor="location"
                  className={`absolute px-2 text-gray-500 text-lg ${
                    editDataLength.location > 0 && "top-2 text-sm"
                  } peer-focus/location:top-2 peer-focus/location:text-sm transition-all duration-200`}
                >
                  Location
                </label>
              </div>
              <div className="w-full border border-[#2f3336] rounded-md relative flex flex-col justify-center">
                <p className="text-gray-500 text-end mr-2 mt-2 text-xs">
                  {editDataLength.link} / 100
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="link"
                  id="link"
                  maxLength={100}
                  className="input px-2 m-0 input-sm peer/link rounded-md input-bordered w-full border-none focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                />
                <label
                  htmlFor="link"
                  className={`absolute px-2 text-gray-500 text-lg ${
                    editDataLength.link > 0 && "top-2 text-sm"
                  } peer-focus/link:top-2 peer-focus/link:text-sm transition-all duration-200`}
                >
                  Website
                </label>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="text-gray-500">Birth date</p>
                  <GoDotFill className="w-1 h-1 text-gray-500" />
                  <p className="text-primary">Edit</p>
                </div>
                <p className="text-xl leading-5">July 2, 1999</p>
              </div>
            </form>
          </div>
          <div className="flex justify-between items-center px-5 py-3 hover:bg-secondary transition duration-300 cursor-pointer mb-14">
            <p className="text-xl">Switch to professional</p>
            <FaChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;
