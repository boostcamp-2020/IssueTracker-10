import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
  font-weight: 600;
`;

const FatText = ({ text, className }) => <Text className={className}>{text}</Text>;

export default FatText;
