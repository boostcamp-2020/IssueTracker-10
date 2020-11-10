import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueInfoContext } from '../Context/IssueInfoContext';

const Wrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

/* TODO: 라벨 색에 따라 font 색 변경 */
const Label = styled.div`
  width: 100%;
  padding: 5px 10px;
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
`;

const MilestoneTitle = styled.div`
  margin-top: 5px;
  font-weight: 600;
  font-size: 14px;
`;

const MilestoneGraph = styled.svg`
  width: 300px;
  height: 20px;
`;

const MilestoneTotal = styled.path`
  stroke: ${(props) => props.theme.darkgrayColor};
  stroke-width: 10;
  stroke-linecap: round;
`;

const MilestoneDone = styled(MilestoneTotal)`
  stroke: ${(props) => props.theme.greenColor};
`;

export const checkedUsers = () => {
  const { assignees } = useContext(IssueInfoContext);
  // TODO: assign yourself 클릭시, 로그인 된 유저가 assignee로 추가
  if (assignees.length === 0) {
    return (
      <Wrapper>
        No one -<AssignSelf>assign yourself</AssignSelf>
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
  return (
    <Wrapper>
      <Label>Label</Label>
    </Wrapper>
  );
};

export const checkedMilestone = () => {
  const { milestone } = useContext(IssueInfoContext);
  if (!milestone) {
    return <Wrapper>No milestone</Wrapper>;
  }
  // TODO: milestoneGraph를 마일스톤 open / total 개수 퍼센트로 계산하여 그리기
  return (
    <Wrapper>
      <MilestoneGraph>
        <MilestoneTotal d="M5 10 295 10" />
        <MilestoneDone d="M5 10 100 10" />
      </MilestoneGraph>
      <MilestoneTitle>Milestone</MilestoneTitle>
    </Wrapper>
  );
};
