import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { IssueStateContext } from '../../Context/IssueContext';
import IssueFilterModal from './IssueFilter/IssueFilterModal';
import HeaderText from './IssueListHeaderText';

const ListHeaderWraaper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 15px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => props.theme.skyblueColor};
  color: ${(props) => props.theme.whiteColor};
`;

export const IssueCheckbox = styled.input`
  margin-right: 15px;
`;

const FilterWrapper = styled.span`
  position: relative;
`;
const FilterWrapperLeft = styled(FilterWrapper)`
  margin-left: auto;
`;

const FillterButton = styled.button`
  margin: 0 12px;
  background-color: transparent;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
`;

const IssueListHeader = (props) => {
  const state = useContext(IssueStateContext);
  const [modal, setModal] = useState(0);
  const { header, checkAllIssue, checked } = props;
  const { labels, milestones, users } = header;
  const handleModal = (num) => {
    if (modal === num) setModal(0);
    else setModal(num);
  };
  return (
    <ListHeaderWraaper>
      <IssueCheckbox type="checkbox" onChange={checkAllIssue} checked={checked} />
      <HeaderText checkedLength={state.checkedIds.length} />
      <FilterWrapperLeft>
        {state.checkedIds.length === 0 ? (
          <>
            <FillterButton onClick={() => handleModal(5)}>Author ▾</FillterButton>
            {modal === 5 && <IssueFilterModal id="author" data={users} />}
          </>
        ) : (
          <>
            <FillterButton onClick={() => handleModal(1)}>Mark as ▾</FillterButton>
            {modal === 1 && <IssueFilterModal id="mark" />}
          </>
        )}
      </FilterWrapperLeft>
      <FilterWrapper>
        <FillterButton onClick={() => handleModal(2)}>Label ▾</FillterButton>
        {modal === 2 && <IssueFilterModal id="label" data={labels} />}
      </FilterWrapper>
      <FilterWrapper>
        <FillterButton onClick={() => handleModal(3)}>Milestones ▾</FillterButton>
        {modal === 3 && <IssueFilterModal id="milestone" data={milestones} />}
      </FilterWrapper>
      <FilterWrapper>
        <FillterButton onClick={() => handleModal(4)}>Assignees ▾</FillterButton>
        {modal === 4 && <IssueFilterModal id="assignee" data={users} />}
      </FilterWrapper>
    </ListHeaderWraaper>
  );
};

export default IssueListHeader;
