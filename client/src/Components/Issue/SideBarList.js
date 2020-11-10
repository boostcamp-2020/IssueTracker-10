import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IssueStateContext } from '../../Context/IssueContext';

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
  const onClickAssignee = ({ id, username, avatar }) => {
    const data = { id, username, avatar };
    const selectedListId = selectedList.map((ele) => ele.id);
    if (selectedListId.includes(id)) {
      const newList = selectedList.filter((ele) => {
        if (id !== ele.id) return ele;
      });
      return setSelecteList(newList);
    }
    return setSelecteList([...selectedList, data]);
  };

  return assignees.map((user) => {
    const { id, username, avatar } = user;
    return (
      <ModalRow key={id} onClick={() => onClickAssignee(user)}>
        <Wrapper>
          <UserAvater src={avatar} alt={`${username} profile`} />
          {username}
        </Wrapper>
      </ModalRow>
    );
  });
};

export const renderLabels = ({ selectedList, setSelecteList }) => {
  const { labels } = useContext(IssueStateContext);
  const onClickLabel = ({ id, color, title }) => {
    const data = { id, color, title };
    const selectedListId = selectedList.map((ele) => ele.id);
    if (selectedListId.includes(id)) {
      const newList = selectedList.filter((ele) => {
        if (id !== ele.id) return ele;
      });
      return setSelecteList(newList);
    }
    return setSelecteList([...selectedList, data]);
  };
  return labels.map((label) => (
    <ModalRow key={label.id} onClick={() => onClickLabel(label)}>
      <Wrapper>
        <LabelImage labelColor={label.color} />
        <LabelTitle>{label.title}</LabelTitle>
      </Wrapper>
      <LabelDescription>{label.description}</LabelDescription>
    </ModalRow>
  ));
};

export const renderMilestones = ({ selectedList, setSelecteList }) => {
  const { milestones } = useContext(IssueStateContext);
  const onClickMilestone = ({ id, title }) => {
    const data = { id, title };
    const selectedListId = selectedList && selectedList.id;
    return selectedListId === id ? setSelecteList(null) : setSelecteList(data);
  };
  return milestones.map((milestone) => (
    <ModalRow key={milestone.id} onClick={() => onClickMilestone(milestone)}>
      <MilestoneTitle>{milestone.title}</MilestoneTitle>
      <MilestoneDueDate>{milestone.date || 'No due date'}</MilestoneDueDate>
    </ModalRow>
  ));
};
