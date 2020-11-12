export const getFontColor = (color) => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5), 16);

  return (r + g + b) / 3 < 112 ? 'white' : 'black';
};

export const getRandomColor = () => {
  const randomHexCode = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor = `#${randomHexCode}`;

  const randomFontColor = getFontColor(randomColor);
  return {
    randomColor,
    randomFontColor,
  };
};
