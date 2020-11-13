import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueInfoContext, IssueInfoDispatchContext } from '../../Context/IssueInfoContext';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import { getFontColor } from '../../utils/color';
import { request } from '../../Api';

const methodType = {
  add: 1,
  remove: 0,
};

const Wrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const UserAvater = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;

const AssignSelf = styled.button`
  background: none;
  color: ${(props) => props.theme.grayColor};
  &:hover {
    color: ${(props) => props.theme.blueColor};
  }
`;

const Label = styled.div`
  width: 100%;
  padding: 5px 10px;
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  font-weight: 600;
`;

const MilestoneTitle = styled.div`
  margin-top: 5px;
  font-weight: 600;
  font-size: 14px;
`;

const MilestoneTotal = styled.div`
  width: 100%;
  max-width: 285px;
  height: 10px;
  background-color: ${(props) => props.theme.darkgrayColor};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const MilestoneDone = styled(MilestoneTotal)`
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.greenColor};
`;

export const checkedUsers = () => {
  const { id: issueId, assignees } = useContext(IssueInfoContext);
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);
  const { user: loginUser, token } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
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
  const onClickSelf = () => {
    fetchAssignee(methodType.add, loginUser.id);
    issueInfoDispatch({ type: 'SELECT_ASSIGNEES', data: [loginUser] });
  };
  if (assignees.length === 0) {
    return (
      <Wrapper>
        No one -<AssignSelf onClick={onClickSelf}>assign yourself</AssignSelf>
      </Wrapper>
    );
  }
  return assignees.map((user) => {
    const { id, username, avatar } = user;
    return (
      <Wrapper key={id}>
        <UserAvater src={avatar} alt={`${username} profile`} />
        {username}
      </Wrapper>
    );
  });
};

export const checkedLabels = () => {
  const { labels } = useContext(IssueInfoContext);
  if (labels.length === 0) {
    return <Wrapper>None yet</Wrapper>;
  }
  return labels.map((label) => {
    const { id, title, color } = label;
    const fontColor = getFontColor(color);

    return (
      <Wrapper key={id}>
        <Label color={color} fontColor={fontColor}>
          {title}
        </Label>
      </Wrapper>
    );
  });
};

export const checkedMilestone = () => {
  const { milestone } = useContext(IssueInfoContext);
  if (!milestone) {
    return <Wrapper>No milestone</Wrapper>;
  }
  return (
    <Wrapper>
      <MilestoneTotal>
        <MilestoneDone width={milestone.percent} />
      </MilestoneTotal>
      <MilestoneTitle>{milestone.title}</MilestoneTitle>
    </Wrapper>
  );
};
