import React, { useContext } from 'react';
import styled from 'styled-components';
import IssueListHeader from './IssueListHeader';

const IssueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => props.theme.whiteColor};
`;

const IssueList = () => {
  return (
    <IssueListWrapper>
      <IssueListHeader />
    </IssueListWrapper>
  );
};

export default IssueList;
