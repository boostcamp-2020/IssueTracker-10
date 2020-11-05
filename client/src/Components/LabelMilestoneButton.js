import React from 'react';
import styled from 'styled-components';
import LabelButton from './LabelButton';
import MilestoneButton from './MilestoneButton';

const Wrapper = styled.div`
  display: flex;
`;

const LabelMilestoneButton = ({ isCount }) => {
  return (
    <Wrapper>
      <LabelButton isCount={isCount} />
      <MilestoneButton isCount={isCount} />
    </Wrapper>
  );
};

export default LabelMilestoneButton;
