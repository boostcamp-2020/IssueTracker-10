import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IssueInfoContext, IssueInfoDispatchContext } from '../../Context/IssueInfoContext';

const ModalWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: -2px;
  width: 105%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  box-shadow: ${(props) => props.theme.cardShadow};
  background-color: ${(props) => props.theme.whiteColor};
  text-align: left;
  z-index: 2;
`;

const ModalTitle = styled.div`
  padding: 10px 15px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => props.theme.blueColor};
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.whiteColor};
`;

const ModalContent = styled.ul`
  font-size: 13px;
  color: ${(props) => props.theme.darkgrayColor};
  cursor: pointer;
`;

const IssueFilterModal = ({ modalType, title, render, type }) => {
  const issueInfoState = useContext(IssueInfoContext);
  const issueInfodispatch = useContext(IssueInfoDispatchContext);
  const [selectedList, setSelecteList] = useState([]);
  // TODO: 랜더링 관해서 좀 더 고민해보기
  useEffect(() => {
    setSelecteList(issueInfoState[modalType]);
  }, []);
  useEffect(() => {
    return () => issueInfodispatch({ type, data: selectedList });
  }, [selectedList]);

  return (
    <ModalWrapper>
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{render({ selectedList, setSelecteList })}</ModalContent>
    </ModalWrapper>
  );
};

export default IssueFilterModal;
