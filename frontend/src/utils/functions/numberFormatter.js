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
