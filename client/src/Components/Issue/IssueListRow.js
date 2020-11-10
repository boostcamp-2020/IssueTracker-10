import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IssueLabel from './IssueLabel';
import { IssueCheckbox } from './IssueListHeader';
import { convertTime } from '../../utils/convert';
import { MilestoneIcon, IssueOpenIcon, IssueClosedIcon } from '../static/svgIcons';

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
  width: 80%;
`;

const IssueState = styled.span`
  margin-right: 10px;
  svg {
    fill: ${(props) => (props.state ? props.theme.blueColor : props.theme.redColor)};
  }
`;

const IssueTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const IssueTitle = styled.span`
  margin-right: 7px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
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
  const {
    id,
    user,
    title,
    state,
    createdAt,
    milestone,
    labels = [],
    checkOneIssue,
    checked,
  } = props;
  const { username } = user;

  return (
    <RowWraaper>
      <IssueCheckbox onChange={() => checkOneIssue(id)} type="checkbox" checked={checked} />
      <IssueState state={state}>{state ? <IssueOpenIcon /> : <IssueClosedIcon />}</IssueState>
      <IssueTextWrapper>
        <IssueTitleWrapper>
          <IssueTitle>
            <Link to={`/issue/${id}`}>{title}</Link>
          </IssueTitle>
          {labels.length > 0 && labels.map((label) => <IssueLabel {...label} />)}
        </IssueTitleWrapper>
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
