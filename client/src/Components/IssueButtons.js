import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LabelIcon, MilestoneIcon } from './icons';

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

const Wrapper = styled.div`
  display: flex;
`;

const LabelButton = styled(commonButton)`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.grayColor};
  border-radius: ${(props) => props.theme.radius} 0 0 ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.skyblueColor};
  svg {
    fill: ${(props) => props.theme.whiteColor};
  }
`;

const MilestoneButton = styled(LabelButton)`
  border-radius: 0 ${(props) => props.theme.radius} ${(props) => props.theme.radius} 0;
`;

const ButtonTitle = styled.span`
  margin-left: 5px;
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
          <LabelIcon />
          <ButtonTitle>Labels</ButtonTitle>
          <Count>3</Count>
        </LabelButton>
        <MilestoneButton>
          <MilestoneIcon />
          <ButtonTitle>Milestones</ButtonTitle>
          <Count>10</Count>
        </MilestoneButton>
      </Wrapper>
      <IssueButton>New issue</IssueButton>
    </ButtonWrapper>
  );
};

export default IssueButtons;
