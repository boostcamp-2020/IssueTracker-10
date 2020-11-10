export const getRandomColor = () => {
  const standard = '888888';

  const randomHexCode = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor = `#${randomHexCode}`;

  if (parseInt(`0x${standard}`, 16) < parseInt(`0x${randomHexCode}`, 16)) {
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
