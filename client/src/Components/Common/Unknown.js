import React from 'react';
import styled from 'styled-components';

const Unknown = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  margin-right: 15px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.skyblueColor};
`;

export default ({ size }) => <Unknown size={size} />;
