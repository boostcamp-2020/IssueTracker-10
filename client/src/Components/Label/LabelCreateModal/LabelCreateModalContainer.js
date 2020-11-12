import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { request } from '../../../Api';
import { AuthDispatchContext, AuthStateContext } from '../../../Context/AuthContext';
import { LabelDispatchContext, LabelStateContext } from '../../../Context/LabelContext';
import { getRandomColor } from '../../../utils/color';
import LabelCreateModalPresenter from './LabelCreateModalPresenter';
import { theme } from '../../../theme';

export default ({ setDisplay, toggleDisplay }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const labelState = useContext(LabelStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [id, setId] = useState(null);
  const [color, setColor] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [fontColor, setFontColor] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const [label, setLabel] = useState({});
  const cancelButtonColor = theme.redColor;
  const createLabelButtonColor = theme.greenColor;

  const postLabel = async () => {
    const inputData = {
      title,
      description,
      color,
    };
    const config = { url: '/api/label', method: 'POST', token: authState.token, data: inputData };
    try {
      const result = await request(config);
      if (result.status === 401) authDispatch({ type: 'LOGOUT' });
      if (result.id) labelDispatch({ type: 'CREATE', label: { id: result.id, ...inputData } });
      toast.success('Success! 😄');
    } catch (err) {
      toast.error('Fail! 😭');
    }
    return null;
  };

  const clickCreateLabelButton = () => {
    postLabel(label);

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
      setId('');
      setTitle('');
      setDescription('');
      setLabel({});
    };
  }, []);

  useEffect(() => {
    setLabel({
      ...label,
      id,
      color,
      title,
      description,
    });
  }, [id, color, title, description]);

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
