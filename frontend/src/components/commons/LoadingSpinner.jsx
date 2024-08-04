const LoadingSpinner = ({ size = "md", bgColor = "primary" }) => {
  const sizeClass = `loading-${size}`;
  const bgColorClass = `text-${bgColor}`;
  return (
    <span className={`loading loading-spinner ${sizeClass} ${bgColorClass}`} />
  );
};

export default LoadingSpinner;
