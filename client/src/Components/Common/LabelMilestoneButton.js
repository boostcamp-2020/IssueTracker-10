import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
      <Link to="/labels">
        <LabelButton hasCount={hasCount} count={labels.length} />
      </Link>
      <Link to="/milestones">
        <MilestoneButton hasCount={hasCount} count={milestones.length} />
      </Link>
    </Wrapper>
  );
};

export default LabelMilestoneButton;
