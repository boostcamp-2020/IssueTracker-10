import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IssueListHeader from './IssueListHeader';
import IssueListRow from './IssueListRow';
import request from '../Api';

const IssueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 0 auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
`;

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const config = { url: '/api/issue', method: 'GET' };
      const { data } = await request(config);
      setIssues(data);
    };
    fetch();
  }, []);
  return (
    <IssueListWrapper>
      <IssueListHeader />
      {issues.map((issue) => (
        <IssueListRow key={issue.id} {...issue} />
      ))}
    </IssueListWrapper>
  );
};

export default IssueList;
