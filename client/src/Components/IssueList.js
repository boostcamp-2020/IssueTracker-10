import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { IssueStateContext } from '../Context/IssueContext';
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
  const state = useContext(IssueStateContext);
  const { issues } = state;
  const { issueHeader = {} } = props;
  const [checkedIssues, setCheckedIssues] = useState([]);
  const [checkedLength, setCheckedLength] = useState(0);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (issues.length > 0 && issues.length === checkedIssues.length) setAllChecked(true);
    setCheckedLength(checkedIssues.length);
  }, [checkedIssues]);

  const checkOneIssue = (issueId) => {
    if (checkedIssues.includes(issueId)) {
      const deletedIssues = checkedIssues.filter((id) => id !== issueId);
      setCheckedIssues(deletedIssues);
      setAllChecked(false);
    } else setCheckedIssues([issueId, ...checkedIssues]);
  };

  const checkAllIssue = () => {
    if (allChecked) {
      setCheckedIssues([]);
      setAllChecked(false);
    } else {
      const ids = issues.reduce((prev, issue) => {
        return [...prev, issue.id];
      }, []);
      setCheckedIssues(ids);
      setAllChecked(true);
    }
  };

  return (
    <IssueListWrapper>
      <IssueListHeader
        header={issueHeader}
        checked={allChecked}
        checkAllIssue={checkAllIssue}
        checkedLength={checkedLength}
      />
      {issues &&
        issues.map((issue) => (
          <IssueListRow
            key={issue.id}
            {...issue}
            checked={checkedIssues.includes(issue.id)}
            checkOneIssue={checkOneIssue}
          />
        ))}
    </IssueListWrapper>
  );
};

export default IssueList;
