import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { request } from '../../../Api';
import { AuthDispatchContext, AuthStateContext } from '../../../Context/AuthContext';
import { MilestoneDispatchContext, MilestoneStateContext } from '../../../Context/MilestoneContext';
import { theme } from '../../../theme';
import MilestoneUpdatePresenter from './MilestoneUpdatePresenter';

export default withRouter(({ history, token, match, location: { pathname } }) => {
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
        const { status, data } = await request(config);
        if (status === 401) authDispatch({ type: 'LOGOUT' });
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
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
    setState(state === 0 ? 1 : 0);
    if (state === 0) {
      toast.success('Success! 😄');
      history.push('/milestones');
    } else {
      toast.success('Success! 😄');
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
      const { status } = await request(config);
      if (status === 401) authDispatch({ type: 'LOGOUT' });
      toast.success('Success! 😄');
    } catch (err) {
      toast.error('Fail! 😭');
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
      pathname={pathname}
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
});
