import React from 'react';
import styled from 'styled-components';
import LabelBadge from './LabelBadge';

const Wrapper = styled.div`
  display: flex;
  align-items: top;
  padding: 20px;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.brightColor};
  &:hover {
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

const BadgeColumn = styled.div`
  margin-right: auto;
`;

const DescriptColumn = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const EditColumn = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: ${(props) => props.theme.grayColor};
  font-size: 12px;
  margin: 0 10px;
  background: none;
`;

const DescriptText = styled.span`
  color: ${(props) => props.theme.grayColor};
`;

const LabelListRow = ({ label }) => {
  const { title, description, color } = label;

  return (
    <Wrapper>
      <BadgeColumn>
        <LabelBadge title={title} color={color} />
      </BadgeColumn>
      <DescriptColumn>
        <DescriptText>{description}</DescriptText>
      </DescriptColumn>
      <EditColumn>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </EditColumn>
    </Wrapper>
  );
};

export default LabelListRow;
