import React, { useContext } from 'react';
import styled from 'styled-components';
import { LabelStateContext } from '../../Context/LabelContext';
import BoldText from '../Common/BoldText';
import LabelListRow from './LabelListRow';

const LabelListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 0 auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
`;

const LabelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.skyblueColor};
  border-top-left-radius: ${(props) => props.theme.radiusSmall};
  border-top-right-radius: ${(props) => props.theme.radiusSmall};
`;

const IssueList = ({ labels }) => {
  const labelState = useContext(LabelStateContext);
  const headerText = `${labelState.labels.length} labels`;
  return (
    <LabelListWrapper>
      <LabelHeader>
        <BoldText text={headerText} />
      </LabelHeader>
      {labels && labels.map((label) => <LabelListRow key={label.id} label={label} />)}
    </LabelListWrapper>
  );
};

export default IssueList;
