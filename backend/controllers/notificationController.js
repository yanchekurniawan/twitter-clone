import Notification from "../models/notificationModel.js";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "fullname profileImg",
    });

    await Notification.updateMany(
      { to: userId },
      {
        $set: {
          read: true,
        },
      }
    );

    res.status(200).json(notifications);
  } catch (error) {
    console.log(`Error at getUserNotifications controller ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });

    res.status(200).json({
      message: "Notifications deleted successfully",
    });
  } catch (error) {
    console.log(`Error at deleteUserNotifications controller ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
