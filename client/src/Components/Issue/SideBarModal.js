import React, { useEffect } from 'react';
import styled from 'styled-components';

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

const IssueFilterModal = ({ title, render }) => {
  useEffect(() => {
    return () => {
      // TODO: 선택된 요소를 SideBarElement 컴포넌트의 content 컴포넌트에 추가
    };
  }, []);

  return (
    <ModalWrapper>
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{render()}</ModalContent>
    </ModalWrapper>
  );
};

export default IssueFilterModal;
