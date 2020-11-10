import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { request } from '../../Api';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import { LabelDispatchContext, LabelStateContext } from '../../Context/LabelContext';
import Button from '../Common/Button';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';
import LabelCreateModal from './LabelCreateModal';
import LabelFilter from './LabelFilter';
import LabelList from './LabelList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
  margin-top: 20px;
  width: 1100px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  &:last-child {
    width: 10%;
  }
`;

const Label = ({ token }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const labelState = useContext(LabelStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    const displayValue = !display;
    setDisplay(displayValue);
  };

  useEffect(() => {
    if (!authState.token) authDispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (authState.token) {
      const fetchLabels = async () => {
        const config = { url: '/api/label', method: 'GET', token: authState.token };
        const { data } = await request(config);
        if (data) labelDispatch({ type: 'GET', labels: data });
      };
      fetchLabels();
    }
  }, [authState.token]);

  return (
    <Wrapper>
      <RowContainer>
        <ColumnContainer>
          <LabelMilestoneButton issueHeader="" />
          <LabelFilter />
        </ColumnContainer>
        <ColumnContainer>
          <Button onClick={toggleDisplay} text="New label" color="#2D9F4C" />
        </ColumnContainer>
      </RowContainer>
      <RowContainer>
        {display && <LabelCreateModal toggleDisplay={toggleDisplay} setDisplay={setDisplay} />}
      </RowContainer>
      <RowContainer>
        <LabelList labels={labelState.labels} />
      </RowContainer>
    </Wrapper>
  );
};

export default Label;
