import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import NewIssueInput from './NewIssueInput';
import IssueSideBar from './IssueSideBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NewIssueWrapper = styled.div`
  display: flex;
  width: 1100px;
  margin: 0 auto;
`;

const NewIssue = () => {
  return (
    <Wrapper>
      <Header />
      <NewIssueWrapper>
        <NewIssueInput />
        <IssueSideBar />
      </NewIssueWrapper>
    </Wrapper>
  );
};

export default NewIssue;
