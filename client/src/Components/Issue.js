import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import FilterInput from './FilterInput';

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
    </Wrapper>
  );
};

export default Issue;
