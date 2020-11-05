import React, { useContext } from 'react';
import styled from 'styled-components';

const ListHeaderWraaper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => props.theme.skyblueColor};
  color: ${(props) => props.theme.whiteColor};
`;

const SelectedText = styled.span``;

const FillterButton = styled.button`
  margin: 0 13px;
  background-color: transparent;
`;

const FillterButtonLeft = styled(FillterButton)`
  margin-left: auto;
`;

const IssueListHeader = () => {
  return (
    <ListHeaderWraaper>
      <SelectedText>1 selected</SelectedText>
      <FillterButtonLeft>Author</FillterButtonLeft>
      <FillterButton>Label</FillterButton>
      <FillterButton>Projects</FillterButton>
      <FillterButton>Milestones</FillterButton>
      <FillterButton>Assignees</FillterButton>
      <FillterButton>Sort</FillterButton>
    </ListHeaderWraaper>
  );
};

export default IssueListHeader;
