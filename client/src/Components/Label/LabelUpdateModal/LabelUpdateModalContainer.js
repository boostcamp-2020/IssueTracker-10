import React, { useState, useEffect, useContext } from 'react';
import { request } from '../../../Api';
import { AuthStateContext } from '../../../Context/AuthContext';
import { LabelDispatchContext, LabelStateContext } from '../../../Context/LabelContext';
import { getRandomColor } from '../../../utils/color';
import LabelUpdateModalPresenter from './LabelUpdateModalPresenter';
import { theme } from '../../../theme';

export default ({ setDisplay, toggleDisplay, initLabel }) => {
  const authState = useContext(AuthStateContext);
  const labelState = useContext(LabelStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [color, setColor] = useState(initLabel.color);
  const [title, setTitle] = useState(initLabel.title);
  const [description, setDescription] = useState(initLabel.description);
  const [label, setLabel] = useState(initLabel);
  const [fontColor, setFontColor] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const defaultTitle = initLabel.title;

  const cancelButtonColor = theme.redColor;
  const createLabelButtonColor = theme.greenColor;

  const editLabel = async (inputData) => {
    const config = {
      url: `/api/label/${inputData.id}`,
      method: 'PUT',
      token: authState.token,
      data: inputData,
    };
    try {
      await request(config);
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const clickUpdateLabelButton = () => {
    labelDispatch({ type: 'UPDATE', label });
    editLabel(label);
    setColor(label.id);
    setTitle(label.title);
    setDescription(label.description);
    setDisplay(false);
  };

  const changeColor = () => {
    const { randomColor, randomFontColor } = getRandomColor();
    setColor(randomColor);
    setFontColor(randomFontColor);
  };

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
      if (defaultTitle === value) {
        setIsExist(false);
      } else {
        setIsExist(true);
      }
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
    <LabelUpdateModalPresenter
      color={color}
      title={title}
      isExist={isExist}
      fontColor={fontColor}
      description={description}
      cancelButtonColor={cancelButtonColor}
      createLabelButtonColor={createLabelButtonColor}
      clickUpdateLabelButton={clickUpdateLabelButton}
      onChangeColor={onChangeColor}
      onChangeDescription={onChangeDescription}
      onChangeTitle={onChangeTitle}
      changeColor={changeColor}
      toggleDisplay={toggleDisplay}
      redColor={cancelButtonColor}
    />
  );
};
