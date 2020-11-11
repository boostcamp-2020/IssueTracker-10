import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BoldText from '../Common/BoldText';
import { CheckIcon, MilestoneIcon } from '../static/svgIcons';
import MilestoneListRow from './MilestoneListRow';

const MilestoneListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 0 auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
`;

const MilestoneHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  color: ${(props) => props.theme.blueColor};
  background-color: ${(props) => props.theme.skyblueColor};
  border-top-left-radius: ${(props) => props.theme.radiusSmall};
  border-top-right-radius: ${(props) => props.theme.radiusSmall};
  svg {
    fill: ${(props) => props.theme.blueColor};
  }
  span {
    margin-left: 5px;
  }
`;

const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 20px;
  }
`;

const LinkText = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MilestoneList = ({ openMilestone, closedMilestone, isClosedPage, setClosedPage }) => {
  const openMilestoneCount = `${openMilestone.length} Open`;
  const closedMilestoneCount = `${closedMilestone.length} Closed`;

  const onClickClosed = () => {
    setClosedPage(true);
  };

  const onClickOpen = () => {
    setClosedPage(false);
  };
  return (
    <MilestoneListWrapper>
      <MilestoneHeader>
        <HeaderColumn>
          <Link to="/milestones">
            <LinkText onClick={onClickOpen}>
              <MilestoneIcon size={20} />
              <BoldText text={openMilestoneCount} />
            </LinkText>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <Link to="/milestones?state=closed">
            <LinkText onClick={onClickClosed}>
              <CheckIcon size={20} />
              <BoldText text={closedMilestoneCount} />
            </LinkText>
          </Link>
        </HeaderColumn>
      </MilestoneHeader>
      {isClosedPage ? (
        <>
          {closedMilestone &&
            closedMilestone.map((milestone) => (
              <MilestoneListRow key={milestone.id} milestone={milestone} />
            ))}
        </>
      ) : (
        <>
          {openMilestone &&
            openMilestone.map((milestone) => (
              <MilestoneListRow key={milestone.id} milestone={milestone} />
            ))}
        </>
      )}
    </MilestoneListWrapper>
  );
};

export default MilestoneList;
