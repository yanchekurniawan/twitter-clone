/* import React from "react"; */
import { useState } from "react";
import XSvg from "../svgs/X";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  PiMagnifyingGlass,
  PiMagnifyingGlassBold,
  PiDotsThreeCircle,
  PiDotsThreeCircleFill,
} from "react-icons/pi";
import {
  RiNotificationLine,
  RiNotificationFill,
  RiSlashCommands2,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import { HiMail, HiOutlineMail, HiDotsHorizontal } from "react-icons/hi";
import { BsPeople, BsPeopleFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
/* import { BsSlashSquare, BsSlashSquareFill } from "react-icons/bs"; */

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("home");

  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({ queryKey: ["authUser"] });
  console.log(profileData);

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        await axios.post("api/auth/logout");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      } catch (error) {
        toast(error.response.data.error, {
          position: "bottom-center",
          style: {
            backgroundColor: "#1d9bf0",
            color: "#fff",
          },
        });
      }
    },
  });

  const logoutHandler = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="lg:flex-[1.25] border-r border-[#2f3336]">
      <div className="sticky top-0 left-0">
        <div className="flex items-center justify-center lg:justify-start">
          <Link
            to={"/"}
            className="p-3 cursor-pointer rounded-full hover:bg-secondary"
          >
            <XSvg className="w-[30px] fill-white" />
          </Link>
        </div>
        <ul className="mt-1 lg:pr-0 flex flex-col items-center lg:items-start">
          <li
            className="flex justify-center lg:justify-start"
            onClick={() => setActiveMenu("home")}
          >
            {activeMenu === "home" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <GoHomeFill className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Home
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <GoHome className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Home</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("explore")}
          >
            {activeMenu === "explore" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <PiMagnifyingGlassBold className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Explore
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <PiMagnifyingGlass className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Explore</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("notif")}
          >
            {activeMenu === "notif" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <RiNotificationFill className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Notifications
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <RiNotificationLine className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">
                  Notifications
                </p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("message")}
          >
            {activeMenu === "message" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <HiMail className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Messages
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <HiOutlineMail className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Messages</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("grok")}
          >
            {activeMenu === "grok" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <RiSlashCommands2 className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Grok
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <RiSlashCommands2 className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Grok</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("communities")}
          >
            {activeMenu === "communities" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <BsPeopleFill className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Communities
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <BsPeople className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Communities</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("profile")}
          >
            {activeMenu === "profile" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <BsPersonFill className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  Profile
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <BsPerson className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">Profile</p>
              </Link>
            )}
          </li>
          <li
            className="flex justify-end lg:justify-start"
            onClick={() => setActiveMenu("more")}
          >
            {activeMenu === "more" ? (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <PiDotsThreeCircleFill className="w-7 h-7" />
                <p className="text-xl font-bold py-[11px] hidden lg:block">
                  More
                </p>
              </Link>
            ) : (
              <Link className="flex items-center hover:rounded-full hover:bg-secondary gap-4 p-[0.7rem] lg:pl-3 lg:pr-5 lg:py-0">
                <PiDotsThreeCircle className="w-7 h-7" />
                <p className="text-xl py-[11px] hidden lg:block">More</p>
              </Link>
            )}
          </li>
        </ul>
        <div className="lg:pr-8 mt-2 flex justify-center">
          <button className="btn btn-primary rounded-full px-2 m-0 lg:hidden">
            <CiCirclePlus className="w-8 h-8 fill-white" />
          </button>
          <button className="btn btn-primary rounded-full w-full text-white text-lg hidden lg:block">
            Post
          </button>
        </div>
        <div className="mt-10 pl-2 lg:pl-0 pr-2 flex justify-end">
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center hover:bg-secondary hover:rounded-full p-3"
            >
              <div className="w-11 h-11">
                <img
                  src={profileData.profileImg || "./avatar-placeholder.png"}
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
              <div className="hidden lg:flex flex-col ml-2">
                <div className="flex items-center">
                  <span className="font-bold w-[145px] w-10 whitespace-nowrap text-ellipsis overflow-hidden">
                    {profileData.fullname}
                  </span>
                  {profileData.verified && (
                    <>
                      <RiVerifiedBadgeFill className="text-primary ml-1" />
                    </>
                  )}
                </div>
                <span className="text-gray-500">
                  @
                  {profileData.username[0].toUpperCase() +
                    profileData.username.substring(1)}
                </span>
              </div>
              <div className="ml-1 hidden lg:block">
                <HiDotsHorizontal />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow-[0_0_5px_1px_rgb(255,255,255,0.3)] rounded-lg"
            >
              <li>
                <a className="font-bold text-[1rem] py-3">
                  Add an existing account
                </a>
              </li>
              <li>
                <a
                  className="font-bold text-[1rem] py-3"
                  onClick={(e) => logoutHandler(e)}
                >
                  Logout {profileData.username}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
