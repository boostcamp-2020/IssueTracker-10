import React from 'react';
import styled from 'styled-components';
import GreenButton from './GreenButton';
import LabelMilestoneButton from './LabelMilestoneButton';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IssueButtons = () => {
  return (
    <ButtonWrapper>
      <LabelMilestoneButton isCount />
      <GreenButton title="New Issue" />
    </ButtonWrapper>
  );
};

export default IssueButtons;
