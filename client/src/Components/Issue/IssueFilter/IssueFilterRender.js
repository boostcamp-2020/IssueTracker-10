import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Unknown from '@Common/Unknown';
import { AuthDispatchContext, AuthStateContext } from '../../../Context/AuthContext';
import { IssueStateContext, IssueDispatchContext } from '../../../Context/IssueContext';
import { request } from '../../../Api';

const ModalRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 13px;
  color: ${(props) => props.theme.darkgrayColor};
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? props.theme.skyblueColor : props.theme.whiteColor};
  &:hover {
    background-color: ${(props) => props.theme.skyblueColor};
  }
`;

const UserAvater = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  border-radius: 100%;
`;

const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => props.labelColor};
`;

const LabelTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const userType = {
  author: {
    set: 'SET_AUTHOR',
    remove: 'REMOVE_AUTHOR',
  },
  assignee: {
    set: 'SET_ASSIGNEE',
    remove: 'REMOVE_ASSIGNEE',
  },
};

export const renderUsers = ({ users, type }) => {
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const [selectedUser, setSelectedUser] = useState(state.filter[type]);

  const onClickUser = async (id) => {
    const passedId = selectedUser === id ? null : id;
    if (selectedUser === id) {
      dispatch({ type: userType[type].remove });
    } else dispatch({ type: userType[type].set, id: passedId });
    setSelectedUser(passedId);
  };

  return users.map((user) => {
    const { id, username, avatar } = user;
    return (
      <ModalRow key={id} onClick={() => onClickUser(id)} selected={selectedUser === id}>
        {avatar ? <UserAvater src={avatar} alt={`${username} profile`} /> : <Unknown size="20px" />}
        {username}
      </ModalRow>
    );
  });
};

export const renderLabels = (labels) => {
  const { filter } = useContext(IssueStateContext);
  const issueDispatch = useContext(IssueDispatchContext);

  const onClickLabel = (labelId) => {
    if (filter.label.includes(labelId)) {
      issueDispatch({ type: 'REMOVE_LABEL', id: labelId });
    } else issueDispatch({ type: 'SET_ADD_LABEL', id: labelId });
  };

  return labels.map((label) => (
    <ModalRow
      key={label.id}
      onClick={() => onClickLabel(label.id)}
      selected={filter.label.includes(label.id)}
    >
      <Label labelColor={label.color} />
      <LabelTextWrapper>{label.title}</LabelTextWrapper>
    </ModalRow>
  ));
};

export const renderMilestones = (milestones) => {
  const { filter } = useContext(IssueStateContext);
  const issueDispatch = useContext(IssueDispatchContext);

  const onClickMilestone = (milestoneId) => {
    if (filter.milestone === milestoneId) {
      issueDispatch({ type: 'REMOVE_MILESTONE' });
    } else issueDispatch({ type: 'SET_MILESTONE', id: milestoneId });
  };

  return milestones.map((milestone) => (
    <ModalRow
      key={milestone.id}
      onClick={() => onClickMilestone(milestone.id)}
      selected={filter.milestone === milestone.id}
    >
      {milestone.title}
    </ModalRow>
  ));
};

export const renderMark = () => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const type = { closed: 0, open: 1 };

  const putState = async (typeString) => {
    const config = {
      url: '/api/issue/state',
      method: 'put',
      data: {
        state: type[typeString],
        issueIds: state.checkedIds,
      },
      token: authState.token,
    };
    const result = await request(config);
    if (result.status === 401) return authDispatch({ type: 'LOGOUT' });
    if (result) toast.success('Success! 😄');
    return result;
  };

  const onClickMark = async (typeString) => {
    const result = await putState(typeString);
    if (result) {
      dispatch({ type: 'RESET_FILTER' });
    }
  };

  return (
    <>
      <ModalRow onClick={() => onClickMark('open')}>open</ModalRow>
      <ModalRow onClick={() => onClickMark('closed')}>closed</ModalRow>
    </>
  );
};
