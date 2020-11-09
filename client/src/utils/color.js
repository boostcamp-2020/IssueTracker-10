export const getRandomColor = () => {
  const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomHexColor}`;
};
