const timeUnit = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
};

export const convertTime = (timeString) => {
  const today = new Date().getTime();
  const date = new Date(timeString).getTime();
  const diff = today - date;

  if (diff < timeUnit.MINUTE) {
    const seconds = Math.round(diff / timeUnit.SECOND);
    return `${seconds} seconds ago`;
  }
  if (diff < timeUnit.HOUR) {
    const minutes = Math.round(diff / timeUnit.MINUTE);
    return `${minutes} minutes ago`;
  }
  if (diff < timeUnit.DAY) {
    const hours = Math.round(diff / timeUnit.HOUR);
    return `${hours} hours ago`;
  }
  const days = Math.round(diff / timeUnit.DAY);
  return `${days} days ago`;
};
