import React from 'react';
import styled from 'styled-components';
import LabelButton from './LabelButton';
import MilestoneButton from './MilestoneButton';

const Wrapper = styled.div`
  display: flex;
`;

const LabelMilestoneButton = ({ hasCount }) => {
  return (
    <Wrapper>
      <LabelButton hasCount={hasCount} />
      <MilestoneButton hasCount={hasCount} />
    </Wrapper>
  );
};

export default LabelMilestoneButton;
