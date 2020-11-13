import React from 'react';
import styled from 'styled-components';

const BalloonBox = styled.div`
  position: absolute;
  top: 90%;
  left: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 200px;
  height: 50px;
  background: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  border-radius: ${(props) => props.theme.radiusSmall};
  font-size: 12px;
  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${(props) => props.color};
    content: '';
    position: absolute;
    top: -10px;
    left: 50px;
  }
`;

const Balloon = ({ text, color, fontColor = 'black', className }) => (
  <BalloonBox className={className} color={color} fontColor={fontColor}>
    {text}
  </BalloonBox>
);

export default Balloon;
