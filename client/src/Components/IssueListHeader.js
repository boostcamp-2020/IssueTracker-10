import React, { useContext } from 'react';
import styled from 'styled-components';

const ListHeaderWraaper = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${(props) => props.theme.skyblueColor};
  color: ${(props) => props.theme.whiteColor};
`;

const SelectedText = styled.span``;

const FillterButton = styled.button`
  background-color: transparent;
`;

const IssueListHeader = () => {
  return (
    <ListHeaderWraaper>
      <SelectedText>1 selected</SelectedText>
      <FillterButton>Author</FillterButton>
      <FillterButton>Label</FillterButton>
      <FillterButton>Projects</FillterButton>
      <FillterButton>Milestones</FillterButton>
      <FillterButton>Assignees</FillterButton>
      <FillterButton>Sort</FillterButton>
    </ListHeaderWraaper>
  );
};

export default IssueListHeader;
