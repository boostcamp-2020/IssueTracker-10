import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  border: none;
  height: 35px;
  width: 100%;
  font-size: 12px;
  padding: 0 15px;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = 'text',
  className,
  maxLength,
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    maxLength={maxLength}
  />
);

export default Input;
