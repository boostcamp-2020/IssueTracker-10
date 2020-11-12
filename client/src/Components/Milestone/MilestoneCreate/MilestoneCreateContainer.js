import React, { useContext, useEffect, useState } from 'react';
import { theme } from '../../../theme';
import { AuthStateContext } from '../../../Context/AuthContext';
import { request } from '../../../Api';
import { MilestoneDispatchContext } from '../../../Context/MilestoneContext';
import MilestoneCreatePresenter from './MilestoneCreatePresenter';

export default ({ history }) => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [milestone, setMilestone] = useState({});
  const authState = useContext(AuthStateContext);
  const milestoneDispatch = useContext(MilestoneDispatchContext);

  const helpText =
    'Create a new milestone to help organize your issues and pull requests. Learn more about ';
  const { greenColor } = theme;

  const postMilestone = async () => {
    const inputData = {
      title,
      description,
      date,
    };
    const config = {
      url: '/api/milestone',
      method: 'POST',
      token: authState.token,
      data: inputData,
    };
    try {
      const { milestoneId } = await request(config);
      setId(milestoneId);
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const clickCreateMilestone = () => {
    postMilestone();
    milestoneDispatch({ type: 'CREATE_MILESTONE', milestone });
    history.push('/milestones');
  };

  useEffect(() => {
    setMilestone({
      ...milestone,
      id,
      title,
      description,
      date,
    });
  }, [id, title, description, date]);

  useEffect(() => {
    return () => {
      setMilestone({});
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
    <MilestoneCreatePresenter
      helpText={helpText}
      onChangeTitle={onChangeTitle}
      onChangeDate={onChangeDate}
      onChangeDescription={onChangeDescription}
      clickCreateMilestone={clickCreateMilestone}
      history={history}
      greenColor={greenColor}
    />
  );
};
