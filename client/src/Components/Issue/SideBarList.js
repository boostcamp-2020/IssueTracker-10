import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthDispatchContext, AuthStateContext } from '@Context/AuthContext';
import { IssueInfoContext } from '@Context/IssueInfoContext';
import { IssueStateContext } from '../../Context/IssueContext';
import { MilestoneStateContext } from '../../Context/MilestoneContext';
import { CheckIcon } from '../static/svgIcons';
import getPercent from '../../utils/getPercent';
import { request } from '../../Api';

const methodType = {
  add: 1,
  remove: 0,
};

const ModalRow = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) =>
    props.selected ? props.theme.skyblueColor : props.theme.whiteColor};
  &:hover {
    background-color: ${(props) => props.theme.skyblueColor};
  }
  &:last-child {
    border: none;
  }
`;

const UserAvater = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LabelImage = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => props.labelColor};
`;

const LabelTitle = styled.span`
  margin-left: 5px;
`;

const LabelDescription = styled.div`
  margin-top: 5px;
`;

const MilestoneTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const MilestoneDueDate = styled.div`
  margin-top: 5px;
`;

export const renderUsers = ({ selectedList, setSelecteList }) => {
  const { assignees } = useContext(IssueStateContext);
  const { isCreate, id: issueId } = useContext(IssueInfoContext);
  const { token } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const selectedListId = selectedList.map((user) => user.id);

  const fetchAssignee = async (method, id) => {
    const data = { type: 'assignee', method, data: id };
    const config = {
      url: `/api/issue/${issueId}/details`,
      method: 'POST',
      token,
      data,
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
  };

  const onClickAssignee = ({ id, username, avatar }) => {
    const data = { id, username, avatar };
    if (selectedListId.includes(id)) {
      if (!isCreate) fetchAssignee(methodType.remove, id);
      const newList = selectedList.filter((user) => id !== user.id);
      return setSelecteList(newList);
    }
    if (!isCreate) fetchAssignee(methodType.add, id);
    return setSelecteList([...selectedList, data]);
  };

  return assignees.map((user) => {
    const { id, username, avatar } = user;
    return (
      <ModalRow key={id} onClick={() => onClickAssignee(user)}>
        <Wrapper>
          <UserAvater src={avatar} alt={`${username} profile`} />
          {username}
          {selectedListId.includes(id) && <CheckIcon />}
        </Wrapper>
      </ModalRow>
    );
  });
};

export const renderLabels = ({ selectedList, setSelecteList }) => {
  const { labels } = useContext(IssueStateContext);
  const { isCreate, id: issueId } = useContext(IssueInfoContext);
  const { token } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const selectedListId = selectedList.map((label) => label.id);

  const fetchLabel = async (method, id) => {
    const data = { type: 'label', method, data: id };
    const config = {
      url: `/api/issue/${issueId}/details`,
      method: 'POST',
      token,
      data,
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
  };

  const onClickLabel = ({ id, color, title }) => {
    const data = { id, color, title };
    if (selectedListId.includes(id)) {
      if (!isCreate) fetchLabel(methodType.remove, id);
      const newList = selectedList.filter((label) => id !== label.id);
      return setSelecteList(newList);
    }
    if (!isCreate) fetchLabel(methodType.add, id);
    return setSelecteList([...selectedList, data]);
  };
  return labels.map((label) => (
    <ModalRow key={label.id} onClick={() => onClickLabel(label)}>
      <Wrapper>
        <LabelImage labelColor={label.color} />
        <LabelTitle>{label.title}</LabelTitle>
        {selectedListId.includes(label.id) && <CheckIcon />}
      </Wrapper>
      <LabelDescription>{label.description}</LabelDescription>
    </ModalRow>
  ));
};

export const renderMilestones = ({ selectedList, setSelecteList }) => {
  const { openMilestone } = useContext(MilestoneStateContext);
  const { isCreate, id: issueId } = useContext(IssueInfoContext);
  const { token } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const selectedListId = selectedList && selectedList.id;

  const fetchMilestone = async (method, id) => {
    const data = { type: 'milestone', method, data: id };
    const config = {
      url: `/api/issue/${issueId}/details`,
      method: 'POST',
      token,
      data,
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
  };

  const onClickMilestone = ({ id, title, open, closed }) => {
    if (selectedListId === id) {
      if (!isCreate) fetchMilestone(methodType.remove, id);
      return setSelecteList(null);
    }
    if (!isCreate) fetchMilestone(methodType.add, id);
    const total = open + closed;
    const percent = isCreate ? getPercent(closed, total) : getPercent(closed, total + 1);
    const data = { id, title, open, closed, percent };
    return setSelecteList(data);
  };
  return openMilestone.map((milestone) => (
    <ModalRow key={milestone.id} onClick={() => onClickMilestone(milestone)}>
      <MilestoneTitle>
        {milestone.title}
        {selectedListId === milestone.id && <CheckIcon />}
      </MilestoneTitle>
      <MilestoneDueDate>
        {milestone.date ? `Due by ${milestone.dateString}` : 'No due date'}
      </MilestoneDueDate>
    </ModalRow>
  ));
};
