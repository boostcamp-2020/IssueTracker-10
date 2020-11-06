import React from 'react';
import styled from 'styled-components';
import { renderUsers, renderMilestones, renderLabels } from './IssueFilterRender';

const modalType = {
  author: {
    title: 'Filter by author',
    getRows: renderUsers,
  },
  label: {
    title: 'Filter by label',
    getRows: renderLabels,
  },
  milestone: {
    title: 'Filter by milestone',
    getRows: renderMilestones,
  },
  assignee: {
    title: `Filter by who's assigned`,
    getRows: renderUsers,
  },
};

const ModalWrapper = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  box-shadow: ${(props) => props.theme.cardShadow};
  background-color: ${(props) => props.theme.whiteColor};
  text-align: left;
`;

const ModalTitle = styled.div`
  padding: 10px 15px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => props.theme.blueColor};
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.whiteColor};
`;

const IssueFilterModal = (props) => {
  const { id, data = [] } = props;
  const { title } = modalType[id];
  return (
    <ModalWrapper>
      <ModalTitle>{title}</ModalTitle>
      {modalType[id].getRows(data)}
    </ModalWrapper>
  );
};

export default IssueFilterModal;
