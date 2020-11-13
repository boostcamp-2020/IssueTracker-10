import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueOpenIcon, CheckIcon } from '../static/svgIcons';
import { IssueStateContext, IssueDispatchContext } from '../../Context/IssueContext';

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
  const state = useContext(IssueStateContext);
  const dispatch = useContext(IssueDispatchContext);
  const { openCount, closedCount, filter } = state;

  const onClickMark = async (markType = 'OPEN') => {
    dispatch({ type: markType });
  };

  return (
    <>
      <HeaderTextWrapper>
        <IssueOpenIcon size={14} />
        <CountSpanText onClick={() => onClickMark('OPEN')} bold={filter.state === 'open'}>
          {openCount} open
        </CountSpanText>
      </HeaderTextWrapper>
      <HeaderTextWrapper color="redColor">
        <CheckIcon size={14} />
        <CountSpanText onClick={() => onClickMark('CLOSE')} bold={filter.state === 'closed'}>
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
