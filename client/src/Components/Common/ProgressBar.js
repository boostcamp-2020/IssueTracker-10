import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 15px;
  border: 0;
  border-radius: ${(props) => props.theme.badgeRadius};
  background-color: ${(props) => props.theme.skyblueColor};
  &:after {
    position: absolute;
    width: ${(props) => props.percent};
    height: 15px;
    border-top-left-radius: ${(props) => props.theme.badgeRadius};
    border-bottom-left-radius: ${(props) => props.theme.badgeRadius};
    border-top-right-radius: ${(props) => (props.percent === '100%' ? props.theme.badgeRadius : 0)};
    border-bottom-right-radius: ${(props) =>
      props.percent === '100%' ? props.theme.badgeRadius : 0};
    background-color: ${(props) => props.theme.blueColor};
    content: '';
  }
`;

const ProgressBar = ({ percent, className }) => (
  <Container percent={percent} className={className} />
);

export default ProgressBar;
