export const getRandomColor = () => {
  const standard = '999999';

  const randomHexCode = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor = `#${randomHexCode}`;

  if (parseInt(`0x${standard}`, 16) > parseInt(`0x${randomHexCode}`, 16)) {
    const randomFontColor = 'black';
    return {
      randomColor,
      randomFontColor,
    };
  }
  const randomFontColor = 'white';
  return {
    randomColor,
    randomFontColor,
  };
};

export const getFontColor = (color) => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5), 16);

  return (r + g + b) / 3 < 112 ? 'white' : 'black';
};
