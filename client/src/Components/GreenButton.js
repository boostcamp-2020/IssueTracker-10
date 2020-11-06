import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.greenColor};
`;

const GreenButton = ({ title }) => {
  return <Button>{title}</Button>;
};

export default GreenButton;
