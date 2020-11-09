import React from 'react';
import styled from 'styled-components';
import IssueListHeader from './IssueListHeader';
import IssueListRow from './IssueListRow';

const IssueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 0 auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
`;

const IssueList = (props) => {
  const { issueHeader = {}, issues = [] } = props;
  return (
    <IssueListWrapper>
      <IssueListHeader {...issueHeader} />
      {issues && issues.map((issue) => <IssueListRow key={issue.id} {...issue} />)}
    </IssueListWrapper>
  );
};

export default IssueList;
