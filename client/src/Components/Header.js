import React from 'react';
import styled from 'styled-components';
import BoldText from './BoldText';

const Header = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.blueColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const HeaderText = styled(BoldText)`
  font-size: 40px;
  color: ${(props) => props.theme.whiteColor};
`;

export default () => (
  <Header>
    <HeaderText text="IssueTracker" />
  </Header>
);
