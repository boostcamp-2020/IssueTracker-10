const timeUnit = {
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
};

export const convertTime = (timeString) => {
  const today = new Date().getTime();
  const date = new Date(timeString).getTime();
  const diff = today - date;
  if (diff < timeUnit.DAY) {
    const hours = diff / timeUnit.HOUR;
    return `${hours} hours ago`;
  }
  const days = Math.round(diff / timeUnit.DAY);
  return `${days} days ago`;
};
