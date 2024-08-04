import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { notifications } from "../../utils/dummy/dummyData.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const NotificationPage = () => {
  const [notifType, setNotifType] = useState("all");

  useEffect(() => {
    localStorage.setItem("activeMenu", "notif");
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/notifications");
        console.log("response", response);
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  console.log("data", data);

  return (
    <div className="flex-[3] justify-center min-h-screen border-r border-[#2f3336]">
      <div className="flex flex-col w-full min-h-screen">
        <div className="sticky top-0 flex flex-col pt-3 z-10 bg-black bg-opacity-75 backdrop-blur-md">
          <div className="flex justify-between items-center px-5 mb-3">
            <p className="font-bold text-xl">Notifications</p>
            <FiSettings className="w-[18px] h-[18px] text-white font-bold" />
          </div>
          <div className="flex border-b border-[#2f3336]">
            <div
              className="flex flex-1 flex-col items-center py-4 relative cursor-pointer hover:bg-secondary transition duration-300"
              onClick={() => setNotifType("all")}
            >
              {notifType === "all" ? (
                <>
                  <p className="font-semibold">All</p>
                  <div className="h-1 bg-primary w-14 rounded-full absolute bottom-0"></div>
                </>
              ) : (
                <p className="text-gray-500">All</p>
              )}
            </div>
            <div
              className="flex flex-1 flex-col items-center py-4 relative cursor-pointer hover:bg-secondary transition duration-300"
              onClick={() => setNotifType("verified")}
            >
              {notifType === "verified" ? (
                <>
                  <p className="font-semibold">Verified</p>
                  <div className="h-1 bg-primary w-14 rounded-full absolute bottom-0"></div>
                </>
              ) : (
                <p className="text-gray-500">Verified</p>
              )}
            </div>
            <div
              className="flex flex-1 flex-col items-center py-4 relative cursor-pointer hover:bg-secondary transition duration-300"
              onClick={() => setNotifType("mentions")}
            >
              {notifType === "mentions" ? (
                <>
                  <p className="font-semibold">Mentions</p>
                  <div className="h-1 bg-primary w-[4.5rem] rounded-full absolute bottom-0"></div>
                </>
              ) : (
                <p className="text-gray-500">Mentions</p>
              )}
            </div>
          </div>
        </div>
        {data && !isLoading && (
          <div className="flex flex-col">
            {data.map((notif) => (
              <div
                className="flex px-7 py-3 gap-3 border-b border-[#2f3336]"
                key={notif._id}
              >
                {notif.type === "like" ? (
                  <TiHeartFullOutline className="h-8 w-8 text-pink-600" />
                ) : (
                  <IoPerson className="h-8 w-8 text-primary" />
                )}
                <div className="flex flex-col">
                  <img
                    src={notif.from.profileImg}
                    className="w-8 h-8 rounded-full mb-2"
                  />
                  <p>
                    <span className="font-semibold text-white">
                      {notif.from.fullname}
                    </span>{" "}
                    {notif.type === "like"
                      ? "liked your post"
                      : "start following you"}
                  </p>
                  {/* postnya disini */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
