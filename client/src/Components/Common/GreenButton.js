import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.greenColor};

  &:disabled {
    background-color: ${(props) => props.theme.lightGrayColor};
  }
`;

const GreenButton = ({ type = 'button', disabled = false, title, onClickHandler }) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClickHandler}>
      {title}
    </Button>
  );
};

export default GreenButton;
