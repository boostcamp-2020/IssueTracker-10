import React, { useContext, useEffect, useState } from 'react';
import { request } from '../../../Api';
import { AuthDispatchContext, AuthStateContext } from '../../../Context/AuthContext';
import { MilestoneDispatchContext, MilestoneStateContext } from '../../../Context/MilestoneContext';
import { theme } from '../../../theme';
import MilestoneUpdatePresenter from './MilestoneUpdatePresenter';

export default ({ history, token, match }) => {
  const { id } = match.params;
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const milestoneDispatch = useContext(MilestoneDispatchContext);
  const milestoneState = useContext(MilestoneStateContext);
  const milestone = milestoneState.milestoneDetail;
  const [title, setTitle] = useState(milestone ? milestone.title : null);
  const [description, setDescription] = useState(milestone ? milestone.description : null);
  const [date, setDate] = useState(milestone ? milestone.date : null);
  const [state, setState] = useState(milestone ? milestone.state : null);
  const { greenColor, redColor, lightGrayColor } = theme;

  useEffect(() => {
    if (!authState.token) authDispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (authState.token) {
      const fetchMilestone = async () => {
        const params = { state: 1 };
        const config = {
          url: `/api/milestone/${id}`,
          method: 'GET',
          token: authState.token,
          params,
        };
        const { data } = await request(config);
        if (data) milestoneDispatch({ type: 'GET_DETAIL_MILESTONE', milestone: data });
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
        setState(data.state);
      };
      fetchMilestone();
    }
  }, []);

  const toggleMilestone = async () => {
    const inputData = { state: state === 0 ? 1 : 0 };
    const config = {
      url: `/api/milestone/${milestoneState.milestoneDetail.id}/state`,
      method: 'PUT',
      token: authState.token,
      data: inputData,
    };
    await request(config);
    setState(state === 0 ? 1 : 0);
    if (state === 0) {
      history.push('/milestones');
    } else {
      history.push('/milestones?state=closed');
    }
  };

  const updateMilestone = async () => {
    const inputData = {
      title,
      description,
      date,
    };
    const config = {
      url: `/api/milestone/${milestoneState.milestoneDetail.id}`,
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

  const onClickUpdateMilestone = () => {
    updateMilestone();
    history.push('/milestones');
  };

  const onClickCancelMilestone = () => {
    history.goBack();
  };

  const onClickLabel = () => {
    history.push('/labels');
  };

  const onClickToggleMilestone = () => {
    toggleMilestone();
  };

  useEffect(() => {
    return () => {
      setDate('');
      setTitle('');
      setDescription('');
    };
  }, []);

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

  const onChangeDate = (event) => {
    const {
      target: { value },
    } = event;
    setDate(value);
  };

  return (
    <MilestoneUpdatePresenter
      onClickUpdateMilestone={onClickUpdateMilestone}
      onChangeTitle={onChangeTitle}
      onChangeDate={onChangeDate}
      onChangeDescription={onChangeDescription}
      history={history}
      title={title}
      description={description}
      date={date}
      greenColor={greenColor}
      redColor={redColor}
      lightGrayColor={lightGrayColor}
      state={state}
      onClickCancelMilestone={onClickCancelMilestone}
      onClickLabel={onClickLabel}
      onClickToggleMilestone={onClickToggleMilestone}
    />
  );
};
