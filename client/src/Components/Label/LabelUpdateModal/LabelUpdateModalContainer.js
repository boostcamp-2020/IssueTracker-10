import React, { useState, useEffect, useContext } from 'react';
import { request } from '../../../Api';
import { AuthStateContext } from '../../../Context/AuthContext';
import { LabelDispatchContext } from '../../../Context/LabelContext';
import { getRandomColor } from '../../../utils/color';
import LabelUpdateModalPresenter from './LabelUpdateModalPresenter';

export default ({ setDisplay, toggleDisplay, initLabel }) => {
  const authState = useContext(AuthStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [color, setColor] = useState(initLabel.color);
  const [title, setTitle] = useState(initLabel.title);
  const [description, setDescription] = useState(initLabel.description);
  const [label, setLabel] = useState(initLabel);
  const [fontColor, setFontColor] = useState(null);
  const cancelButtonColor = '#EFF1F4';
  const createLabelButtonColor = '#2D9F4D';

  const eidtLabel = async (inputData) => {
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
    eidtLabel(label);
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
    />
  );
};
