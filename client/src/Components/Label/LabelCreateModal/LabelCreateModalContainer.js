import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { request } from '../../../Api';
import { AuthStateContext } from '../../../Context/AuthContext';
import { LabelDispatchContext } from '../../../Context/LabelContext';
import { getRandomColor } from '../../../utils/color';
import LabelCreateModalPresenter from './LabelCreateModalPresenter';

export default ({ setDisplay, toggleDisplay }) => {
  const authState = useContext(AuthStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [color, setColor] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [label, setLabel] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    color,
  });
  const cancelButtonColor = '#EFF1F4';
  const createLabelButtonColor = '#2D9F4D';

  const postLabel = async (inputData) => {
    const config = { url: '/api/label', method: 'POST', token: authState.token, data: inputData };
    try {
      await request(config);
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const clickCreateLabelButton = () => {
    labelDispatch({ type: 'CREATE', label });
    postLabel(label);
    setColor('');
    setTitle('');
    setColor(getRandomColor());
    setDisplay(false);
  };

  const changeColor = () => {
    const randomColor = getRandomColor();
    setColor(randomColor);
  };

  useEffect(() => {
    const randomColor = getRandomColor();
    setColor(randomColor);
    setLabel({
      ...label,
      color: randomColor,
    });
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
      cancelButtonColor={cancelButtonColor}
      createLabelButtonColor={createLabelButtonColor}
      clickCreateLabelButton={clickCreateLabelButton}
      onChangeColor={onChangeColor}
      onChangeDescription={onChangeDescription}
      onChangeTitle={onChangeTitle}
      changeColor={changeColor}
      toggleDisplay={toggleDisplay}
    />
  );
};
