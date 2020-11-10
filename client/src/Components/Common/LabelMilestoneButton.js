import React from 'react';
import styled from 'styled-components';
import LabelButton from './LabelButton';
import MilestoneButton from './MilestoneButton';

const Wrapper = styled.div`
  display: flex;
`;

const LabelMilestoneButton = (props) => {
  const { hasCount, issueHeader } = props;
  const { labels = [], milestones = [] } = issueHeader;
  return (
    <Wrapper>
      <LabelButton hasCount={hasCount} count={labels.length} />
      <MilestoneButton hasCount={hasCount} count={milestones.length} />
    </Wrapper>
  );
};

export default LabelMilestoneButton;
