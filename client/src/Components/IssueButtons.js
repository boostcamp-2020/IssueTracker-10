import React, { useEffect } from 'react';
import styled from 'styled-components';

const commonButton = styled.button`
  outline: none;
  border-radius: ${(props) => props.theme.radius};
  color: ${(props) => props.theme.whiteColor};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div``;

const LabelButton = styled(commonButton)`
  height: 60px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.grayColor};
  border-radius: ${(props) => props.theme.radius} 0 0 ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.skyblueColor};
`;

const MilestoneButton = styled(LabelButton)`
  border-radius: 0 ${(props) => props.theme.radius} ${(props) => props.theme.radius} 0;
`;

const Count = styled.span`
  display: inline-block;
  padding: 2px 7px;
  margin-left: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.blueColor};
  color: ${(props) => props.theme.whiteColor};
`;

const IssueButton = styled(commonButton)`
  height: 60px;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.greenColor};
`;

const IssueButtons = () => {
  return (
    <ButtonWrapper>
      <Wrapper>
        <LabelButton>
          Labels<Count>8</Count>
        </LabelButton>
        <MilestoneButton>
          Milestones<Count>10</Count>
        </MilestoneButton>
      </Wrapper>
      <IssueButton>New issue</IssueButton>
    </ButtonWrapper>
  );
};

export default IssueButtons;
