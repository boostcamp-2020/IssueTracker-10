export default (closed, total) => {
  return total ? `${`${(closed / total) * 100}`.toString().slice(0, 4)}%` : '0%';
};
