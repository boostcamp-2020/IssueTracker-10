import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.radius};
  color: ${(props) => (props.disabled ? props.theme.redColor : props.fontColor)};
  font-weight: 600;
  background-color: ${(props) => (props.disabled ? props.theme.lightGreenColor : props.color)};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`;

const Button = ({ text, onClick, color, fontColor = 'white', className, disabled }) => (
  <Container
    disabled={disabled}
    className={className}
    color={color}
    onClick={onClick}
    fontColor={fontColor}
  >
    {text}
  </Container>
);

export default Button;
