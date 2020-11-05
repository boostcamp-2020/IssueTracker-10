import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import FilterInput from './FilterInput';
import IssueList from './IssueList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Issue = () => {
  return (
    <Wrapper>
      <Header />
      <FilterInput />
      <IssueList />
    </Wrapper>
  );
};

export default Issue;
