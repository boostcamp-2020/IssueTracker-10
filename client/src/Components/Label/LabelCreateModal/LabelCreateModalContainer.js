import React, { useState, useEffect, useContext } from 'react';
import { request } from '../../../Api';
import { AuthStateContext } from '../../../Context/AuthContext';
import { LabelDispatchContext, LabelStateContext } from '../../../Context/LabelContext';
import { getRandomColor } from '../../../utils/color';
import LabelCreateModalPresenter from './LabelCreateModalPresenter';
import { theme } from '../../../theme';

export default ({ setDisplay, toggleDisplay }) => {
  const authState = useContext(AuthStateContext);
  const labelState = useContext(LabelStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [color, setColor] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [fontColor, setFontColor] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const [label, setLabel] = useState({
    id: '',
    title: '',
    description: '',
    color,
  });
  const cancelButtonColor = theme.redColor;
  const createLabelButtonColor = theme.greenColor;

  const postLabel = async (inputData) => {
    const config = { url: '/api/label', method: 'POST', token: authState.token, data: inputData };
    try {
      const data = await request(config);
      setLabel({ ...label, id: data.id });
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const clickCreateLabelButton = () => {
    postLabel(label);
    labelDispatch({ type: 'CREATE', label });
    setColor('');
    setTitle('');
    setColor(getRandomColor());
    setDisplay(false);
  };

  const changeColor = () => {
    const { randomColor, randomFontColor } = getRandomColor();
    setColor(randomColor);
    setFontColor(randomFontColor);
  };

  useEffect(() => {
    const { randomColor, randomFontColor } = getRandomColor();
    setColor(randomColor);
    setFontColor(randomFontColor);
    setLabel({
      ...label,
      color: randomColor,
    });
    return () => {
      setLabel({ id: '', title: '', description: '', color });
    };
  }, []);

  useEffect(() => {
    setLabel({
      ...label,
      color,
      title,
      description,
    });
  }, [color, title, description]);

  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
    const { labels } = labelState;
    const result = labels.filter(
      (element) => element.title.toLowerCase().trim() === value.toLowerCase().trim(),
    );
    if (result.length) {
      setIsExist(true);
    } else {
      setIsExist(false);
    }
  };

  const onChangeDescription = (event) => {
    const {
      target: { value },
    } = event;
    setDescription(value);
  };

  const onChangeColor = (event) => {
    const {
      target: { value },
    } = event;
    setColor(value);
  };

  return (
    <LabelCreateModalPresenter
      color={color}
      title={title}
      isExist={isExist}
      fontColor={fontColor}
      cancelButtonColor={cancelButtonColor}
      createLabelButtonColor={createLabelButtonColor}
      clickCreateLabelButton={clickCreateLabelButton}
      onChangeColor={onChangeColor}
      onChangeDescription={onChangeDescription}
      onChangeTitle={onChangeTitle}
      changeColor={changeColor}
      toggleDisplay={toggleDisplay}
      redColor={cancelButtonColor}
    />
  );
};
