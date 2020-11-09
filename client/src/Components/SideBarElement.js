import React from 'react';
import styled from 'styled-components';
import { GearIcon } from './static/svgIcons';

const Container = styled.div`
  padding: 20px 0;
  border-bottom: ${(props) => props.theme.border};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;

  & svg {
    fill: ${(props) => props.theme.grayColor};
  }

  &:hover {
    & * {
      color: ${(props) => props.theme.blueColor};
      fill: ${(props) => props.theme.blueColor};
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.darkgrayColor};
`;

const Content = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.darkgrayColor};
`;

const SideBarElement = ({ title, content }) => (
  <Container>
    <HeaderWrapper>
      <Title>{title}</Title>
      <GearIcon size="20" />
    </HeaderWrapper>
    <Content>{content}</Content>
  </Container>
);

export default SideBarElement;
