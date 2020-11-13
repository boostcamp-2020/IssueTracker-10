import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LabelButton from './LabelButton';
import MilestoneButton from './MilestoneButton';

const Wrapper = styled.div`
  display: flex;
`;

const LabelMilestoneButton = (props) => {
  const { hasCount, issueHeader, pathname } = props;
  const { labels = [], milestones = [] } = issueHeader;
  return (
    <Wrapper>
      <Link to="/labels">
        <LabelButton pathname={pathname} hasCount={hasCount} count={labels.length} />
      </Link>
      <Link to="/milestones">
        <MilestoneButton pathname={pathname} hasCount={hasCount} count={milestones.length} />
      </Link>
    </Wrapper>
  );
};

export default LabelMilestoneButton;
