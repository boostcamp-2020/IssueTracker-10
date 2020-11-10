import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IssueStateContext } from '../Context/IssueContext';
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
  width: 100%;
  padding: 0 10px;
  svg {
    fill: ${(props) => props.theme.skyblueColor};
  }
`;

export default () => {
  const state = useContext(IssueStateContext);
  const [display, setDisplay] = useState(false);
  const [inputText, setInputText] = useState('is:open');

  const toggleDisplay = () => setDisplay(!display);
  const handleInputText = (filter = {}) => {
    const text = Object.keys(filter).reduce((prev, key) => {
      const value = filter[key];
      if (!value || (Array.isArray(value) && value.length === 0)) return prev;
      if (key === 'state') return `${prev}is:${value} `;
      return `${prev}${key}:${value} `;
    }, '');
    if (text) setInputText(text);
  };

  useEffect(() => {
    handleInputText(state.filter);
  }, [state.filter]);

  return (
    <Wrapper>
      <FilterWrapper>
        <SelectBox>
          <FilterBox onClick={toggleDisplay}>
            <FilterText text="Filters" />
            <TriArrow size={10} />
          </FilterBox>
          {display && <FilterModal display={display} setDisplay={setDisplay} />}
        </SelectBox>
        <InputBox>
          <Search size={12} />
          <Input placeholder="is:issue is:open" value={inputText} type="text" />
        </InputBox>
      </FilterWrapper>
    </Wrapper>
  );
};
