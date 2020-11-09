import React from 'react';
import styled from 'styled-components';

const UserAvater = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
  // TODO: 선택된 Assignees가 없으면 'No one-assign yourself' 랜더링
  return (
    <Wrapper>
      <UserAvater
        src="https://user-images.githubusercontent.com/49746644/98506257-6c2d0900-229e-11eb-8e94-d5dac331df82.jpg"
        alt="profile"
      />
      Test
    </Wrapper>
  );
};

export const checkedLabels = () => {
  // TODO: 선택된 labels가 없으면 'None yet' 랜더링
  return (
    <Wrapper>
      <Label>Label</Label>
    </Wrapper>
  );
};

export const checkedMilestone = () => {
  // TODO: 선택된 milestone이 없으면 'No milestone' 랜더링
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
