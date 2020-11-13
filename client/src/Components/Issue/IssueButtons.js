import React from 'react';
import styled from 'styled-components';
import GreenButton from '../Common/GreenButton';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IssueButtons = () => {
  return (
    <ButtonWrapper>
      <LabelMilestoneButton hasCount />
      <GreenButton title="New Issue" />
    </ButtonWrapper>
  );
};

export default IssueButtons;
