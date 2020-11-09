import React, { useState } from 'react';
import styled from 'styled-components';
import BoldText from './BoldText';
import { Search, TriArrow } from './static/svgIcons';
import Input from './Input';
import FilterModal from './FilterModal';

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

const SelectBox = styled.div`
  position: relative;
  width: 15%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.skyblueColor};
`;

const FilterText = styled(BoldText)`
  color: ${(props) => props.theme.blueColor};
  font-size: 13px;
`;

const FilterBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  svg {
    fill: ${(props) => props.theme.blueColor};
  }
  &:hover {
    border-bottom-left-radius: ${(props) => props.theme.radiusSmall};
    border-top-left-radius: ${(props) => props.theme.radiusSmall};
    background-color: ${(props) => props.theme.blueColor};
    span {
      color: ${(props) => props.theme.whiteColor};
    }
    svg {
      fill: ${(props) => props.theme.whiteColor};
    }
  }
  cursor: pointer;
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
  const [display, setDisplay] = useState(0);
  const toggleDisplay = () => {
    const displayValue = display === 1 ? 0 : 1;
    setDisplay(displayValue);
  };
  return (
    <Wrapper>
      <FilterWrapper>
        <SelectBox>
          <FilterBox onClick={toggleDisplay}>
            <FilterText text="Filters" />
            <TriArrow size={10} />
          </FilterBox>
          <FilterModal display={display} setDisplay={setDisplay} />
        </SelectBox>
        <InputBox>
          <Search size={12} />
          <Input placeholder="is:issue is:open" type="text" />
        </InputBox>
      </FilterWrapper>
    </Wrapper>
  );
};
