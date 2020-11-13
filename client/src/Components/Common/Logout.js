import React from 'react';
import { LogoutIcon } from '@Components/static/svgIcons';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: fixed;
  right: 100px;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.skyblueColor};
  width: 50px;
  height: 50px;
  svg {
    fill: ${(props) => props.theme.blueColor};
  }
  &:hover {
    cursor: pointer;
  }
`;

const LabelMilestoneButton = () => {
  const token = localStorage.getItem('token');

  const onClickLogout = () => {
    localStorage.removeItem('token');
  };
  return (
    <>
      {token && (
        <Wrapper>
          <Container onClick={onClickLogout}>
            <LogoutIcon size={30} />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default LabelMilestoneButton;
