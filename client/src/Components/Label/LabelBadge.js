import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  border: 0;
  border-radius: ${(props) => props.theme.badgeRadius};
  color: ${(props) => props.theme.blackColor};
  font-weight: 600;
  background-color: ${(props) => props.color};
  padding: 0px 10px;
  font-size: 12px;
`;

const LabelBadge = ({ title, color }) => <Container color={color}>{title}</Container>;

export default LabelBadge;
