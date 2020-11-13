import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { IssueStateContext, IssueDispatchContext } from '../../Context/IssueContext';
import IssueListHeader from './IssueListHeader';
import IssueListRow from './IssueListRow';

const IssueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 10px auto 30px auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
`;

const IssueList = (props) => {
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const { issues, checkedIds } = state;
  const { issueHeader = {} } = props;
  const [checkedLength, setCheckedLength] = useState(0);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (checkedIds.length > 0 && issues.length === checkedIds.length) setAllChecked(true);
    setCheckedLength(checkedIds.length);
  }, [checkedIds]);

  const checkOneIssue = (issueId) => {
    if (checkedIds.includes(issueId)) {
      dispatch({ type: 'UNCHECK_ISSUE', id: issueId });
      setAllChecked(false);
    } else dispatch({ type: 'CHECK_ISSUE', id: issueId });
  };

  const checkAllIssue = () => {
    if (allChecked) {
      dispatch({ type: 'UNCHECK_ALL_ISSUE' });
      setAllChecked(false);
    } else {
      const ids = issues.reduce((prev, issue) => {
        return [...prev, issue.id];
      }, []);
      dispatch({ type: 'CHECK_ALL_ISSUE', ids });
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
            checked={checkedIds.includes(issue.id)}
            checkOneIssue={checkOneIssue}
          />
        ))}
    </IssueListWrapper>
  );
};

export default IssueList;
