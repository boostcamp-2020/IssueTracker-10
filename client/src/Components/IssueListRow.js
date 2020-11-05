import { check } from 'prettier';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { convertTime } from '../utils/convert';

const RowWraaper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-top: ${(props) => props.theme.border};
  background-color: #fafafa;
  &:hover {
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

const IssueCheckbox = styled.input`
  margin-right: 15px;
`;

const IssueTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IssueTitle = styled.span`
  margin: 5px 0;
  font-size: 16px;
  font-weight: 600;
`;

const IssueInformation = styled.div`
  display: flex;
`;

const IssueSubText = styled.span`
  margin-right: 5px;
  font-size: 13px;
`;

const IssueListRow = (props) => {
  const { id, user, title, createdAt, milestone } = props;
  const { username } = user;
  return (
    <RowWraaper>
      <IssueCheckbox type="checkbox" />
      <IssueTextWrapper>
        <IssueTitle>{title}</IssueTitle>
        <IssueInformation>
          <IssueSubText>#{id}</IssueSubText>
          <IssueSubText>
            opened {convertTime(createdAt)} by {username}
          </IssueSubText>
          {milestone && <IssueSubText>{milestone.title}</IssueSubText>}
        </IssueInformation>
      </IssueTextWrapper>
    </RowWraaper>
  );
};

export default IssueListRow;
