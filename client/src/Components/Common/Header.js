import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthDispatchContext } from '@Context/AuthContext';
import BoldText from './BoldText';

const Header = styled.header`
  position: relative;
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

const LogoutButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 5px 10px;
  color: ${(props) => props.theme.blueColor};
`;

export default () => {
  const authDispatch = useContext(AuthDispatchContext);
  const onClickLogout = () => authDispatch({ type: 'LOGOUT' });

  return (
    <Header>
      <Link to="/">
        <HeaderText text="IssueTracker" />
      </Link>
      <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
    </Header>
  );
};
