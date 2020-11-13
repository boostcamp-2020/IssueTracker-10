import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 25px;
  padding: 0px 10px;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.color};
  border: 0;
  border-radius: ${(props) => props.theme.badgeRadius};
  font-size: 12px;
  font-weight: 600;
`;

const LabelBadge = ({ title, color, fontColor }) => (
  <Container fontColor={fontColor} color={color}>
    {title}
  </Container>
);

export default LabelBadge;
