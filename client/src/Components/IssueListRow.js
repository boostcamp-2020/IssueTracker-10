import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueCheckbox } from './IssueListHeader';
import { convertTime } from '../utils/convert';
import { MilestoneIcon } from './static/svgIcons';

const RowWraaper = styled.div`
  display: flex;
  align-items: top;
  padding: 14px 15px;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.brightColor};
  &:hover {
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

const IssueTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IssueState = styled.span`
  margin-right: 10px;
`;

const IssueTitle = styled.span`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 600;
`;

const IssueInformation = styled.div`
  display: flex;
  svg {
    fill: ${(props) => props.theme.darkgrayColor};
  }
`;

const IssueSubText = styled.span`
  margin-right: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.darkgrayColor};
`;

const MilestoneText = styled(IssueSubText)`
  margin-left: 5px;
`;

const IssueListRow = (props) => {
  const { id, user, title, state, createdAt, milestone } = props;
  const { username } = user;
  return (
    <RowWraaper>
      <IssueCheckbox type="checkbox" />
      <IssueState>{state}</IssueState>
      <IssueTextWrapper>
        <IssueTitle>{title}</IssueTitle>
        <IssueInformation>
          <IssueSubText>#{id}</IssueSubText>
          <IssueSubText>
            opened {convertTime(createdAt)} by {username}
          </IssueSubText>
          {milestone && (
            <>
              <MilestoneIcon size={13} />
              <MilestoneText>{milestone.title}</MilestoneText>
            </>
          )}
        </IssueInformation>
      </IssueTextWrapper>
    </RowWraaper>
  );
};

export default IssueListRow;
