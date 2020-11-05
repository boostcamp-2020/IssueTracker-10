import React, { useState } from 'react';
import styled from 'styled-components';
import BoldText from './BoldText';
import { Search, TriArrow } from './Icons';
import Input from './Input';
import FilterModal from './FilterModal';

const Wrapper = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
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

const SelectBox = styled.div`
  position: relative;
  width: 10%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.lightGrayColor};
`;

const FilterText = styled(BoldText)`
  font-size: 15px;
`;

const FilterBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.grayColor};
  }
  cursor: pointer;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  svg {
    fill: ${(props) => props.theme.lightGrayColor};
  }
`;

export default () => {
  const [display, setDisplay] = useState(0);
  const toggleDisplay = () => {
    const displayValue = display === 1 ? 0 : 1;
    setDisplay(displayValue);
  };
  return (
    <Wrapper>
      <FilterWrapper>
        <SelectBox onClick={toggleDisplay}>
          <FilterBox>
            <FilterText text="Filters" />
            <TriArrow size={10} />
          </FilterBox>
          <FilterModal display={display} />
        </SelectBox>
        <InputBox>
          <Search size={12} />
          <Input placeholder="is:issue is:open" type="text" />
        </InputBox>
      </FilterWrapper>
    </Wrapper>
  );
};
