import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueOpenIcon, CheckIcon } from './static/svgIcons';
import { AuthStateContext } from '../Context/AuthContext';
import { IssueStateContext, IssueDispatchContext } from '../Context/IssueContext';
import { request } from '../Api';

const HeaderTextWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 15px;
`;

const CountSpanText = styled.span`
  margin: 0 13px 0 8px;
  cursor: pointer;
`;

const CountText = () => {
  const authState = useContext(AuthStateContext);
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const { openCount, closedCount } = state;

  const fetchByState = async (type) => {
    const config = {
      url: '/api/issue',
      method: 'get',
      params: {
        state: type,
      },
      token: authState.token,
    };
    const { data } = await request(config);
    if (data) dispatch({ type: 'CLOSE', payload: data });
  };

  const onClickClosed = async () => {
    await fetchByState('closed');
  };
  return (
    <>
      <HeaderTextWrapper>
        <IssueOpenIcon size={14} />
        <CountSpanText>{openCount} open</CountSpanText>
      </HeaderTextWrapper>
      <HeaderTextWrapper>
        <CheckIcon size={14} />
        <CountSpanText onClick={onClickClosed}>{closedCount} closed</CountSpanText>
      </HeaderTextWrapper>
    </>
  );
};

const SelectedText = (props) => {
  const { checkedLength } = props;
  return <HeaderTextWrapper>{checkedLength} selected</HeaderTextWrapper>;
};

const HeaderText = (props) => {
  const { checkedLength } = props;

  return (
    <>{checkedLength === 0 ? <CountText /> : <SelectedText checkedLength={checkedLength} />}</>
  );
};

export default HeaderText;
