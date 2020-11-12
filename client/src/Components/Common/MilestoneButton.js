import React from 'react';
import styled from 'styled-components';
import { MilestoneIcon } from '../static/svgIcons';

const MilestoneButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.grayColor};
  border-radius: 0 ${(props) => props.theme.radius} ${(props) => props.theme.radius} 0;
  background-color: ${(props) => props.theme.skyblueColor};
  svg {
    fill: ${(props) => props.theme.whiteColor};
  }
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

const LabelMilestoneButton = ({ hasCount, count }) => {
  return (
    <MilestoneButton>
      <MilestoneIcon size={15} />
      <ButtonTitle>Milestones</ButtonTitle>
      {hasCount && <Count>{count}</Count>}
    </MilestoneButton>
  );
};

export default LabelMilestoneButton;
