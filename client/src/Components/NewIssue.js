import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import NewIssueInput from './NewIssueInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NewIssue = () => {
  return (
    <Wrapper>
      <Header />
      <NewIssueInput />
    </Wrapper>
  );
};

export default NewIssue;
