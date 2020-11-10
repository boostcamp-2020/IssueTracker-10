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
  svg {
    fill: ${(props) => props.theme[props.color]};
  }
`;

const CountSpanText = styled.span`
  margin: 0 13px 0 8px;
  cursor: pointer;
  font-weight: ${(props) => (props.bold ? 600 : 400)};
`;

const CountText = () => {
  const authState = useContext(AuthStateContext);
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const { openCount, closedCount, filter } = state;

  const fetchByState = async (type) => {
    const config = {
      url: '/api/issue',
      method: 'get',
      params: {
        ...state.filter,
        state: type,
      },
      token: authState.token,
    };
    const { data = null } = await request(config);
    return data;
  };

  const onClickClosed = async () => {
    const data = await fetchByState('closed');
    if (data) dispatch({ type: 'CLOSE', payload: data });
  };

  const onClickOpen = async () => {
    const data = await fetchByState('open');
    if (data) dispatch({ type: 'OPEN', payload: data });
  };

  return (
    <>
      <HeaderTextWrapper>
        <IssueOpenIcon size={14} />
        <CountSpanText onClick={onClickOpen} bold={filter.state === 'open'}>
          {openCount} open
        </CountSpanText>
      </HeaderTextWrapper>
      <HeaderTextWrapper color="redColor">
        <CheckIcon size={14} />
        <CountSpanText onClick={onClickClosed} bold={filter.state === 'closed'}>
          {closedCount} closed
        </CountSpanText>
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
