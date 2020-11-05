import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 60px;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.greenColor};
`;

const GreenButton = ({ title }) => {
  return <Button>{title}</Button>;
};

export default GreenButton;
