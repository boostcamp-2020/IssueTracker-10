import React from 'react';
import styled from 'styled-components';

const CreateButton = styled.button`
  margin-left: 10px;
  padding: 7px 12px;
  background-color: ${({ theme }) => theme.greenColor};
  font-size: 13px;
  &:disabled {
    background-color: ${({ theme }) => theme.lightGrayColor};
  }
`;

export default ({ text, className, onClick }) => (
  <CreateButton className={className} onClick={onClick}>
    {text}
  </CreateButton>
);
