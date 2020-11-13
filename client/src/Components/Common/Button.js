import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  padding: 9px 0px;
  color: ${(props) => (props.disabled ? props.theme.redColor : props.fontColor)};
  background-color: ${({ disabled, theme, color = '#81cc45' }) =>
    disabled ? theme.lightGreenColor : color};
  border: 0;
  border-radius: ${(props) => props.theme.radius};
  text-align: center;
  font-size: 14px;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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
