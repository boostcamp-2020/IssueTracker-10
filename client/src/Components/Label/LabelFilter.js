import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Search } from '../static/svgIcons';
import Input from '../Common/Input';

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
  width: 100%;
  padding: 0 10px;
  svg {
    fill: ${(props) => props.theme.skyblueColor};
  }
`;

const Form = styled.form`
  width: 100%;
`;

export default withRouter(({ location: { search }, history }) => {
  const [query, setQuery] = useState('');
  const onSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?q=${query}`);
  };
  const onChangeQuery = (event) => {
    const {
      target: { value },
    } = event;
    setQuery(value);
  };

  useEffect(() => {
    if (search) {
      const term = search.split('=')[1].toLowerCase().trim();
      setQuery(term);
    }
    return () => {
      setQuery('');
    };
  }, []);

  return (
    <Wrapper>
      <FilterWrapper>
        <InputBox>
          <Search size={12} />
          <Form onSubmit={onSearchSubmit}>
            <Input
              placeholder="Search all labels"
              value={query}
              type="text"
              onChange={onChangeQuery}
            />
          </Form>
        </InputBox>
      </FilterWrapper>
    </Wrapper>
  );
});
