import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const BoldText = ({ text, className }) => <Text className={className}>{text}</Text>;

export default BoldText;
