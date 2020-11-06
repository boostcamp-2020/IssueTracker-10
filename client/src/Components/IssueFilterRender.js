import React from 'react';
import styled from 'styled-components';

const ModalRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 13px;
  color: ${(props) => props.theme.darkgrayColor};
  cursor: pointer;
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

export const renderUsers = (users) => {
  return users.map((user) => {
    const { id, username, avatar } = user;
    return (
      <ModalRow key={id}>
        <UserAvater src={avatar} alt={`${username} profile`} />
        {username}
      </ModalRow>
    );
  });
};

export const renderLabels = (labels) => {
  return labels.map((label) => (
    <ModalRow key={label.id}>
      <Label labelColor={label.color} />
      <LabelTextWrapper>{label.title}</LabelTextWrapper>
    </ModalRow>
  ));
};

export const renderMilestones = (milestones) => {
  return milestones.map((milestone) => <ModalRow key={milestone.id}>{milestone.title}</ModalRow>);
};
