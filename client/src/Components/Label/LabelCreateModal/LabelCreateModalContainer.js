import React, { useState, useEffect, useContext } from 'react';
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
  const [fontColor, setFontColor] = useState(null);
  const [label, setLabel] = useState({
    id: '',
    title: '',
    description: '',
    color,
  });
  const cancelButtonColor = '#EFF1F4';
  const createLabelButtonColor = '#2D9F4D';

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
      fontColor={fontColor}
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
