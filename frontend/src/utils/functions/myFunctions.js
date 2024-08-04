export const numberFormatter = (num, precision = 2) => {
  const map = [
    { suffix: "T", treshold: 1e12 },
    { suffix: "B", treshold: 1e9 },
    { suffix: "M", treshold: 1e6 },
    { suffix: "K", treshold: 1e3 },
    { suffix: "", treshold: 1 },
  ];

  const found = map.find((value) => Math.abs(num) >= value.treshold);
  if (found) {
    const formmated = (num / found.treshold).toFixed(precision) + found.suffix;
    return formmated;
  }
};

export const dinamicTextarea = (textareaRef, initiateHeight) => {
  if (textareaRef) {
    textareaRef.current.style.height = initiateHeight;
    const scrollHeight = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = scrollHeight + "px";
  }
};

export const formatPostDate = (createdAt) => {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate - createdAtDate) / 1000
  );
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdAtDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (timeDifferenceInDays === 1) {
    return "1d";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes}m`;
  } else {
    return "Just now";
  }
};

export const formatMemberSinceDate = (createdAt) => {
  const date = new Date(createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};
