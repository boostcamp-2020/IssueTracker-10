import React from 'react';
import styled from 'styled-components';
import { IssueOpenIcon, CheckIcon } from './static/svgIcons';

const HeaderTextWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 15px;
`;

const CountSpanText = styled.span`
  margin: 0 13px 0 8px;
  cursor: pointer;
`;

const CountText = (props) => {
  const { openCount, closedCount } = props;
  return (
    <>
      <HeaderTextWrapper>
        <IssueOpenIcon size={14} />
        <CountSpanText>{openCount} open</CountSpanText>
      </HeaderTextWrapper>
      <HeaderTextWrapper>
        <CheckIcon size={14} />
        <CountSpanText>{closedCount} closed</CountSpanText>
      </HeaderTextWrapper>
    </>
  );
};

const SelectedText = (props) => {
  const { checkedLength } = props;
  return <HeaderTextWrapper>{checkedLength} selected</HeaderTextWrapper>;
};

const HeaderText = (props) => {
  const { checkedLength, openCount, closedCount } = props;
  return (
    <>
      {checkedLength === 0 ? (
        <CountText openCount={openCount} closedCount={closedCount} />
      ) : (
        <SelectedText checkedLength={checkedLength} />
      )}
    </>
  );
};

export default HeaderText;
