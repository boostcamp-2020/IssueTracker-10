import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 25px;
  border: 0;
  border-radius: ${(props) => props.theme.badgeRadius};
  color: ${(props) => props.fontColor};
  font-weight: 600;
  background-color: ${(props) => props.color};
  padding: 0px 10px;
  font-size: 12px;
`;

const LabelBadge = ({ title, color, fontColor }) => (
  <Container fontColor={fontColor} color={color}>
    {title}
  </Container>
);

export default LabelBadge;
