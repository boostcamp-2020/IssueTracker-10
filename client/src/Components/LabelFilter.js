import React from 'react';
import styled from 'styled-components';
import { Search } from './static/svgIcons';
import Input from './Input';

const Wrapper = styled.div`
  width: 60%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 10%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.lightGrayColor};
  border-radius: ${(props) => props.theme.radiusSmall};
  &:last-child {
    width: 90%;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  svg {
    fill: ${(props) => props.theme.skyblueColor};
  }
`;

export default () => {
  return (
    <Wrapper>
      <FilterWrapper>
        <InputBox>
          <Search size={12} />
          <Input placeholder="Search all labels" type="text" />
        </InputBox>
      </FilterWrapper>
    </Wrapper>
  );
};
