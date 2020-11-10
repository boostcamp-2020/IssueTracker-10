import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueDispatchContext } from '../../Context/IssueContext';

const Badge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 19px;
  margin: 1px 4px 0 0;
  padding: 0px 7px;
  color: ${(props) => props.theme.blackColor};
  background-color: ${(props) => props.color};
  border: 0;
  border-radius: ${(props) => props.theme.badgeRadius};
  font-weight: 600;
  font-size: 11px;
`;

const IssueLabelBadge = (props) => {
  const issueDispatch = useContext(IssueDispatchContext);
  const { id, title, color } = props;

  const onClickLabel = (labelId) => {
    issueDispatch({ type: 'SET_ONE_LABEL', id: labelId });
  };

  return (
    <Badge onClick={() => onClickLabel(id)} color={color}>
      {title}
    </Badge>
  );
};

export default IssueLabelBadge;
