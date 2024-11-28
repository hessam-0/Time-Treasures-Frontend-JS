const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours > 9 ? "" : "0"}${hours}:${minutes > 9 ? "" : "0"}${minutes}`;
};

export default formatTime;
