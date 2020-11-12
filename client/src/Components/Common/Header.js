import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BoldText from './BoldText';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 100%;
  height: 70px;
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.blueColor};
`;

const HeaderText = styled(BoldText)`
  font-size: 40px;
  color: ${(props) => props.theme.whiteColor};
`;

export default () => (
  <Header>
    <Link to="/">
      <HeaderText text="IssueTracker" />
    </Link>
  </Header>
);
